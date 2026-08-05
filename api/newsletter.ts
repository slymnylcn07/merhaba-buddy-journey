/**
 * FlexiKnee newsletter + knee quiz capture endpoint.
 *
 * The browser only calls /api/newsletter. Shopify Admin credentials stay on Vercel.
 *
 * Required Vercel environment variables:
 *   SHOPIFY_STORE_DOMAIN      permanent *.myshopify.com domain
 *   SHOPIFY_CLIENT_ID         FlexiKnee Newsletter API client ID
 *   SHOPIFY_CLIENT_SECRET     FlexiKnee Newsletter API client secret
 *
 * Optional legacy fallback:
 *   SHOPIFY_ADMIN_TOKEN
 *
 * Required app scopes:
 *   read_customers, write_customers
 *
 * Welcome email variables:
 *   RESEND_API_KEY        server-side Resend API key
 *   RESEND_FROM           e.g. FlexiKnee Support <support@flexi-knee.com>
 */

import { createHash } from 'node:crypto';

const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2026-07';
const LEGACY_QUIZ_TRIGGER_TAG = 'quiz-plan-requested';
const QUIZ_PROFILE_TAG = 'quiz-profile-saved';

type JsonObject = Record<string, unknown>;

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (statusCode: number) => ApiResponse;
  json: (payload: unknown) => unknown;
}

interface ShopifyUserError {
  field?: string[] | null;
  message: string;
  code?: string;
}

interface ShopifyCustomer {
  id: string;
  email?: string | null;
  tags: string[];
}

interface QuizPayload {
  resultKey?: unknown;
  productKey?: unknown;
  sourceArticle?: unknown;
  answers?: {
    when?: unknown;
    feel?: unknown;
    support?: unknown;
    goal?: unknown;
  } | null;
}

interface NewsletterBody {
  email?: unknown;
  consent?: unknown;
  marketingConsent?: unknown;
  emailRequested?: unknown;
  source?: unknown;
  quiz?: QuizPayload | null;
}

