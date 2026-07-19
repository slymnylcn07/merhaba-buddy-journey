import { ShopifyProduct } from "@/lib/shopify";
import restWalkRelief from "@/assets/article-section-rest-stiff-walk-relief.jpg";
import deviceHomeUse from "@/assets/article-device-home-use.jpg";
import exerciseRecovery from "@/assets/article-exercise-recovery-illustration.jpg";

export interface ProductGuideLink {
  title: string;
  href: string;
  description: string;
}

export interface ProductVisual {
  title: string;
  text: string;
  image: string;
  alt: string;
}

export interface ProductProfile {
  key: "insoles" | "calf-massager" | "heated-wrap" | "compression-sleeve" | "generic";
  badge: string;
  eyebrow: string;
  bestFor: string;
  cardCopy: string;
  summary: string;
  highlights: string[];
  benefitCards: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  care: string[];
  safety: string[];
  faqs: Array<{ question: string; answer: string }>;
  guides: ProductGuideLink[];
  visuals: ProductVisual[];
  comparison: {
    use: string;
    heat: string;
    massage: string;
    support: string;
    portability: string;
  };
}

const profiles: Record<Exclude<ProductProfile["key"], "generic">, ProductProfile> = {
  insoles: {
    key: "insoles",
    badge: "New",
    eyebrow: "Foot-to-knee support",
    bestFor: "Walking, running and long days on your feet",
    cardCopy: "Structured foot support designed to improve comfort from the ground up.",
    summary:
      "Support starts at the feet. These sport orthopedic insoles are designed to add cushioning, arch guidance and a more stable base inside everyday and active footwear.",
    highlights: [
      "Supportive arch profile",
      "Impact-absorbing heel and forefoot cushioning",
      "Trim-to-fit shape for compatible footwear",
      "Designed for walking, training and daily standing",
    ],
    benefitCards: [
      {
        title: "A steadier base",
        text: "A supportive footbed helps reduce excess movement inside the shoe and creates a more consistent platform for each step.",
      },
      {
        title: "Cushioning where impact begins",
        text: "Heel and forefoot cushioning help soften repeated contact during walking, workouts and long periods on hard floors.",
      },
      {
        title: "Built for real shoes",
        text: "The trim-to-fit outline makes it easier to adapt the insole to compatible trainers, work shoes and casual footwear.",
      },
    ],
    steps: [
      { title: "Remove the original liner", text: "Take out the existing removable insole when the shoe allows it." },
      { title: "Compare and trim", text: "Use the original liner as a size guide and trim gradually rather than cutting too much at once." },
      { title: "Build wear time", text: "Start with one to two hours and increase over several days while your feet adapt." },
    ],
    care: [
      "Air-dry after use and avoid direct heat.",
      "Wipe the surface with a lightly damp cloth; do not machine wash unless the Shopify product label specifically allows it.",
      "Replace when cushioning stays compressed or the support shell becomes distorted.",
    ],
    safety: [
      "Stop use if the insole causes numbness, pressure points or worsening discomfort.",
      "Do not force the insole into footwear that becomes tight across the toes.",
      "Persistent pain, swelling or altered walking should be assessed by a qualified professional.",
    ],
    faqs: [
      {
        question: "Do these replace the original shoe insoles?",
        answer: "In most compatible shoes, yes. Removing the original removable liner usually creates the best fit and prevents the shoe from becoming too tight.",
      },
      {
        question: "How quickly should I get used to them?",
        answer: "Most people benefit from a gradual break-in period over several days. Start with short wear periods and increase only while the fit remains comfortable.",
      },
      {
        question: "Can I move one pair between different shoes?",
        answer: "You can when the shoes have similar internal volume and shape, although a dedicated pair in frequently worn shoes gives a more consistent fit.",
      },
    ],
    guides: [
      {
        title: "Best Insoles for Knee Pain 2026",
        href: "/guides/best-insoles-for-knee-pain-2026",
        description: "Learn how arch support, cushioning and shoe fit can influence the knee.",
      },
      {
        title: "Best Running Shoes for Knee Pain",
        href: "/guides/best-running-shoes-knee-pain",
        description: "Pair the insole with a shoe that has the right fit and structure.",
      },
      {
        title: "Knee Pain After Long Walks",
        href: "/guides/knee-pain-after-long-walks",
        description: "Understand load, surfaces and recovery after longer days on your feet.",
      },
    ],
    visuals: [
      {
        title: "Upgrade the shoes you already reach for",
        text: "This opening scene shows how easily the FlexiKnee Sport Orthopedic Insoles can become part of a normal training or walking routine, without changing the shoes you already like.",
        image: "/images/product-stories/insoles-home-setup.webp",
        alt: "Woman placing a FlexiKnee Sport Orthopedic Insole into a white athletic shoe at home",
      },
      {
        title: "A closer look at the fit",
        text: "The close-up view helps shoppers understand the full-length shape, cushioned surface and simple insert-and-go setup before they ever open the box.",
        image: "/images/product-stories/insoles-closeup-fit.webp",
        alt: "Close-up of a FlexiKnee Sport Orthopedic Insole being placed inside a running shoe",
      },
      {
        title: "Comfort that stays with the workday",
        text: "A home-office setting reinforces that the insoles are not only for workouts, they are designed for long periods of standing, walking and everyday movement too.",
        image: "/images/product-stories/insoles-workday.webp",
        alt: "Woman working at a desk while wearing athletic shoes fitted with FlexiKnee Sport Orthopedic Insoles",
      },
      {
        title: "Ready before the first step",
        text: "This getting-ready moment turns the product into part of an active lifestyle story, helping the customer picture better-supported walks, errands and training sessions.",
        image: "/images/product-stories/insoles-ready-to-move.webp",
        alt: "Woman tying athletic shoes fitted with FlexiKnee Sport Orthopedic Insoles before going outside",
      },
      {
        title: "Support the routine from start to finish",
        text: "The final scene connects the insoles to the complete movement cycle, from putting shoes on to winding down after activity, so the page ends with a strong, realistic reason to buy.",
        image: "/images/product-stories/insoles-post-activity.webp",
        alt: "Woman resting after activity beside athletic shoes and a FlexiKnee Sport Orthopedic Insole",
      },
    ],
    comparison: {
      use: "Walking & sport",
      heat: "No",
      massage: "No",
      support: "Foot & arch",
      portability: "Inside footwear",
    },
  },
  "calf-massager": {
    key: "calf-massager",
    badge: "Recovery",
    eyebrow: "Lower-leg recovery",
    bestFor: "Travel, desk days and post-activity calf fatigue",
    cardCopy: "Rechargeable compression and warmth for tired calves and lower legs.",
    summary:
      "A portable lower-leg recovery device designed to combine air compression, adjustable modes and gentle warmth for routines after travel, desk work or active days.",
    highlights: [
      "Rechargeable cordless use",
      "Adjustable compression modes",
      "Optional warming function",
      "Wraparound fit for lower-leg routines",
    ],
    benefitCards: [
      {
        title: "Rhythmic compression",
        text: "Inflating chambers create a repeating squeeze-and-release sensation around the calf for a relaxing recovery routine.",
      },
      {
        title: "Portable by design",
        text: "Rechargeable operation makes it easier to use away from a wall socket after travel or around the home.",
      },
      {
        title: "Adjustable sessions",
        text: "Multiple modes let you choose a gentler or more noticeable compression pattern according to comfort.",
      },
    ],
    steps: [
      { title: "Wrap comfortably", text: "Position the unit around the calf without overtightening before the session starts." },
      { title: "Begin low", text: "Start with the gentlest compression and no heat, then adjust one setting at a time." },
      { title: "Keep sessions simple", text: "Use a short seated recovery session and remove the device immediately if sensation changes." },
    ],
    care: [
      "Disconnect from charging before cleaning.",
      "Wipe the fabric and control area with a soft, lightly damp cloth.",
      "Store flat or loosely rolled so the air chambers and tubing are not sharply folded.",
    ],
    safety: [
      "Do not use over suspected blood clots, unexplained one-sided swelling, open wounds or reduced sensation.",
      "People with circulation disorders, neuropathy or recent surgery should seek professional guidance before use.",
      "Stop immediately if compression causes pain, numbness, discoloration or dizziness.",
    ],
    faqs: [
      {
        question: "Is this a knee massager?",
        answer: "No. It is designed mainly for the calf and lower leg, making it a complementary option for travel or lower-leg recovery rather than a replacement for the main FlexiKnee knee device.",
      },
      {
        question: "Should compression feel very tight?",
        answer: "It should feel firm but comfortable. Stronger is not automatically better; begin at the lowest setting and stop if you notice pain, numbness or color change.",
      },
      {
        question: "Can I use it after a flight?",
        answer: "It can be part of a general relaxation routine after travel, but unexplained swelling, tenderness or shortness of breath requires urgent medical assessment rather than massage.",
      },
    ],
    guides: [
      {
        title: "Knee Pain After Flights",
        href: "/guides/knee-pain-after-flights",
        description: "A practical look at sitting time, stiffness and movement after travel.",
      },
      {
        title: "Knee Pain After Car Rides",
        href: "/guides/knee-pain-after-car-rides",
        description: "Build a better break and mobility routine for long drives.",
      },
      {
        title: "Daily Knee Care Routine",
        href: "/guides/daily-knee-care-routine",
        description: "Combine lower-leg recovery with simple daily movement habits.",
      },
    ],
    visuals: [
      {
        title: "A calm recovery moment at home",
        text: "This lead lifestyle image makes the calf recovery massager feel premium, comfortable and easy to picture as part of a real evening routine.",
        image: "/images/product-stories/calf-massager-lounge.png",
        alt: "Woman relaxing on a sofa while wearing the FlexiKnee Calf Recovery Massager",
      },
      {
        title: "Simple to put on and adjust",
        text: "A close-up product-in-use angle helps the device feel approachable, showing the wraparound fit and the easy, supportive setup around the lower leg.",
        image: "/images/product-stories/calf-massager-closeup.png",
        alt: "Close-up of the FlexiKnee Calf Recovery Massager being adjusted on the calf",
      },
      {
        title: "Fits naturally into work-from-home days",
        text: "This desk-friendly scene gives shoppers another reason to buy by showing how the massager can fit into normal daily life, not just workout recovery.",
        image: "/images/product-stories/calf-massager-workday.png",
        alt: "Woman working from home while using the FlexiKnee Calf Recovery Massager",
      },
      {
        title: "A smart reset after movement",
        text: "The final image connects the massager to a post-exercise recovery moment, helping the page tell a fuller story and making the product feel more desirable.",
        image: "/images/product-stories/calf-massager-post-workout.png",
        alt: "Woman using the FlexiKnee Calf Recovery Massager after exercise",
      },
    ],
    comparison: {
      use: "Travel & calf recovery",
      heat: "Optional",
      massage: "Air compression",
      support: "Lower leg",
      portability: "Rechargeable",
    },
  },
  "heated-wrap": {
    key: "heated-wrap",
    badge: "Simple warmth",
    eyebrow: "Targeted knee warmth",
    bestFor: "Straightforward warming sessions at home or at a desk",
    cardCopy: "A lightweight heated knee wrap for simple, focused warmth.",
    summary:
      "A flexible knee wrap for people who want uncomplicated warmth without a full massage program. Connect the power source, choose a comfortable level and build a short warming session into the day.",
    highlights: [
      "Adjustable warming levels",
      "Flexible wraparound design",
      "USB-powered everyday use",
      "Lightweight and easy to store",
    ],
    benefitCards: [
      {
        title: "Focused warmth",
        text: "The wrap keeps the warming area close to the knee rather than heating an entire room or relying on a loose pad.",
      },
      {
        title: "Low-complexity routine",
        text: "A good fit for users who mainly want a simple warmth feature without multiple massage modes.",
      },
      {
        title: "Desk and home friendly",
        text: "The flexible format works well for seated use while reading, watching television or working at a desk.",
      },
    ],
    steps: [
      { title: "Position the warming zone", text: "Center the heated section over the area you want to warm and fasten without restricting circulation." },
      { title: "Start on low", text: "Choose the lowest level first and check the skin regularly during the initial sessions." },
      { title: "Use timed sessions", text: "Keep sessions short, stay awake and disconnect the wrap when finished." },
    ],
    care: [
      "Disconnect the USB cable and allow the wrap to cool before cleaning.",
      "Follow the product label for removable components and washing instructions.",
      "Do not fold sharply across the heating element or store while damp.",
    ],
    safety: [
      "Never sleep while the wrap is powered.",
      "Do not use on broken skin, areas with reduced sensation or directly after applying topical heat products.",
      "Stop use if the heat feels uneven, excessive or causes persistent redness.",
    ],
    faqs: [
      {
        question: "Does a USB heated wrap include a power bank?",
        answer: "Included accessories depend on the Shopify variant and product description. Check the selected variant and package details before ordering.",
      },
      {
        question: "How tight should the wrap be?",
        answer: "Secure enough to stay in place, but loose enough that it does not create numbness, tingling or pressure behind the knee.",
      },
      {
        question: "How is this different from the Smart Heated Knee Massager?",
        answer: "This wrap focuses on basic warmth. The main FlexiKnee device is the premium all-in-one option with a broader feature set and a dedicated product experience.",
      },
    ],
    guides: [
      {
        title: "Heat vs Ice for Knees",
        href: "/guides/heat-vs-ice-for-knees",
        description: "Choose warmth or cold according to the situation rather than habit.",
      },
      {
        title: "Knee Warmth for Daily Comfort",
        href: "/guides/knee-warmth-daily-comfort",
        description: "Learn when and how warmth fits into an everyday routine.",
      },
      {
        title: "Cordless Heated Knee Massagers 2026",
        href: "/guides/cordless-rechargeable-heated-knee-massagers-2026",
        description: "Compare simple wraps with rechargeable multi-feature devices.",
      },
    ],
    visuals: [
      {
        title: "A soft, premium lounge moment",
        text: "This lead image makes the heated wrap feel aspirational and easy to imagine in a calm at-home routine, which is exactly what a shopper should feel after scrolling below the product gallery.",
        image: "/images/product-stories/heated-wrap-home-lounge.png",
        alt: "Woman sitting on a sofa while using the FlexiKnee USB Heated Knee Wrap",
      },
      {
        title: "Close-up fit and everyday simplicity",
        text: "A tighter product-in-use image helps reinforce the wraparound fit, the soft material and the low-friction setup without relying on stock-looking feature graphics.",
        image: "/images/product-stories/heated-wrap-closeup-fit.png",
        alt: "Close-up of the FlexiKnee USB Heated Knee Wrap connected to a power bank",
      },
      {
        title: "Easy to use during the workday",
        text: "Showing the wrap during laptop time supports the idea that it can slot naturally into desk routines, remote work and short comfort breaks.",
        image: "/images/product-stories/heated-wrap-workday.png",
        alt: "Woman working at a desk while wearing the FlexiKnee USB Heated Knee Wrap",
      },
      {
        title: "A natural fit after movement",
        text: "The final image connects the wrap to a post-exercise cool-down moment, giving the page a more complete story and a stronger reason to buy.",
        image: "/images/product-stories/heated-wrap-post-exercise.png",
        alt: "Woman using the FlexiKnee USB Heated Knee Wrap after exercise on a yoga mat",
      },
    ],
    comparison: {
      use: "Simple warmth",
      heat: "Yes",
      massage: "No",
      support: "Light wrap",
      portability: "USB powered",
    },
  },
  "compression-sleeve": {
    key: "compression-sleeve",
    badge: "Daily support",
    eyebrow: "Flexible compression",
    bestFor: "Walking, work, training and everyday movement",
    cardCopy: "Breathable compression support for active daily routines.",
    summary:
      "A flexible knee sleeve designed to provide a close, supportive feel during everyday movement. It is a simple non-powered option for walking, work and activity routines.",
    highlights: [
      "Flexible compression feel",
      "Breathable everyday fabric",
      "Low-profile under clothing",
      "Suitable for movement-focused routines",
    ],
    benefitCards: [
      {
        title: "Support without electronics",
        text: "A straightforward option when you want a close supportive feel during movement rather than heat or powered massage.",
      },
      {
        title: "Easy to keep in the routine",
        text: "The lightweight sleeve format is simple to carry, wear and remove during normal daily activities.",
      },
      {
        title: "Movement-friendly fit",
        text: "Stretch fabric follows bending and straightening while helping the sleeve remain positioned around the knee.",
      },
    ],
    steps: [
      { title: "Choose the correct size", text: "Use the Shopify size chart and measure the location specified on the product listing." },
      { title: "Center the sleeve", text: "Position it evenly around the kneecap and smooth out folds or rolled edges." },
      { title: "Check circulation", text: "Walk and bend the knee; remove or resize if you feel numbness, tingling or pinching." },
    ],
    care: [
      "Wash according to the product label, ideally in a laundry bag on a gentle cycle when machine washing is permitted.",
      "Air-dry fully before the next use.",
      "Replace the sleeve when compression becomes uneven or the fabric no longer returns to shape.",
    ],
    safety: [
      "Compression should feel supportive, not painful or restrictive.",
      "Do not use over open wounds or unexplained swelling without professional advice.",
      "A sleeve is not a substitute for evaluation after a significant injury or ongoing instability.",
    ],
    faqs: [
      {
        question: "Can I wear the sleeve all day?",
        answer: "Wear time depends on fit and comfort. Begin with shorter periods, remove it during sleep and check the skin and circulation regularly.",
      },
      {
        question: "Should I size down for more compression?",
        answer: "No. Use the published size chart. Sizing down can create pressure, rolling and circulation problems without providing better support.",
      },
      {
        question: "Can I exercise in it?",
        answer: "It is designed for movement-focused routines, but stop if it changes your gait, restricts bending or causes increasing discomfort.",
      },
    ],
    guides: [
      {
        title: "How to Strengthen Knees",
        href: "/guides/how-to-strengthen-knees",
        description: "Use support alongside a progressive strength and movement routine.",
      },
      {
        title: "Knee Pain Going Down Stairs",
        href: "/guides/knee-pain-going-down-stairs",
        description: "Understand one of the most demanding everyday knee movements.",
      },
      {
        title: "Daily Knee Care Routine",
        href: "/guides/daily-knee-care-routine",
        description: "Build support into a balanced daily routine rather than relying on one product.",
      },
    ],
    visuals: [
      {
        title: "A comfortable everyday support layer",
        text: "This opening image makes the compression sleeve feel immediately wearable and premium, showing it in a calm at-home setting rather than as a clinical product shot.",
        image: "/images/product-stories/compression-sleeve-lounge.png",
        alt: "Woman sitting on a sofa wearing the FlexiKnee Compression Support Sleeve",
      },
      {
        title: "A closer look at fit and texture",
        text: "A tighter crop helps the shopper understand the knit feel, the sleeve coverage and the easy pull-on fit that makes the product feel practical for everyday use.",
        image: "/images/product-stories/compression-sleeve-closeup.png",
        alt: "Close-up of the FlexiKnee Compression Support Sleeve being adjusted on the knee",
      },
      {
        title: "Support for real movement",
        text: "Showing the sleeve during stair movement helps reinforce a key buying trigger: simple, flexible support during active parts of the day.",
        image: "/images/product-stories/compression-sleeve-stairs.png",
        alt: "Woman walking down stairs while wearing the FlexiKnee Compression Support Sleeve",
      },
      {
        title: "Easy to keep on through the day",
        text: "This workday scene rounds out the story by showing the sleeve as something that can stay with the user during normal daily routines, not only dedicated recovery time.",
        image: "/images/product-stories/compression-sleeve-workday.png",
        alt: "Woman working at a desk while wearing the FlexiKnee Compression Support Sleeve",
      },
    ],
    comparison: {
      use: "Everyday movement",
      heat: "No",
      massage: "No",
      support: "Compression",
      portability: "Wearable",
    },
  },
};

