import { ShopifyProduct } from "@/lib/shopify";
import restWalkRelief from "@/assets/package-4/gradual-return-to-movement.svg";
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
  key: "insoles" | "calf-massager" | "heated-wrap" | "compression-sleeve" | "compression-socks" | "cold-wrap" | "generic";
  seoTitle: string;
  seoDescription: string;
  h1: string;
  badge: string;
  eyebrow: string;
  bestFor: string;
  notIdealFor: string;
  shopCategories: string[];
  ctaLabel: string;
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
    seoTitle: "Orthopedic Insoles for Knee & Foot Support | FlexiKnee",
    seoDescription: "Structured sport orthopedic insoles for walking, training and long days on your feet. Review fit, cushioning, arch support and care guidance.",
    h1: "FlexiKnee Sport Orthopedic Insoles",
    badge: "New",
    eyebrow: "Foot-to-knee support",
    bestFor: "Walking, running and long days on your feet",
    notIdealFor: "Shoes without removable liners or enough toe room",
    shopCategories: ["Walking & Foot Support"],
    ctaLabel: "Explore the Orthopedic Insoles",
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
    seoTitle: "Rechargeable Calf Massager with Heat & Compression | FlexiKnee",
    seoDescription: "Rechargeable calf massager with adjustable air compression and warmth for travel, desk days and post-activity lower-leg recovery routines.",
    h1: "FlexiKnee Rechargeable Calf Massager",
    badge: "Recovery",
    eyebrow: "Lower-leg recovery",
    bestFor: "Travel, desk days and post-activity calf fatigue",
    notIdealFor: "Unexplained one-sided swelling or suspected circulation problems",
    shopCategories: ["Compression", "Massage", "Travel Recovery"],
    ctaLabel: "Explore the Calf Massager",
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
        image: "/images/product-stories/calf-massager-lounge.webp",
        alt: "Woman relaxing on a sofa while wearing the FlexiKnee Calf Recovery Massager",
      },
      {
        title: "Simple to put on and adjust",
        text: "A close-up product-in-use angle helps the device feel approachable, showing the wraparound fit and the easy, supportive setup around the lower leg.",
        image: "/images/product-stories/calf-massager-closeup.webp",
        alt: "Close-up of the FlexiKnee Calf Recovery Massager being adjusted on the calf",
      },
      {
        title: "Fits naturally into work-from-home days",
        text: "This desk-friendly scene gives shoppers another reason to buy by showing how the massager can fit into normal daily life, not just workout recovery.",
        image: "/images/product-stories/calf-massager-workday.webp",
        alt: "Woman working from home while using the FlexiKnee Calf Recovery Massager",
      },
      {
        title: "A smart reset after movement",
        text: "The final image connects the massager to a post-exercise recovery moment, helping the page tell a fuller story and making the product feel more desirable.",
        image: "/images/product-stories/calf-massager-post-workout.webp",
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
    seoTitle: "USB Heated Knee Wrap for Targeted Warmth | FlexiKnee",
    seoDescription: "Lightweight USB heated knee wrap with adjustable warmth for focused sessions at home or at a desk. Review fit, use, care and safety guidance.",
    h1: "FlexiKnee USB Heated Knee Wrap",
    badge: "Simple warmth",
    eyebrow: "Targeted knee warmth",
    bestFor: "Straightforward warming sessions at home or at a desk",
    notIdealFor: "Users who want massage modes or fully cordless use",
    shopCategories: ["Heat"],
    ctaLabel: "Explore the Heated Knee Wrap",
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
        image: "/images/product-stories/heated-wrap-home-lounge.webp",
        alt: "Woman sitting on a sofa while using the FlexiKnee USB Heated Knee Wrap",
      },
      {
        title: "Close-up fit and everyday simplicity",
        text: "A tighter product-in-use image helps reinforce the wraparound fit, the soft material and the low-friction setup without relying on stock-looking feature graphics.",
        image: "/images/product-stories/heated-wrap-closeup-fit.webp",
        alt: "Close-up of the FlexiKnee USB Heated Knee Wrap connected to a power bank",
      },
      {
        title: "Easy to use during the workday",
        text: "Showing the wrap during laptop time supports the idea that it can slot naturally into desk routines, remote work and short comfort breaks.",
        image: "/images/product-stories/heated-wrap-workday.webp",
        alt: "Woman working at a desk while wearing the FlexiKnee USB Heated Knee Wrap",
      },
      {
        title: "A natural fit after movement",
        text: "The final image connects the wrap to a post-exercise cool-down moment, giving the page a more complete story and a stronger reason to buy.",
        image: "/images/product-stories/heated-wrap-post-exercise.webp",
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
  "cold-wrap": {
    key: "cold-wrap",
    seoTitle: "Reusable Knee Ice Pack Wrap for Cold Therapy | FlexiKnee",
    seoDescription: "Reusable adjustable knee ice pack wrap with a 24 cm gel pad for short cold-compress routines after activity. Review cooling, fit, care and safety guidance.",
    h1: "FlexiKnee Reusable Knee Ice Pack Wrap",
    badge: "Cold recovery",
    eyebrow: "Reusable knee cold wrap",
    bestFor: "Short cold-compress sessions after activity or when cooling is appropriate",
    notIdealFor: "Reduced sensation, circulation concerns or a prescribed post-operative cooling protocol",
    shopCategories: ["Cold Therapy", "Post-Activity Recovery"],
    ctaLabel: "Explore the Knee Ice Pack Wrap",
    cardCopy: "A reusable gel-pad wrap for simple, hands-free knee cooling without a pump or power cable.",
    summary:
      "A reusable cold-compress wrap designed to keep a flexible gel pad positioned around the knee during a short, awake cooling session. The adjustable wrap is a simpler alternative to a powered cold-therapy machine when circulating water and clinician-set compression are not required.",
    highlights: [
      "Reusable cold-compress gel pad",
      "Adjustable wraparound fit",
      "24 cm / 9.45 in center pad",
      "No pump, tubing or electricity",
    ],
    benefitCards: [
      {
        title: "Cold that stays in position",
        text: "The wrap holds the chilled center pad against the knee so both hands remain free during a short seated recovery routine.",
      },
      {
        title: "A low-complexity option",
        text: "There is no reservoir, pump, tubing or charging step. Chill the wrap, position it comfortably and monitor the skin throughout the session.",
      },
      {
        title: "Reusable for repeat routines",
        text: "After use, inspect and clean the wrap as directed, then return it to cold storage so it is ready for a later session.",
      },
    ],
    steps: [
      {
        title: "Chill before use",
        text: "Place the wrap in the refrigerator for 1 hour or the freezer for 30 minutes, following the supplied product instructions.",
      },
      {
        title: "Protect and position",
        text: "Use a thin fabric barrier when needed, center the 24 cm / 9.45 in pad over the intended area and fasten the wrap without restricting circulation.",
      },
      {
        title: "Use a short, awake session",
        text: "Check the skin frequently and remove the wrap immediately if cold becomes painful or causes burning, marked numbness or unusual color change.",
      },
    ],
    care: [
      "Follow the supplied cleaning instructions and allow the fabric to dry fully before cold storage.",
      "Keep the gel pad away from sharp objects and stop using it if the surface splits, leaks or becomes damaged.",
      "Store the wrap flat or loosely folded so the gel pad is not sharply creased or crushed.",
    ],
    safety: [
      "Do not use directly over broken skin, an area with reduced sensation or a knee where circulation is impaired.",
      "Do not sleep while wearing the wrap, overtighten it or use cold long enough to create painful numbness or skin discoloration.",
      "Follow the treating team's protocol after surgery or a diagnosed injury. A reusable wrap does not replace prescribed circulating cold therapy or medical assessment.",
    ],
    faqs: [
      {
        question: "Is this the same as a cold therapy machine?",
        answer: "No. This is a reusable gel-pad wrap. It does not circulate chilled water, provide powered compression or maintain a set temperature like a cold-therapy machine.",
      },
      {
        question: "How should I cool the knee ice pack wrap?",
        answer: "Place it in the refrigerator for 1 hour or in the freezer for 30 minutes. Follow the supplied instructions and do not heat, puncture or place the wrap in an appliance that is not listed for it.",
      },
      {
        question: "Can I put the cold wrap directly on my skin?",
        answer: "A thin fabric barrier is the safer starting point, especially when the wrap has come from the freezer. Check the skin frequently and stop if the cold becomes painful or sensation changes.",
      },
      {
        question: "Can I wear the knee ice pack wrap while sleeping?",
        answer: "No. Use it only while awake so you can monitor pressure, skin color, temperature and sensation throughout the session.",
      },
    ],
    guides: [
      {
        title: "Cold Therapy Machine for the Knee",
        href: "/guides/cold-therapy-machine-knee",
        description: "Compare reusable ice wraps with circulating cold-therapy machines and understand when each format may fit.",
      },
      {
        title: "Heat vs Ice for Knees",
        href: "/guides/heat-vs-ice-for-knees",
        description: "Choose cold or warmth according to the situation rather than using either one automatically.",
      },
      {
        title: "Knee Swelling After Exercise",
        href: "/guides/knee-swelling-after-exercise",
        description: "Review load, swelling patterns and warning signs before relying on a recovery tool.",
      },
    ],
    visuals: [
      {
        title: "A simple cold-compress routine at home",
        text: "The wrap is designed for a short, seated cooling session without setting up a reservoir, pump or tubing.",
        image: "/images/product-stories/ice-pack-wrap-home-routine.webp",
        alt: "Adult using the FlexiKnee Reusable Knee Ice Pack Wrap during a seated recovery routine at home",
      },
      {
        title: "Adjustable positioning around the knee",
        text: "A close view helps shoppers understand how the wrap keeps the chilled center pad positioned while the fastening is adjusted for comfort.",
        image: "/images/product-stories/ice-pack-wrap-closeup-fit.webp",
        alt: "Close-up of the FlexiKnee Reusable Knee Ice Pack Wrap fastened comfortably around the knee",
      },
      {
        title: "Prepare it before the routine",
        text: "Chill the wrap in the refrigerator for 1 hour or the freezer for 30 minutes, then inspect it before placing it around the knee.",
        image: "/images/product-stories/ice-pack-wrap-fridge-prep.webp",
        alt: "FlexiKnee Reusable Knee Ice Pack Wrap being prepared for cold storage before use",
      },
      {
        title: "A focused option after activity",
        text: "The hands-free format can fit into a calm post-activity reset when cold is appropriate and warning signs do not require assessment.",
        image: "/images/product-stories/ice-pack-wrap-post-activity.webp",
        alt: "Adult wearing the FlexiKnee Reusable Knee Ice Pack Wrap while resting after activity",
      },
      {
        title: "See the wrap from both sides",
        text: "Front and skin-facing views show the gel-pad shape, open-kneecap design, fastening zones and full wraparound layout.",
        image: "/images/product-stories/ice-pack-wrap-storage.webp",
        alt: "Front and skin-facing views of the FlexiKnee Reusable Knee Ice Pack Wrap",
      },
    ],
    comparison: {
      use: "Targeted cold",
      heat: "No",
      massage: "No",
      support: "Adjustable wrap",
      portability: "Reusable, no power",
    },
  },
  "compression-socks": {
    key: "compression-socks",
    seoTitle: "Knee-High Compression Socks for Women & Men | FlexiKnee",
    seoDescription: "Shop FlexiKnee knee-high compression socks for women and men. A snug nylon knit for flights, work, driving, walking, golf, hiking and active days.",
    h1: "FlexiKnee Everyday Compression Socks",
    badge: "New",
    eyebrow: "Knee-high support for everyday routines",
    bestFor: "Travel, work, standing, walking and active days",
    notIdealFor: "Anyone who needs a prescribed pressure class or has unexplained one-sided swelling",
    shopCategories: ["Compression", "Travel Recovery", "Walking & Foot Support"],
    ctaLabel: "Explore the Compression Socks",
    cardCopy: "Knee-high stretch-knit support for travel, work and active days.",
    summary:
      "Long flight, busy shift or active weekend? These closed-toe, knee-high socks wrap the foot and lower leg in a close, supportive stretch-knit fit for travel, desk work, standing, walking, driving, golf, running and hiking.",
    highlights: [
      "Knee-high, closed-toe coverage",
      "Stretch-knit nylon construction",
      "Unisex sizing from S/M to XXL",
      "Neutral colors for work, travel and activity",
    ],
    benefitCards: [
      {
        title: "Support from foot to calf",
        text: "The knee-high shape covers the foot, ankle and lower leg in one close-fitting layer, without the bulk of a separate calf device.",
      },
      {
        title: "Made for long, varied days",
        text: "The simple pull-on design works across flights, driving, desk time, standing shifts, walking and active weekend routines.",
      },
      {
        title: "A fit you can check before ordering",
        text: "Three unisex sizes combine calf circumference and US shoe-size guidance. Measure the widest part of the calf first, then use shoe size as a second check.",
      },
    ],
    steps: [
      {
        title: "Measure the widest part of your calf",
        text: "Compare calf circumference with the size chart first. Use the listed shoe-size range only as a second check.",
      },
      {
        title: "Roll, place and pull",
        text: "Turn the sock down toward the heel, slide the foot in, seat the heel, then unroll the fabric gradually up the calf.",
      },
      {
        title: "Smooth the cuff below the knee",
        text: "Remove wrinkles and keep the top band flat below the knee crease. The fit may feel snug, but it should not cause pain, numbness or color change.",
      },
    ],
    care: [
      "Wash gently in cool water and keep the fabric away from bleach or fabric softener.",
      "Air-dry flat or hanging away from direct heat; do not iron the stretch knit.",
      "Replace the socks when the cuff, heel or calf section no longer returns to its original shape.",
    ],
    safety: [
      "No mmHg rating or medical compression class is published for this product. It is not presented as medical-grade compression.",
      "Ask a clinician before use for a diagnosed vein condition, prescribed compression, significant arterial disease, reduced sensation, open wounds or persistent swelling.",
      "Do not use a tight garment to self-treat possible DVT. New one-sided swelling, warmth, redness, chest pain or shortness of breath needs urgent assessment.",
      "Remove the sock if pain, numbness, discoloration, skin irritation or swelling increases, or if the cuff rolls into a tight band.",
    ],
    faqs: [
      {
        question: "Are these compression socks for women and men?",
        answer: "Yes. The product uses unisex S/M, L/XL and XXL sizing, with separate US shoe-size ranges for women and men. Calf circumference should guide the choice first.",
      },
      {
        question: "Can I wear them on a long flight?",
        answer: "They can provide a snug, supported feel during travel when compression is appropriate for you. They are not a guarantee against blood clots. Travelers with clot risk factors should ask a clinician what pressure level and fit are appropriate.",
      },
      {
        question: "Are they useful when standing all day?",
        answer: "They are designed for people who prefer close-fitting lower-leg support during work and long periods on their feet. Movement breaks, comfortable footwear and the correct size still matter.",
      },
      {
        question: "Are these medical-grade or graduated compression socks?",
        answer: "No medical-grade status, graduated-pressure test or mmHg value is published for this product. Do not substitute them for a prescribed compression garment.",
      },
      {
        question: "Can I use them for varicose veins?",
        answer: "Only after checking that consumer compression is appropriate for your situation. Diagnosed venous disease, swelling or a prescribed pressure class should be managed with clinician guidance.",
      },
      {
        question: "How do I choose the right size?",
        answer: "Measure the widest part of the calf and choose the band that contains that measurement. Then confirm that your US shoe size also falls within the listed range. Do not size down to create extra pressure.",
      },
    ],
    guides: [
      {
        title: "Varicose Veins and Pain Behind the Knee",
        href: "/guides/varicose-veins-knee-pain",
        description: "Separate stable vein symptoms from joint pain and urgent blood-clot warning signs.",
      },
      {
        title: "Knee Pain After Flights",
        href: "/guides/knee-pain-after-flights",
        description: "Plan movement breaks, sitting positions and a safer travel routine.",
      },
      {
        title: "Knee Pain After Standing",
        href: "/guides/knee-pain-after-standing",
        description: "Understand prolonged-standing patterns and when swelling needs closer attention.",
      },
    ],
    visuals: [
      {
        title: "Support that travels with you",
        text: "A knee-high, pull-on design makes it easy to build lower-leg support into flights, driving days and other long seated routines.",
        image: "/images/product-stories/compression-socks-travel.webp",
        alt: "Traveler wearing navy FlexiKnee Everyday Compression Socks while seated with carry-on luggage",
      },
      {
        title: "A discreet option for busy workdays",
        text: "Neutral colors and a simple ribbed knit help the socks fit naturally into standing shifts, desk days and everyday clothing.",
        image: "/images/product-stories/compression-socks-workday.webp",
        alt: "Adult wearing black FlexiKnee Everyday Compression Socks during a standing workday",
      },
      {
        title: "Ready for walking and active weekends",
        text: "The closed-toe, knee-high format can be worn with compatible shoes for walking, hiking, golf and other active routines.",
        image: "/images/product-stories/compression-socks-active.webp",
        alt: "Active adult wearing FlexiKnee Everyday Compression Socks before a trail walk",
      },
      {
        title: "See the knit, cuff and shaped fit",
        text: "Close-up views make the broad top cuff, stretch-knit calf section, shaped heel and closed toe easier to evaluate before choosing a color and size.",
        image: "/images/product-stories/compression-socks-knit.webp",
        alt: "Close-up details of the cuff, ribbed nylon knit, shaped heel and closed toe",
      },
      {
        title: "A straightforward everyday essential",
        text: "Choose a neutral color, check the calf measurement and keep a pair ready for the routines where you prefer a closer, supported feel.",
        image: "/images/product-stories/compression-socks-main.webp",
        alt: "Pair of navy FlexiKnee Everyday Compression Socks on a clean premium background",
      },
    ],
    comparison: {
      use: "Travel, work & activity",
      heat: "No",
      massage: "No",
      support: "Foot & calf",
      portability: "Wearable",
    },
  },
  "compression-sleeve": {
    key: "compression-sleeve",
    seoTitle: "Knee Compression Sleeve for Daily Support | FlexiKnee",
    seoDescription: "Breathable knee compression sleeve for walking, work and training. Compare sizing, materials, fit, care instructions and available colors.",
    h1: "FlexiKnee Compression Support Sleeve",
    badge: "Daily support",
    eyebrow: "Flexible compression",
    bestFor: "Walking, work, training and everyday movement",
    notIdealFor: "Unexplained swelling, numbness or anyone needing a rigid brace",
    shopCategories: ["Compression"],
    ctaLabel: "View the Compression Sleeve",
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
        image: "/images/product-stories/compression-sleeve-lounge.webp",
        alt: "Woman sitting on a sofa wearing the FlexiKnee Compression Support Sleeve",
      },
      {
        title: "A closer look at fit and texture",
        text: "A tighter crop helps the shopper understand the knit feel, the sleeve coverage and the easy pull-on fit that makes the product feel practical for everyday use.",
        image: "/images/product-stories/compression-sleeve-closeup.webp",
        alt: "Close-up of the FlexiKnee Compression Support Sleeve being adjusted on the knee",
      },
      {
        title: "Support for real movement",
        text: "Showing the sleeve during stair movement helps reinforce a key buying trigger: simple, flexible support during active parts of the day.",
        image: "/images/product-stories/compression-sleeve-stairs.webp",
        alt: "Woman walking down stairs while wearing the FlexiKnee Compression Support Sleeve",
      },
      {
        title: "Easy to keep on through the day",
        text: "This workday scene rounds out the story by showing the sleeve as something that can stay with the user during normal daily routines, not only dedicated recovery time.",
        image: "/images/product-stories/compression-sleeve-workday.webp",
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
  seoTitle: "Knee Comfort Product | FlexiKnee",
  seoDescription: "Explore this FlexiKnee product's purpose, options, care guidance and place in a practical everyday comfort routine.",
  h1: "FlexiKnee Knee Comfort Product",
  badge: "FlexiKnee system",
  eyebrow: "Daily comfort support",
  bestFor: "Building a simple at-home comfort routine",
  notIdealFor: "Diagnosing or treating a medical condition",
  shopCategories: [],
  ctaLabel: "View Product Details",
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

  if (/flexiknee-everyday-compression-socks|compression socks|support socks|knee-high socks|varicose veins compression socks/.test(text)) return profiles["compression-socks"];
  if (/insole|orthotic|orthopedic|footbed|arch support/.test(text)) return profiles.insoles;
  if (/calf|lower leg|leg massager|air compression/.test(text)) return profiles["calf-massager"];
  if (/heated|heating|warming|heat wrap|usb/.test(text)) return profiles["heated-wrap"];
  if (/flexiknee-reusable-knee-ice-pack-wrap|knee ice pack|ice pack wrap|cold compress|cold therapy gel|reusable gel pad/.test(text)) return profiles["cold-wrap"];
  if (/compression|sleeve|knee brace|support sleeve/.test(text)) return profiles["compression-sleeve"];

  return genericProfile;
}

export function getAllProductProfiles(): ProductProfile[] {
  return [profiles.insoles, profiles["compression-sleeve"], profiles["compression-socks"], profiles["calf-massager"], profiles["heated-wrap"], profiles["cold-wrap"]];
}