interface TokenResponse {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

type QuizWhen = 'activity' | 'daily' | 'rest' | 'travel';
type QuizFeel = 'stiff' | 'ache' | 'swollen' | 'heavy' | 'sharp' | 'sounds';
type QuizSupport = 'smart_home' | 'simple_warmth' | 'cold' | 'wearable' | 'foot_support' | 'unsure';
type QuizGoal = 'relief' | 'active' | 'sleep' | 'understand';
type QuizProductKey =
  | 'smart-knee-massager'
  | 'heated-wrap'
  | 'cold-wrap'
  | 'compression-sleeve'
  | 'insoles'
  | 'compression-socks'
  | 'calf-massager'
  | 'generic';

type QuizResultKey =
  | 'evening-multimode-routine'
  | 'simple-warmth-routine'
  | 'post-activity-cold-routine'
  | 'daily-knee-support'
  | 'active-foot-to-knee-support'
  | 'travel-wearable-lower-leg-support'
  | 'powered-lower-leg-recovery'
  | 'learn-before-buying'
  | 'clarify-sharp-pattern'
  | 'general-consistency';

interface QuizAnswers {
  when: QuizWhen;
  feel: QuizFeel;
  support: QuizSupport;
  goal: QuizGoal;
}

interface QuizGuide {
  title: string;
  slug: string;
}

interface QuizProduct {
  key: QuizProductKey;
  title: string;
  path: string;
  cta: string;
}

interface QuizResultTemplate {
  key: QuizResultKey;
  headline: string;
  summary: string;
  product: QuizProduct | null;
  guides: [QuizGuide, QuizGuide, QuizGuide];
  defaultAnswers: QuizAnswers;
}

interface QuizPlanDay {
  day: number;
  title: string;
  action: string;
}

interface NormalizedQuizProfile {
  resultKey: QuizResultKey;
  sourceArticle: string;
  answers: QuizAnswers;
  template: QuizResultTemplate;
  plan: QuizPlanDay[];
}

interface GraphqlEnvelope<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

const RESULT_KEY_ALIASES: Record<string, QuizResultKey> = {
  'evening-warmth-routine': 'evening-multimode-routine',
  'travel-lower-leg-recovery': 'powered-lower-leg-recovery',
  'daily-movement-support': 'daily-knee-support',
  'daily-consistency': 'general-consistency',
};

const RESULT_TEMPLATES: Record<QuizResultKey, QuizResultTemplate> = {
  'evening-multimode-routine': {
    key: 'evening-multimode-routine',
    headline: 'A short evening comfort routine is your clearest starting point.',
    summary:
      'Your answers favor a repeatable at-home session that combines adjustable warmth with optional massage-style comfort. Keep the first week gentle and judge it by how your knee responds, not by intensity.',
    product: {
      key: 'smart-knee-massager',
      title: 'FlexiKnee Smart Heated Knee Massager',
      path: '/product/knee-massager-smart-red-light-and-massage-therapy',
      cta: 'See your matched knee massager',
    },
    guides: [
      { title: 'Why Do My Knees Hurt When Sleeping?', slug: 'why-do-my-knees-hurt-when-sleeping' },
      { title: 'Do Knee Massagers Really Work?', slug: 'do-knee-massagers-work' },
      { title: 'Ice or Heat for Knee Pain?', slug: 'heat-vs-ice-for-knees' },
    ],
    defaultAnswers: { when: 'rest', feel: 'stiff', support: 'smart_home', goal: 'sleep' },
  },
  'simple-warmth-routine': {
    key: 'simple-warmth-routine',
    headline: 'Simple focused warmth fits your routine better than extra features.',
    summary:
      'Your answers point toward a low-effort warmth routine for familiar stiffness or aching without new swelling. Start with a short, comfortable session and keep movement in the plan.',
    product: {
      key: 'heated-wrap',
      title: 'FlexiKnee USB Heated Knee Wrap',
      path: '/product/flexiknee-usb-heated-knee-wrap',
      cta: 'See your matched heated wrap',
    },
    guides: [
      { title: 'Ice or Heat for Knee Pain?', slug: 'heat-vs-ice-for-knees' },
      { title: 'Daily Knee Care Routine', slug: 'daily-knee-care-routine' },
      { title: 'Knee Tightness Without Pain', slug: 'knee-tightness-without-pain' },
    ],
    defaultAnswers: { when: 'rest', feel: 'stiff', support: 'simple_warmth', goal: 'relief' },
  },
  'post-activity-cold-routine': {
    key: 'post-activity-cold-routine',
    headline: 'A calm post-activity cooling routine is your best first experiment.',
    summary:
      'Your answers favor a reusable cold-comfort option after activity. Cooling is a short-term comfort step, so pair it with workload tracking and do not use numbness as permission to push through a worsening pattern.',
    product: {
      key: 'cold-wrap',
      title: 'FlexiKnee Reusable Knee Ice Pack Wrap',
      path: '/product/flexiknee-reusable-knee-ice-pack-wrap',
      cta: 'See your matched cold wrap',
    },
    guides: [
      { title: 'Cold Therapy Machine for the Knee', slug: 'cold-therapy-machine-knee' },
      { title: 'Knee Pain After Exercise', slug: 'knee-pain-after-exercise' },
      { title: 'Ice or Heat for Knee Pain?', slug: 'heat-vs-ice-for-knees' },
    ],
    defaultAnswers: { when: 'activity', feel: 'swollen', support: 'cold', goal: 'relief' },
  },
  'daily-knee-support': {
    key: 'daily-knee-support',
    headline: 'Wearable knee support fits the movement already in your day.',
    summary:
      'Your answers favor light support during walking, work, stairs, or training. Fit and comfort matter more than maximum tightness, and the sleeve should never hide increasing pain or instability.',
    product: {
      key: 'compression-sleeve',
      title: 'FlexiKnee Compression Support Sleeve',
      path: '/product/flexiknee-compression-support-sleeve',
      cta: 'See your matched support sleeve',
    },
    guides: [
      { title: 'Knee Brace vs Compression Sleeve', slug: 'knee-brace-vs-compression-sleeve' },
      { title: 'Knee Pain After Standing', slug: 'knee-pain-after-standing' },
      { title: 'Daily Knee Care Routine', slug: 'daily-knee-care-routine' },
    ],
    defaultAnswers: { when: 'daily', feel: 'ache', support: 'wearable', goal: 'active' },
  },
  'active-foot-to-knee-support': {
    key: 'active-foot-to-knee-support',
    headline: 'Your next useful adjustment may begin inside your shoes.',
    summary:
      'Your answers make footwear fit and foot-to-knee load the most relevant product category. Test any insole gradually in shoes with enough room and compare comfort during the same familiar route.',
    product: {
      key: 'insoles',
      title: 'FlexiKnee Sport Orthopedic Insoles',
      path: '/product/flexiknee-sport-orthopedic-insoles',
      cta: 'See your matched sport insoles',
    },
    guides: [
      { title: 'Best Insoles for Knee Pain', slug: 'best-insoles-for-knee-pain-2026' },
      { title: 'Knee Pain After Exercise', slug: 'knee-pain-after-exercise' },
      { title: 'Knee Pain Going Down Stairs', slug: 'knee-pain-going-down-stairs' },
    ],
    defaultAnswers: { when: 'activity', feel: 'ache', support: 'foot_support', goal: 'active' },
  },
  'travel-wearable-lower-leg-support': {
    key: 'travel-wearable-lower-leg-support',
    headline: 'A wearable lower-leg routine is the closest match for long travel days.',
    summary:
      'Your answers favor knee-high wearable support for flights, drives, standing, and long days on your feet. Compression is not appropriate for everyone, so check fit and any vascular guidance that applies to you.',
    product: {
      key: 'compression-socks',
      title: 'FlexiKnee Everyday Compression Socks',
      path: '/product/flexiknee-everyday-compression-socks',
      cta: 'See your matched compression socks',
    },
    guides: [
      { title: 'Knee Pain After Flights', slug: 'knee-pain-after-flights' },
      { title: 'Varicose Veins and Knee Pain', slug: 'varicose-veins-knee-pain' },
      { title: 'Knee Pain After Standing', slug: 'knee-pain-after-standing' },
    ],
    defaultAnswers: { when: 'travel', feel: 'ache', support: 'wearable', goal: 'active' },
  },
  'powered-lower-leg-recovery': {
    key: 'powered-lower-leg-recovery',
    headline: 'A focused lower-leg recovery session fits your pattern best.',
    summary:
      'Your answers point toward a seated air-compression and warmth routine for the calves after travel or long days. Treat it as a comfort tool and pause if pressure, heat, numbness, or skin changes feel wrong.',
    product: {
      key: 'calf-massager',
      title: 'FlexiKnee Rechargeable Calf Recovery Massager',
      path: '/product/flexiknee-calf-massager',
      cta: 'See your matched calf massager',
    },
    guides: [
      { title: 'Do Air Compression Leg Massagers Work?', slug: 'air-compression-leg-massagers-do-they-work' },
      { title: 'Knee Pain After Flights', slug: 'knee-pain-after-flights' },
      { title: 'Tight Calves and Knee Pain', slug: 'tight-calves-knee-pain' },
    ],
    defaultAnswers: { when: 'travel', feel: 'stiff', support: 'smart_home', goal: 'relief' },
  },
  'learn-before-buying': {
    key: 'learn-before-buying',
    headline: 'Clarity comes before choosing a product.',
    summary:
      'Your answers do not point to one reliable product category yet. Use the next seven days to identify triggers, timing, swelling, and movement response before adding another variable.',
    product: null,
    guides: [
      { title: 'Knee Pain Locations Visual Guide', slug: 'knee-pain-locations-visual-guide' },
      { title: 'Daily Knee Care Routine', slug: 'daily-knee-care-routine' },
      { title: 'What Causes Knee Pain?', slug: 'what-causes-knee-pain' },
    ],
    defaultAnswers: { when: 'daily', feel: 'sounds', support: 'unsure', goal: 'understand' },
  },
  'clarify-sharp-pattern': {
    key: 'clarify-sharp-pattern',
    headline: 'A sharp pattern deserves clarification before a comfort device.',
    summary:
      'Your answers include sharp pain, so the safest first step is to stop repeatedly testing the trigger and document what happens. A product recommendation would be less useful than understanding warning signs and the movement pattern.',
    product: null,
    guides: [
      { title: 'Sharp Knee Pain Guide', slug: 'sharp-knee-pain-guide' },
      { title: 'Knee Pain Locations Visual Guide', slug: 'knee-pain-locations-visual-guide' },
      { title: 'Sudden Knee Pain Guide', slug: 'sudden-knee-pain-guide' },
    ],
    defaultAnswers: { when: 'daily', feel: 'sharp', support: 'unsure', goal: 'understand' },
  },
  'general-consistency': {
    key: 'general-consistency',
    headline: 'A small repeatable routine is your best starting point.',
    summary:
      'Your answers are spread across more than one pattern. Keep the first week simple, change one variable at a time, and use your response to decide which guide or support category deserves a closer look.',
    product: null,
    guides: [
      { title: 'Daily Knee Care Routine', slug: 'daily-knee-care-routine' },
      { title: 'Knee Pain Locations Visual Guide', slug: 'knee-pain-locations-visual-guide' },
      { title: 'Ice or Heat for Knee Pain?', slug: 'heat-vs-ice-for-knees' },
    ],
    defaultAnswers: { when: 'daily', feel: 'ache', support: 'unsure', goal: 'relief' },
  },
};

const WHEN_VALUES = new Set<QuizWhen>(['activity', 'daily', 'rest', 'travel']);
const FEEL_VALUES = new Set<QuizFeel>(['stiff', 'ache', 'swollen', 'heavy', 'sharp', 'sounds']);
const SUPPORT_VALUES = new Set<QuizSupport>([
  'smart_home',
  'simple_warmth',
  'cold',
  'wearable',
  'foot_support',
  'unsure',
]);
const GOAL_VALUES = new Set<QuizGoal>(['relief', 'active', 'sleep', 'understand']);
const SOURCE_VALUES = new Set([
  'website',
  'knee-quiz',
  'article-quiz',
  'homepage-newsletter',
  'article-inline',
]);

function normalizeShopDomain(value: string): string {
  return String(value || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '');
}

async function parseBody(req: ApiRequest): Promise<NewsletterBody> {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as NewsletterBody;
    } catch {
      return {};
    }
  }

  if (req.body && typeof req.body === 'object') {
    return req.body as NewsletterBody;
  }

  return {};
}