const genericProfile: ProductProfile = {
  key: "generic",
  badge: "FlexiKnee system",
  eyebrow: "Daily comfort support",
  bestFor: "Building a simple at-home comfort routine",
  cardCopy: "A practical addition to the FlexiKnee daily comfort system.",
  summary:
    "This product is part of the FlexiKnee system of practical tools for movement, recovery and everyday comfort. Review the Shopify product details and selected variant before ordering.",
  highlights: ["Designed for everyday routines", "Easy to add to a wider comfort plan", "Shopify-powered secure checkout"],
  benefitCards: [
    { title: "Purpose-built", text: "Selected to solve a clear daily comfort or recovery need." },
    { title: "Easy to understand", text: "The product page keeps specifications, variants and use guidance in one place." },
    { title: "Part of a system", text: "Pair it with the guide library and knee quiz for a more informed routine." },
  ],
  steps: [
    { title: "Review the variant", text: "Confirm size, color, power or other options before adding to cart." },
    { title: "Start gradually", text: "Use the lowest-intensity or shortest practical session first." },
    { title: "Track comfort", text: "Stop if the product causes pressure, altered sensation or worsening discomfort." },
  ],
  care: ["Follow the product label and included instructions.", "Keep powered components dry.", "Inspect for wear before each use."],
  safety: ["This is a general wellness product, not a diagnosis or treatment.", "Do not use on broken skin or when sensation is reduced.", "Seek professional guidance for persistent or severe symptoms."],
  faqs: [
    { question: "Where do the product details come from?", answer: "The title, images, variants, availability and price are loaded directly from the connected Shopify store." },
    { question: "Can I return it?", answer: "Eligible orders are covered by the FlexiKnee 30-day return policy, counted from delivery. Review the refund policy for conditions and exclusions." },
  ],
  guides: [
    { title: "Daily Knee Care Routine", href: "/guides/daily-knee-care-routine", description: "Build consistent habits around the product you choose." },
    { title: "Knee Comfort Quiz", href: "/knee-quiz", description: "Get a more focused product and guide recommendation." },
  ],
  visuals: [
    {
      title: "Built around real routines",
      text: "FlexiKnee products are selected to solve a clear everyday comfort or recovery job.",
      image: deviceHomeUse,
      alt: "General at-home knee comfort routine",
    },
    {
      title: "Use the guide library too",
      text: "The store and the guide hub are designed to work together so users buy with more context.",
      image: exerciseRecovery,
      alt: "Guide-backed recovery and knee comfort planning",
    },
    {
      title: "Focus on consistent habits",
      text: "The best system product is usually the one that fits a routine you will actually repeat.",
      image: restWalkRelief,
      alt: "Consistent habit building for knee comfort",
    },
  ],
  comparison: {
    use: "Daily comfort",
    heat: "See product",
    massage: "See product",
    support: "See product",
    portability: "See product",
  },
};

export function getProductProfile(productOrText: ShopifyProduct | string): ProductProfile {
  const value = typeof productOrText === "string"
    ? productOrText
    : `${productOrText.node.title} ${productOrText.node.handle} ${(productOrText.node.tags || []).join(" ")}`;
  const text = value.toLowerCase();

  if (/insole|orthotic|orthopedic|footbed|arch support/.test(text)) return profiles.insoles;
  if (/calf|lower leg|leg massager|air compression/.test(text)) return profiles["calf-massager"];
  if (/heated|heating|warming|heat wrap|usb/.test(text)) return profiles["heated-wrap"];
  if (/compression|sleeve|knee brace|support sleeve/.test(text)) return profiles["compression-sleeve"];

  return genericProfile;
}

export function getAllProductProfiles(): ProductProfile[] {
  return [profiles.insoles, profiles["compression-sleeve"], profiles["calf-massager"], profiles["heated-wrap"]];
}