function safeToken(value: unknown, fallback: string): string {
  const cleaned = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return cleaned || fallback;
}

function normalizeResultKey(value: unknown): QuizResultKey {
  const key = safeToken(value, 'general-consistency');
  const aliased = RESULT_KEY_ALIASES[key] || key;
  return Object.prototype.hasOwnProperty.call(RESULT_TEMPLATES, aliased)
    ? (aliased as QuizResultKey)
    : 'general-consistency';
}

function normalizeWhen(value: unknown, fallback: QuizWhen): QuizWhen {
  return WHEN_VALUES.has(value as QuizWhen) ? (value as QuizWhen) : fallback;
}

function normalizeFeel(value: unknown, fallback: QuizFeel): QuizFeel {
  return FEEL_VALUES.has(value as QuizFeel) ? (value as QuizFeel) : fallback;
}

function normalizeSupport(value: unknown, fallback: QuizSupport): QuizSupport {
  return SUPPORT_VALUES.has(value as QuizSupport) ? (value as QuizSupport) : fallback;
}

function normalizeGoal(value: unknown, fallback: QuizGoal): QuizGoal {
  return GOAL_VALUES.has(value as QuizGoal) ? (value as QuizGoal) : fallback;
}

function composeQuizPlan(answers: QuizAnswers): QuizPlanDay[] {
  const feelDay: Record<QuizFeel, Omit<QuizPlanDay, 'day'>> = {
    stiff: {
      title: 'Set a gentle baseline',
      action:
        'Rate stiffness before and after five to ten minutes of easy movement. Stay inside a comfortable range and do not force the knee deeper.',
    },
    ache: {
      title: 'Map the ache',
      action:
        'Note where the ache sits, when it appears, and which ordinary task came before it. Use the same short note format each day.',
    },
    swollen: {
      title: 'Compare the current swelling pattern',
      action:
        'Compare both knees for visible puffiness, warmth, and motion. Keep today easy and do not use a device to hide rapidly increasing swelling.',
    },
    heavy: {
      title: 'Map the heavy feeling',
      action:
        'Note whether heaviness stays around the knee or extends into the calf, ankle, or foot. Record what you were doing before it appeared and what changes it.',
    },
    sharp: {
      title: 'Stop testing the sharp trigger',
      action:
        'Write down the exact movement, direction, and location that produced the sharp pain. Avoid repeatedly recreating it to see whether it is still there.',
    },
    sounds: {
      title: 'Separate sound from symptoms',
      action:
        'Record which movement creates the sound and whether pain, swelling, locking, or giving way appears with it. Sound alone and sound with symptoms are different patterns.',
    },
  };

  const whenDay: Record<QuizWhen, Omit<QuizPlanDay, 'day'>> = {
    activity: {
      title: 'Use one easier activity dose',
      action:
        'Choose one familiar activity and make it shorter, slower, lighter, or shallower. Check the knee later that day and again the next morning.',
    },
    daily: {
      title: 'Change one repeated daily task',
      action:
        'Pick the task that appears most often, such as stairs, standing, or getting up. Adjust only one detail so the response is easy to interpret.',
    },
    rest: {
      title: 'Build a calmer transition into rest',
      action:
        'Before a long sitting period or bedtime, try a few minutes of easy movement and a comfortable leg position. Note whether the first movement afterward feels different.',
    },
    travel: {
      title: 'Plan movement before the next long trip',
      action:
        'Choose realistic movement breaks and simple ankle or calf motion when comfortable. Avoid waiting until the lower legs already feel very stiff or heavy.',
    },
  };

  const supportDay: Record<QuizSupport, Omit<QuizPlanDay, 'day'>> = {
    smart_home: {
      title: 'Test one short at-home session',
      action:
        'Use only comfortable settings and follow the device instructions. Record how the knee feels before, immediately after, and later rather than increasing every setting at once.',
    },
    simple_warmth: {
      title: 'Try controlled warmth only when it fits',
      action:
        'If the knee is not newly injured, hot, red, or swollen, try a short comfortable warmth session with regular skin checks. Stop if symptoms increase.',
    },
    cold: {
      title: 'Use a skin-safe cold routine',
      action:
        'Follow the wrap instructions, protect the skin, and keep the session short. Cold can change comfort, but it should not be used to push through a worsening injury pattern.',
    },
    wearable: {
      title: 'Check wearable fit before duration',
      action:
        'Start with a short wear test during an ordinary task. Remove it if pressure causes numbness, tingling, color change, or increasing discomfort.',
    },
    foot_support: {
      title: 'Run a short footwear test',
      action:
        'Try the support in roomy, familiar shoes for a short walk. Compare the same route rather than changing shoes, distance, and pace together.',
    },
    unsure: {
      title: 'Keep products out of today\'s test',
      action:
        'Use the matched guides to narrow the pattern first. A clean observation day is more useful than adding several comfort tools at once.',
    },
  };

  const goalDay: Record<QuizGoal, Omit<QuizPlanDay, 'day'>> = {
    relief: {
      title: 'Keep the smallest useful comfort step',
      action:
        'Repeat only the step that made ordinary movement or rest feel easier. A bigger sensation is not automatically a better result.',
    },
    active: {
      title: 'Reintroduce one meaningful movement',
      action:
        'Choose one movement you want back and use an easier version. Stop short of sharp pain, instability, or a response that keeps building afterward.',
    },
    sleep: {
      title: 'Create a repeatable wind-down cue',
      action:
        'Use the same short pre-sleep sequence and comfortable knee position tonight. Compare wake-ups and first-morning stiffness with your baseline.',
    },
    understand: {
      title: 'Change one variable only',
      action:
        'Keep the day otherwise familiar and test one adjustment. This makes the result more useful than trying several new exercises or devices together.',
    },
  };

  const repeatDay: Record<QuizWhen, Omit<QuizPlanDay, 'day'>> = {
    activity: {
      title: 'Compare load and recovery',
      action:
        'Repeat the easier activity only if the previous response settled. Note session load, later symptoms, and next-morning symptoms in the same three lines.',
    },
    daily: {
      title: 'Practice the easier daily pattern',
      action:
        'Use yesterday\'s most comfortable version of the repeated task. Aim for smoother consistency, not a perfect pain-free performance.',
    },
    rest: {
      title: 'Break up one long rest period',
      action:
        'Add one brief, comfortable movement break before stiffness builds. Compare the first few steps afterward with a usual day.',
    },
    travel: {
      title: 'Rehearse the travel routine',
      action:
        'Try the planned movement breaks and support choice during a shorter seated period. Fix fit or timing problems before a long trip.',
    },
  };

  const supportReviewDay: Record<QuizSupport, Omit<QuizPlanDay, 'day'>> = {
    smart_home: {
      title: 'Repeat only the comfortable settings',
      action:
        'Use the same short session if day three felt appropriate. Do not combine higher heat, stronger pressure, and longer time in the same test.',
    },
    simple_warmth: {
      title: 'Pair warmth with easy motion',
      action:
        'If warmth suited the pattern, follow it with a few comfortable movements. Skip heat if new swelling, redness, unusual warmth, or injury signs appear.',
    },
    cold: {
      title: 'Compare cooling with simple rest',
      action:
        'Use the same short cold routine only if it felt suitable. Record whether it changed comfort and whether swelling or function actually changed.',
    },
    wearable: {
      title: 'Review fit during real movement',
      action:
        'Use the wearable for one meaningful task and check the skin and comfort afterward. More compression is not the goal.',
    },
    foot_support: {
      title: 'Extend the shoe test gradually',
      action:
        'If the short test felt natural, add a little time in the same shoes. Stop if foot pressure, numbness, or knee symptoms increase.',
    },
    unsure: {
      title: 'Read the closest two guides',
      action:
        'Compare their descriptions with your notes. Choose a product category only if one pattern now fits clearly and no warning sign is being overlooked.',
    },
  };

  const reviewAction = answers.feel === 'sharp'
    ? 'Review the trigger notes. Arrange clinical guidance if sharp pain keeps returning, movement is limited, or the knee locks, gives way, or swells.'
    : answers.feel === 'swollen'
      ? 'Review swelling, warmth, motion, and activity notes. Seek prompt guidance for rapid swelling, a hot red knee, fever, inability to bear weight, or worsening motion.'
      : 'Compare day one with today. Keep the one or two steps that clearly helped, drop the rest, and seek guidance if symptoms are worsening or limiting normal life.';

  return [
    { day: 1, ...feelDay[answers.feel] },
    { day: 2, ...whenDay[answers.when] },
    { day: 3, ...supportDay[answers.support] },
    { day: 4, ...goalDay[answers.goal] },
    { day: 5, ...repeatDay[answers.when] },
    { day: 6, ...supportReviewDay[answers.support] },
    { day: 7, title: 'Review the pattern and choose the next step', action: reviewAction },
  ];
}

function deriveResultKey(answers: QuizAnswers): QuizResultKey {
  if (answers.feel === 'sharp') return 'clarify-sharp-pattern';
  if (answers.goal === 'understand') return 'learn-before-buying';
  if (answers.feel === 'swollen' && answers.support === 'simple_warmth') {
    return 'general-consistency';
  }

  if (answers.support === 'cold') return 'post-activity-cold-routine';
  if (answers.support === 'foot_support') return 'active-foot-to-knee-support';
  if (answers.support === 'simple_warmth') return 'simple-warmth-routine';
  if (answers.support === 'wearable') {
    return answers.when === 'travel' || answers.feel === 'heavy'
      ? 'travel-wearable-lower-leg-support'
      : 'daily-knee-support';
  }
  if (answers.support === 'smart_home') {
    return answers.when === 'travel' || answers.feel === 'heavy'
      ? 'powered-lower-leg-recovery'
      : 'evening-multimode-routine';
  }

  if (answers.feel === 'swollen') return 'post-activity-cold-routine';
  if (answers.feel === 'heavy' && answers.when === 'travel') {
    return 'travel-wearable-lower-leg-support';
  }
  return 'general-consistency';
}

function normalizeQuizProfile(payload: QuizPayload | null): NormalizedQuizProfile | null {
  if (!payload) return null;

  const requestedResultKey = normalizeResultKey(payload.resultKey);
  const requestedTemplate = RESULT_TEMPLATES[requestedResultKey];
  const rawAnswers = payload.answers && typeof payload.answers === 'object' ? payload.answers : null;
  const answers: QuizAnswers = {
    when: normalizeWhen(rawAnswers?.when, requestedTemplate.defaultAnswers.when),
    feel: normalizeFeel(rawAnswers?.feel, requestedTemplate.defaultAnswers.feel),
    support: normalizeSupport(rawAnswers?.support, requestedTemplate.defaultAnswers.support),
    goal: normalizeGoal(rawAnswers?.goal, requestedTemplate.defaultAnswers.goal),
  };
  const resultKey = deriveResultKey(answers);
  const template = RESULT_TEMPLATES[resultKey];

  return {
    resultKey,
    sourceArticle: safeToken(payload.sourceArticle, 'direct'),
    answers,
    template,
    plan: composeQuizPlan(answers),
  };
}

function normalizeEmail(value: unknown): string {
  return String(value || '').trim().toLowerCase();
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 255;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function getAdminAccessToken(storeDomain: string): Promise<string> {
  const legacyToken = process.env.SHOPIFY_ADMIN_TOKEN;
  if (legacyToken) return legacyToken;

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET');
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const response = await fetch(`https://${storeDomain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json().catch(() => ({})) as TokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Could not obtain Shopify Admin access token');
  }

  const expiresInSeconds = Number(data.expires_in || 86400);
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(60, expiresInSeconds - 300) * 1000,
  };

  return cachedToken.token;
}

async function shopifyGraphql<T>(
  storeDomain: string,
  adminToken: string,
  query: string,
  variables: JsonObject
): Promise<T> {
  const response = await fetch(`https://${storeDomain}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json().catch(() => ({})) as GraphqlEnvelope<T>;
  if (!response.ok || json.errors?.length) {
    throw new Error(json.errors?.[0]?.message || `Shopify GraphQL error ${response.status}`);
  }
  if (!json.data) throw new Error('Shopify returned an empty GraphQL response');
  return json.data;
}

async function findCustomer(
  storeDomain: string,
  adminToken: string,
  email: string
): Promise<ShopifyCustomer | null> {
  const data = await shopifyGraphql<{
    customers: { edges: Array<{ node: ShopifyCustomer }> };
  }>(
    storeDomain,
    adminToken,
    `query findCustomer($query: String!) {
      customers(first: 1, query: $query) {
        edges {
          node {
            id
            email
            tags
          }
        }
      }
    }`,
    { query: `email:${email}` }
  );

  return data.customers.edges[0]?.node || null;
}

async function createCustomer(
  storeDomain: string,
  adminToken: string,
  email: string,
  marketingConsent: boolean
): Promise<ShopifyCustomer | null> {
  const data = await shopifyGraphql<{
    customerCreate: {
      customer: ShopifyCustomer | null;
      userErrors: ShopifyUserError[];
    };
  }>(
    storeDomain,
    adminToken,
    `mutation createCustomer($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer { id email tags }
        userErrors { field message }
      }
    }`,
    {
      input: {
        email,
        tags: marketingConsent
          ? ['newsletter', 'website-signup', 'flexiknee', 'flexiknee-newsletter-api']
          : ['website-signup', 'flexiknee'],
      },
    }
  );

  const { customer, userErrors } = data.customerCreate;
  if (customer?.id) return customer;

  const duplicate = userErrors.some((error) => {
    const message = error.message.toLowerCase();
    return message.includes('already') || message.includes('taken');
  });

  if (duplicate) return findCustomer(storeDomain, adminToken, email);
  throw new Error(userErrors[0]?.message || 'Could not create Shopify customer');
}

async function updateEmailConsent(
  storeDomain: string,
  adminToken: string,
  customerId: string
): Promise<void> {
  const data = await shopifyGraphql<{
    customerEmailMarketingConsentUpdate: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation updateConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) {
        customer { id }
        userErrors { field message }
      }
    }`,
    {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: 'SINGLE_OPT_IN',
          consentUpdatedAt: new Date().toISOString(),
        },
      },
    }
  );

  const errors = data.customerEmailMarketingConsentUpdate.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not update email consent');
}

async function removeTags(
  storeDomain: string,
  adminToken: string,
  customerId: string,
  tags: string[]
): Promise<void> {
  if (!tags.length) return;
  const data = await shopifyGraphql<{
    tagsRemove: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation removeTags($id: ID!, $tags: [String!]!) {
      tagsRemove(id: $id, tags: $tags) {
        node { id }
        userErrors { field message }
      }
    }`,
    { id: customerId, tags }
  );
  const errors = data.tagsRemove.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not refresh customer tags');
}

async function addTags(
  storeDomain: string,
  adminToken: string,
  customerId: string,
  tags: string[]
): Promise<void> {
  const data = await shopifyGraphql<{
    tagsAdd: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation addTags($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node { id }
        userErrors { field message }
      }
    }`,
    { id: customerId, tags }
  );
  const errors = data.tagsAdd.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not add customer tags');
}

async function saveQuizMetafield(
  storeDomain: string,
  adminToken: string,
  customerId: string,
  value: JsonObject
): Promise<void> {
  const data = await shopifyGraphql<{
    metafieldsSet: { userErrors: ShopifyUserError[] };
  }>(
    storeDomain,
    adminToken,
    `mutation saveQuizProfile($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key }
        userErrors { field message code }
      }
    }`,
    {
      metafields: [
        {
          ownerId: customerId,
          namespace: 'flexiknee',
          key: 'knee_quiz_profile',
          type: 'json',
          value: JSON.stringify(value),
        },
      ],
    }
  );

  const errors = data.metafieldsSet.userErrors;
  if (errors.length) throw new Error(errors[0]?.message || 'Could not save quiz profile');
}

async function storeNewsletterSubscriber(
  storeDomain: string,
  email: string,
  source: string,
  quiz: NormalizedQuizProfile | null,
  marketingConsent: boolean
): Promise<{ customerStored: true; profileSaved: boolean; automationTrigger: string | null }> {
  if (!storeDomain) {
    throw new Error('SHOPIFY_STORE_DOMAIN is missing');
  }

  if (!storeDomain.endsWith('.myshopify.com')) {
    throw new Error('Shopify Admin requests must use the permanent .myshopify.com domain');
  }

  const adminToken = await getAdminAccessToken(storeDomain);
  let customer = await findCustomer(storeDomain, adminToken, email);
  if (!customer) {
    customer = await createCustomer(
      storeDomain,
      adminToken,
      email,
      marketingConsent
    );
  }
  if (!customer?.id) throw new Error('Shopify customer could not be resolved');

  if (marketingConsent) {
    await updateEmailConsent(storeDomain, adminToken, customer.id);
  }

  if (quiz) {
    const oldDynamicTags = customer.tags.filter((tag) =>
      tag.startsWith('quiz-result-') ||
      tag.startsWith('quiz-product-') ||
      tag === LEGACY_QUIZ_TRIGGER_TAG ||
      tag === QUIZ_PROFILE_TAG
    );
    await removeTags(storeDomain, adminToken, customer.id, oldDynamicTags);
  }

  const tags = ['website-signup', 'flexiknee', `signup-source-${source}`];

  if (marketingConsent) {
    tags.push('newsletter', 'flexiknee-newsletter-api');
  }

  if (quiz) {
    tags.push(
      'knee-quiz',
      `quiz-result-${quiz.resultKey}`,
      `quiz-product-${quiz.template.product?.key || 'generic'}`,
      QUIZ_PROFILE_TAG
    );
  }

  await addTags(storeDomain, adminToken, customer.id, tags);

  let profileSaved = false;
  if (quiz) {
    try {
      await saveQuizMetafield(storeDomain, adminToken, customer.id, {
        resultKey: quiz.resultKey,
        productKey: quiz.template.product?.key || 'generic',
        sourceArticle: quiz.sourceArticle,
        source,
        marketingConsent,
        completedAt: new Date().toISOString(),
      });
      profileSaved = true;
    } catch (metafieldError: unknown) {
      // Consent and tagging are the core storage workflow. A missing metafield
      // permission should not block the signup or result email.
      console.warn('[newsletter] quiz metafield was not saved:', errorMessage(metafieldError));
    }
  }

  return {
    customerStored: true,
    profileSaved,
    automationTrigger: null,
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<unknown> {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const storeDomain = normalizeShopDomain(
    process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN || ''
  );

  const body = await parseBody(req);
  const email = normalizeEmail(body.email);
  const legacyConsent = body.consent === true;
  const marketingConsent =
    body.marketingConsent === true ||
    (body.marketingConsent === undefined && legacyConsent);
  const emailRequested = body.emailRequested === true || legacyConsent;
  const requestedSource = safeToken(body.source, 'website');
  const source = SOURCE_VALUES.has(requestedSource) ? requestedSource : 'website';
  const quizPayload = body.quiz && typeof body.quiz === 'object' ? body.quiz : null;
  const quiz = normalizeQuizProfile(quizPayload);

  if (!validEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (quiz ? !emailRequested : !marketingConsent) {
    return res.status(400).json({
      error: quiz
        ? 'Please confirm that you want this result sent by email.'
        : 'Please confirm that you want to join the email list.',
    });
  }

  let customerStored = false;
  let profileSaved = false;
  let automationTrigger: string | null = null;
  let storageError: string | null = null;
  let emailSent = false;
  let emailError: string | null = null;

  const [storageOutcome, emailOutcome] = await Promise.all([
    storeNewsletterSubscriber(storeDomain, email, source, quiz, marketingConsent)
      .then((value) => ({ value, error: null as string | null }))
      .catch((error: unknown) => ({ value: null, error: errorMessage(error) })),
    (quiz
      ? sendQuizResultEmail(email, quiz, marketingConsent)
      : sendWelcomeEmail(email))
      .then((sent) => ({ sent, error: sent ? null : 'Email delivery is not configured.' }))
      .catch((error: unknown) => ({ sent: false, error: errorMessage(error) })),
  ]);

  if (storageOutcome.value) {
    customerStored = storageOutcome.value.customerStored;
    profileSaved = storageOutcome.value.profileSaved;
    automationTrigger = storageOutcome.value.automationTrigger;
  } else {
    storageError = storageOutcome.error;
    console.error('[newsletter] Shopify storage failed:', storageError);
  }

  emailSent = emailOutcome.sent;
  if (!emailSent) {
    emailError = emailOutcome.error;
    console.error('[newsletter] email delivery failed:', emailError);
  }

  const anySucceeded = customerStored || emailSent;
  const allSucceeded = customerStored && emailSent;
  const warnings: string[] = [];
  if (!customerStored) warnings.push('Your email preference could not be stored in Shopify.');
  if (!emailSent) warnings.push('Your email could not be sent right now.');

  return res.status(anySucceeded ? 200 : 503).json({
    ok: anySucceeded,
    complete: allSucceeded,
    customerStored,
    profileSaved,
    emailSent,
    welcomeEmailSent: quiz ? false : emailSent,
    emailType: quiz ? 'quiz-result' : 'welcome',
    resultKey: quiz?.resultKey || null,
    marketingConsent,
    automationTrigger,
    warnings,
    error: anySucceeded ? undefined : 'Could not save or email your request right now. Please try again.',
    detail:
      process.env.NODE_ENV === 'development'
        ? { storageError, emailError }
        : undefined,
  });
}

/**
 * Hos geldin e-postasi (GUIDE10 kodu) - Resend uzerinden.
 * Gereksinim: Vercel'de RESEND_API_KEY ve (alan adi dogrulaninca)
 * RESEND_FROM ornegi "FlexiKnee Support <support@flexi-knee.com>".
 */
const WELCOME_DISCOUNT_CODE = 'GUIDE10';
const SUPPORT_EMAIL = 'support@flexi-knee.com';
const SITE_ORIGIN = 'https://flexi-knee.com';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function quizResultText(
  profile: NormalizedQuizProfile,
  marketingConsent: boolean
): string {
  const { template, plan, sourceArticle } = profile;
  const planText = plan
    .map((item) => `Day ${item.day}: ${item.title}\n${item.action}`)
    .join('\n\n');
  const productText = template.product
    ? `\n\nYOUR MATCHED PRODUCT CATEGORY\n${template.product.title}\n${template.product.cta}: ${SITE_ORIGIN}${template.product.path}`
    : '\n\nGUIDES FIRST\nYour answers suggest learning and pattern tracking before choosing a product.';
  const guideText = template.guides
    .map((guide) => `${guide.title}: ${SITE_ORIGIN}/guides/${guide.slug}`)
    .join('\n');
  const sourceText = sourceArticle !== 'direct'
    ? `\n\nContinue the guide you started: ${SITE_ORIGIN}/guides/${sourceArticle}`
    : '';

  const savingText = marketingConsent
    ? `\n\nWELCOME SAVING\nUse ${WELCOME_DISCOUNT_CODE} for 10% off at ${SITE_ORIGIN}/shop.`
    : '';

  return `Your FlexiKnee quiz result\n\n${template.headline}\n${template.summary}\n\nYOUR 7-DAY STARTER PLAN\n\n${planText}${productText}\n\nMATCHED GUIDES\n${guideText}${sourceText}${savingText}\n\nThis quiz provides general educational information and does not diagnose or treat a condition. Seek medical guidance for severe or worsening pain, rapid swelling, a hot red knee, fever, inability to bear weight, locking, repeated giving way, or other urgent symptoms. Reply to this email if you need help using FlexiKnee.com.`;
}

function quizResultHtml(
  profile: NormalizedQuizProfile,
  marketingConsent: boolean
): string {
  const { template, plan, sourceArticle } = profile;
  const planHtml = plan
    .map(
      (item) => `
        <tr>
          <td style="width:54px;vertical-align:top;padding:0 12px 14px 0;">
            <span style="display:inline-block;min-width:38px;text-align:center;background:#dbeafe;color:#1d4ed8;border-radius:999px;padding:7px 6px;font-size:12px;font-weight:800;">DAY ${item.day}</span>
          </td>
          <td style="vertical-align:top;padding:1px 0 14px;">
            <p style="font-size:15px;font-weight:800;line-height:20px;color:#0f172a;margin:0 0 4px;">${escapeHtml(item.title)}</p>
            <p style="font-size:13px;line-height:20px;color:#475569;margin:0;">${escapeHtml(item.action)}</p>
          </td>
        </tr>
      `
    )
    .join('');

  const productHtml = template.product
    ? `
      <div style="margin:26px 0 0;padding:22px;border:1px solid #bfdbfe;border-radius:18px;background:#eff6ff;">
        <p style="font-size:11px;font-weight:800;letter-spacing:1.4px;color:#2563eb;margin:0 0 8px;">YOUR MATCHED PRODUCT CATEGORY</p>
        <h2 style="font-size:19px;line-height:25px;color:#0f172a;margin:0 0 10px;">${escapeHtml(template.product.title)}</h2>
        <p style="font-size:13px;line-height:20px;color:#475569;margin:0 0 16px;">Use the product as one part of the plan and follow its fit, skin-safety, and session instructions.</p>
        <a href="${SITE_ORIGIN}${template.product.path}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;padding:12px 20px;border-radius:999px;">${escapeHtml(template.product.cta)}</a>
      </div>
    `
    : `
      <div style="margin:26px 0 0;padding:22px;border:1px solid #cbd5e1;border-radius:18px;background:#f8fafc;">
        <p style="font-size:11px;font-weight:800;letter-spacing:1.4px;color:#475569;margin:0 0 8px;">GUIDES FIRST</p>
        <p style="font-size:14px;line-height:21px;color:#334155;margin:0;">Your answers suggest learning and pattern tracking before choosing a product.</p>
      </div>
    `;

  const guidesHtml = template.guides
    .map(
      (guide) => `
        <li style="margin:0 0 10px;">
          <a href="${SITE_ORIGIN}/guides/${guide.slug}" style="color:#1d4ed8;text-decoration:none;font-size:14px;font-weight:700;line-height:20px;">${escapeHtml(guide.title)}</a>
        </li>
      `
    )
    .join('');

  const sourceHtml = sourceArticle !== 'direct'
    ? `<p style="font-size:12px;line-height:18px;color:#64748b;margin:16px 0 0;">Continue where you started: <a href="${SITE_ORIGIN}/guides/${sourceArticle}" style="color:#2563eb;">open the guide</a>.</p>`
    : '';

  const savingHtml = marketingConsent
    ? `
          <div style="text-align:center;margin:28px 0 0;padding:22px;border-radius:18px;background:#f8fafc;">
            <p style="font-size:12px;font-weight:800;letter-spacing:1.2px;color:#475569;margin:0 0 10px;">WELCOME SAVING</p>
            <span style="display:inline-block;border:2px dashed #93c5fd;background:#eff6ff;color:#1d4ed8;font-size:20px;font-weight:800;letter-spacing:4px;padding:10px 24px;border-radius:14px;">${WELCOME_DISCOUNT_CODE}</span>
            <p style="font-size:12px;color:#64748b;margin:8px 0 14px;">10% off at checkout</p>
            <a href="${SITE_ORIGIN}/shop" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;padding:12px 24px;border-radius:999px;">Explore FlexiKnee products</a>
          </div>
      `
    : '';

  return `
    <div style="background:#f1f5f9;padding:24px 10px;">
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #dbe3ee;border-radius:24px;overflow:hidden;color:#0f172a;">
        <div style="background:linear-gradient(135deg,#172554 0%,#1d4ed8 58%,#0ea5a4 100%);padding:32px 28px;color:#ffffff;">
          <p style="font-size:11px;font-weight:800;letter-spacing:1.8px;margin:0 0 12px;color:#bfdbfe;">YOUR FLEXIKNEE QUIZ RESULT</p>
          <h1 style="font-size:26px;line-height:33px;margin:0 0 12px;">${escapeHtml(template.headline)}</h1>
          <p style="font-size:14px;line-height:22px;margin:0;color:#e0f2fe;">${escapeHtml(template.summary)}</p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:11px;font-weight:800;letter-spacing:1.4px;color:#2563eb;margin:0 0 8px;">YOUR 7-DAY STARTER PLAN</p>
          <p style="font-size:13px;line-height:20px;color:#64748b;margin:0 0 22px;">One focused step per day, composed from the answers you selected.</p>
          <table role="presentation" style="width:100%;border-collapse:collapse;">${planHtml}</table>

          ${productHtml}

          <div style="margin:26px 0 0;padding:22px;border:1px solid #e2e8f0;border-radius:18px;">
            <h2 style="font-size:18px;line-height:24px;color:#0f172a;margin:0 0 14px;">Your matched guides</h2>
            <ul style="padding:0 0 0 18px;margin:0;">${guidesHtml}</ul>
            ${sourceHtml}
          </div>

          ${savingHtml}

          <p style="font-size:11px;line-height:17px;color:#94a3b8;margin:24px 0 0;">
            This quiz provides general educational information and does not diagnose or treat a condition. Seek medical guidance for severe or worsening pain, rapid swelling, a hot red knee, fever, inability to bear weight, locking, repeated giving way, or other urgent symptoms. You are receiving this because you requested your result at flexi-knee.com. Reply to this email if you need help.
          </p>
        </div>
      </div>
    </div>
  `;
}

async function sendQuizResultEmail(
  toEmail: string,
  profile: NormalizedQuizProfile,
  marketingConsent: boolean
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[newsletter] RESEND_API_KEY is missing; quiz result email skipped.');
    return false;
  }

  const from = process.env.RESEND_FROM || `FlexiKnee Support <${SUPPORT_EMAIL}>`;
  const answerSignature = [
    profile.answers.when,
    profile.answers.feel,
    profile.answers.support,
    profile.answers.goal,
  ].join('-');
  const recipientKey = createHash('sha256').update(toEmail).digest('hex').slice(0, 32);
  const idempotencyKey = `quiz-${recipientKey}-${profile.resultKey}-${answerSignature}`.slice(0, 240);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      reply_to: SUPPORT_EMAIL,
      subject: 'Your personalized 7-day knee comfort plan',
      text: quizResultText(profile, marketingConsent),
      html: quizResultHtml(profile, marketingConsent),
      tags: [
        { name: 'message_type', value: 'quiz_result' },
        { name: 'quiz_result', value: profile.resultKey },
        { name: 'brand', value: 'flexiknee' },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}`);
  }

  return true;
}

async function sendWelcomeEmail(toEmail: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[newsletter] RESEND_API_KEY is missing; welcome email skipped.');
    return false;
  }
  const from = process.env.RESEND_FROM || `FlexiKnee Support <${SUPPORT_EMAIL}>`;
  const recipientKey = createHash('sha256').update(toEmail).digest('hex').slice(0, 32);
  const idempotencyKey = `welcome-${recipientKey}-${WELCOME_DISCOUNT_CODE}`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      reply_to: SUPPORT_EMAIL,
      subject: 'Your 10% welcome code is inside',
      text: `Welcome to FlexiKnee. Your 10% welcome code is ${WELCOME_DISCOUNT_CODE}. Shop at https://flexi-knee.com/shop. Reply to this email for support.`,
      tags: [
        { name: 'message_type', value: 'welcome_discount' },
        { name: 'brand', value: 'flexiknee' },
      ],
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:28px 20px;color:#0f172a;">
          <h1 style="font-size:22px;margin:0 0 8px;">Welcome to FlexiKnee</h1>
          <p style="font-size:14px;line-height:22px;color:#475569;margin:0 0 20px;">
            Thanks for joining the comfort list. New guides will land in your inbox first,
            and here is your welcome discount for any FlexiKnee device:
          </p>
          <div style="text-align:center;margin:24px 0;">
            <span style="display:inline-block;border:2px dashed #93c5fd;background:#eff6ff;color:#1d4ed8;font-size:22px;font-weight:800;letter-spacing:4px;padding:12px 28px;border-radius:14px;">
              ${WELCOME_DISCOUNT_CODE}
            </span>
            <p style="font-size:12px;color:#94a3b8;margin:8px 0 0;">10% off, applied at checkout</p>
          </div>
          <div style="text-align:center;margin:26px 0;">
            <a href="https://flexi-knee.com/shop" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 30px;border-radius:999px;">
              Shop with 10% off
            </a>
          </div>
          <p style="font-size:12px;line-height:18px;color:#94a3b8;margin:20px 0 0;">
            You are receiving this because you signed up at flexi-knee.com.
            Reply to this email any time - a real person reads it.
          </p>
        </div>
      `,
    }),
  });

  if (!r.ok) {
    throw new Error(`Resend request failed with status ${r.status}`);
  }

  return true;
}
