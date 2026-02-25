import { Link } from "react-router-dom";
import PremiumCTA from "@/components/PremiumCTA";
import heroImage from "@/assets/article-hero-runners-knee-location.jpg";
import diagramFrontKnee from "@/assets/diagram-runners-front-knee.jpg";
import diagramInnerKnee from "@/assets/diagram-runners-inner-knee.jpg";
import diagramOuterKnee from "@/assets/diagram-runners-outer-knee.jpg";
import diagramBackKnee from "@/assets/diagram-runners-back-knee.jpg";

const SectionDivider = () => (
  <hr className="my-10 border-t border-border/40" />
);

export const runnersKneePainLocation = {
  article: {
    slug: "runners-knee-pain-location",
    title: "Runner's Knee Pain Location: Why It Happens and What People Commonly Feel",
    subtitle: "Understanding where running-related knee discomfort shows up",
    intro: "Runners often notice that knee discomfort doesn't always feel the same — and where it shows up can say a lot about what's going on. This guide maps out the most common runner's knee pain locations, what people typically feel in each area, and simple everyday habits that support comfort.",
    metaTitle: "Runner's Knee Pain Location: Why It Happens & What Runners Feel",
    metaDescription: "Explore where runners commonly feel knee discomfort — front, inner, outer, and back of knee. Learn what each location means and everyday comfort approaches.",
    heroImage: heroImage,
    publishedDate: "February 25, 2026",
    nextSlug: "running-knee-pain-guide",
    nextTitle: "Running Knee Pain: Common Injuries, Triggers & What Runners Can Do",
    faqs: [
      { question: "Where do runners most commonly feel knee discomfort?", answer: "The front of the knee (around the kneecap) is the most commonly reported area, often described as a dull ache during or after runs." },
      { question: "Why does the outer knee feel tight during runs?", answer: "Outer knee tightness is often associated with IT band tension, which can build up with repetitive running motion, especially on uneven surfaces or without proper warm-up." },
      { question: "Is back-of-knee tightness common for runners?", answer: "Yes, many runners notice posterior knee tightness, particularly after longer distances or when hamstring flexibility is limited." },
      { question: "Can running form affect where knee discomfort shows up?", answer: "Running form, stride length, foot strike pattern, and shoe choice can all influence which areas of the knee experience the most repetitive stress." },
    ],
    seoTags: "runner's knee location, knee pain from running explained, front knee discomfort running, outer knee pain running, inner knee soreness jogging, back of knee tightness running, knee discomfort during exercise, running form knee pressure, jogging knee sensations, knee pain spots athletes, knee discomfort guide runners, daily habits for knee comfort, runner's knee comfort approaches, knee warmth after running",
    content: (
      <>
        <p>
          Running is one of the most popular forms of exercise, but it also places significant repetitive stress on the knee joint. Many runners report that their discomfort tends to show up in specific locations — and understanding <strong>where</strong> that discomfort appears can help you adjust your habits, footwear, and daily routines for better comfort.
        </p>
        <p>
          Whether you're a seasoned marathoner or someone who jogs a few times a week, this guide breaks down the four most common <strong>runner's knee pain locations</strong> and what people typically experience in each zone.
        </p>
        <p>
          If you're looking for a broader overview of running-related knee concerns, our <Link to="/guides/running-knee-pain-guide" className="text-primary underline hover:text-primary/80">complete running knee guide</Link> covers injuries, triggers, and recovery habits in more detail.
        </p>

        <SectionDivider />

        {/* --- Zone 1: Front Knee --- */}
        <h2>Front Knee Discomfort (Patella Area)</h2>

        <figure className="my-6">
          <img
            src={diagramFrontKnee}
            alt="Diagram highlighting the front knee and patella area commonly affected in runners"
            className="w-full max-w-md mx-auto h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The front knee / patella zone — the most commonly reported area among runners
          </figcaption>
        </figure>

        <h3>Location Overview</h3>
        <p>
          The front of the knee centers around the kneecap (patella) and the surrounding soft tissue. This is the area most frequently associated with what people casually call "runner's knee." It's the zone that absorbs a significant amount of impact with every stride.
        </p>

        <h3>What It Feels Like</h3>
        <ul>
          <li>A dull, achy sensation around or behind the kneecap</li>
          <li>Discomfort that tends to build gradually during longer runs</li>
          <li>Stiffness when sitting with bent knees for extended periods</li>
          <li>A feeling of grinding or clicking when bending the knee</li>
          <li>Increased sensitivity when going downhill or descending stairs</li>
        </ul>

        <h3>Why This Area Feels Sensitive During Runs</h3>
        <p>
          The patella area handles a large share of the repetitive load during running. Several common factors contribute to front-knee sensitivity:
        </p>
        <ul>
          <li><strong>Overstriding</strong> — landing with the foot too far ahead of the body increases impact on the kneecap</li>
          <li><strong>Weak quadriceps</strong> — insufficient thigh strength means the kneecap doesn't track as smoothly</li>
          <li><strong>Sudden mileage increases</strong> — jumping up distance or intensity too quickly without building gradually</li>
          <li><strong>Worn-out shoes</strong> — shoes that have lost their cushioning transfer more impact to the knee</li>
          <li><strong>Hard surfaces</strong> — running on concrete or asphalt rather than trails or tracks</li>
        </ul>

        <h3>Everyday Comfort Approaches</h3>
        <ul>
          <li>Gentle warmth around the kneecap area before and after runs</li>
          <li>Quad-strengthening exercises (wall sits, step-ups) on non-running days</li>
          <li>Shorter stride length to reduce impact on the patella</li>
          <li>Regular shoe replacement (every 400–500 miles)</li>
          <li>Gentle stretching of the quadriceps and hip flexors after activity</li>
        </ul>

        <SectionDivider />

        {/* --- Zone 2: Inner Knee --- */}
        <h2>Inner Knee Sensations</h2>

        <figure className="my-6">
          <img
            src={diagramInnerKnee}
            alt="Diagram highlighting the inner medial knee area affected during running"
            className="w-full max-w-md mx-auto h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The inner (medial) knee zone — often connected to foot mechanics and stride patterns
          </figcaption>
        </figure>

        <h3>Location Overview</h3>
        <p>
          The inner knee (medial side) sits on the inside edge of the knee joint. This zone includes the medial collateral area and the inner portion of the joint line. It's a region that can be influenced by how your foot strikes the ground and how your leg aligns during each stride.
        </p>

        <h3>Common Feelings</h3>
        <ul>
          <li>A dull ache along the inner edge of the knee</li>
          <li>Tenderness when pressing on the inner joint line</li>
          <li>Discomfort that increases during or after runs, especially on uneven terrain</li>
          <li>A feeling of instability or "giving way" on the inner side</li>
          <li>Stiffness in the morning after a run day</li>
        </ul>

        <h3>Typical Running-Related Triggers</h3>
        <ul>
          <li><strong>Overpronation</strong> — feet rolling inward too much puts extra stress on the inner knee</li>
          <li><strong>Worn medial shoe support</strong> — shoes that tilt inward increase inner knee load</li>
          <li><strong>Weak hip stabilizers</strong> — hip weakness can cause the knee to collapse inward during each stride</li>
          <li><strong>Running on cambered roads</strong> — slanted surfaces create uneven stress between inner and outer knee</li>
        </ul>
        <p>
          For a deeper look at how shoes connect to knee discomfort, see our guide on <Link to="/guides/best-running-shoes-knee-pain" className="text-primary underline hover:text-primary/80">running shoes and knee comfort</Link>.
        </p>

        <h3>Everyday Comfort Approaches</h3>
        <ul>
          <li>Gentle warmth along the inner knee after running</li>
          <li>Hip-strengthening exercises (clamshells, side-lying leg raises)</li>
          <li>Consider gait analysis to check for overpronation</li>
          <li>Choose shoes with appropriate medial support for your foot type</li>
          <li>Foam rolling the inner thigh (adductor) muscles</li>
        </ul>

        {/* Mid-article CTA */}
        <PremiumCTA
          headline="Support your knees after every run"
          text="FlexiKnee wraps around the full knee area, delivering soothing warmth, red light, and gentle vibration — designed for runners who want daily comfort support."
        />

        <SectionDivider />

        {/* --- Zone 3: Outer Knee --- */}
        <h2>Outer Knee Tightness During Runs</h2>

        <figure className="my-6">
          <img
            src={diagramOuterKnee}
            alt="Diagram highlighting the outer lateral knee and IT band area in runners"
            className="w-full max-w-md mx-auto h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The outer (lateral) knee zone — often linked to IT band tension and running surface
          </figcaption>
        </figure>

        <h3>Location Overview</h3>
        <p>
          The outer knee (lateral side) includes the area where the IT band (iliotibial band) crosses the knee joint. This thick band of tissue runs from the hip down to the outside of the knee, and it's one of the most commonly discussed areas among distance runners. For more on side-of-knee discomfort, see our <Link to="/guides/side-knee-pain-comfort-guide" className="text-primary underline hover:text-primary/80">side knee comfort guide</Link>.
        </p>

        <h3>What It Feels Like</h3>
        <ul>
          <li>A sharp or burning sensation on the outer side of the knee</li>
          <li>Tightness that builds gradually during a run and eases when you stop</li>
          <li>Discomfort that may start at a specific distance (e.g., after 2–3 miles)</li>
          <li>Tenderness when pressing on the outer knee bone</li>
          <li>A "snapping" sensation as the IT band moves over the knee during bending</li>
        </ul>

        <h3>Common Running Patterns Behind It</h3>
        <ul>
          <li><strong>High weekly mileage without adequate rest</strong> — repetitive friction at the IT band</li>
          <li><strong>Running on banked or sloped surfaces</strong> — creates asymmetric lateral stress</li>
          <li><strong>Tight hip flexors and glutes</strong> — reduced hip mobility transfers tension to the IT band</li>
          <li><strong>Narrow running gait</strong> — feet landing too close together increases crossover stress</li>
          <li><strong>Rapid pace increases</strong> — jumping from easy runs to tempo work too quickly</li>
        </ul>

        <h3>Everyday Comfort Approaches</h3>
        <ul>
          <li>Foam rolling the outer thigh and IT band area (gently, not aggressively)</li>
          <li>Hip and glute strengthening (lateral band walks, single-leg bridges)</li>
          <li>Warming up properly before each run with dynamic movements</li>
          <li>Alternating running surfaces (trail, track, treadmill) to reduce repetitive lateral stress</li>
          <li>Applying gentle warmth to the outer knee after longer runs</li>
        </ul>

        <SectionDivider />

        {/* --- Zone 4: Back of Knee --- */}
        <h2>Back-of-Knee Pressure or Tightness</h2>

        <figure className="my-6">
          <img
            src={diagramBackKnee}
            alt="Diagram highlighting the back posterior knee area affected in runners"
            className="w-full max-w-md mx-auto h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The posterior knee zone — commonly noticed after longer distances or limited flexibility
          </figcaption>
        </figure>

        <h3>Location Overview</h3>
        <p>
          The back of the knee (popliteal area) sits behind the joint, where the hamstrings and calf muscles connect. This area is less commonly discussed than the front or outer knee, but many runners — especially those who run longer distances — report tightness or a feeling of pressure here. For more detail, explore our guide on <Link to="/guides/below-knee-discomfort-teens-adults" className="text-primary underline hover:text-primary/80">below-knee discomfort in active people</Link>.
        </p>

        <h3>Common Feelings</h3>
        <ul>
          <li>A tight, pulling sensation behind the knee, especially when fully extending the leg</li>
          <li>A feeling of fullness or pressure in the back of the knee after longer runs</li>
          <li>Stiffness that is most noticeable after sitting or first thing in the morning</li>
          <li>Discomfort when stretching the hamstrings or calves</li>
        </ul>

        <h3>When Runners Usually Notice It</h3>
        <ul>
          <li><strong>After long runs</strong> — the posterior area accumulates tension over distance</li>
          <li><strong>During hill running</strong> — inclines and declines increase hamstring and calf engagement</li>
          <li><strong>With limited flexibility</strong> — tight hamstrings pull on the back of the knee</li>
          <li><strong>After sitting for long periods post-run</strong> — the muscles tighten up when cooling down in a seated position</li>
        </ul>

        <h3>Everyday Comfort Approaches</h3>
        <ul>
          <li>Gentle hamstring and calf stretches after every run</li>
          <li>Avoiding extended sitting immediately after running — a short cool-down walk helps</li>
          <li>Applying warmth to the back of the knee area in the evening</li>
          <li>Foam rolling the calves and hamstrings to reduce posterior tension</li>
          <li>Gradually increasing distance rather than making large jumps</li>
        </ul>

        <SectionDivider />

        {/* --- Comparison Section --- */}
        <h2>How Runners Compare Their Knee Pain Locations</h2>
        <p>
          Understanding where your discomfort shows up is the first step toward adjusting your habits. Here's a quick comparison of the four main runner's knee pain locations:
        </p>

        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border/40 px-4 py-3 text-left font-semibold">Location</th>
                <th className="border border-border/40 px-4 py-3 text-left font-semibold">Common Sensation</th>
                <th className="border border-border/40 px-4 py-3 text-left font-semibold">Typical Trigger</th>
                <th className="border border-border/40 px-4 py-3 text-left font-semibold">Comfort Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border/40 px-4 py-3 font-medium">Front (Patella)</td>
                <td className="border border-border/40 px-4 py-3">Dull ache, grinding</td>
                <td className="border border-border/40 px-4 py-3">Overstriding, weak quads</td>
                <td className="border border-border/40 px-4 py-3">Quad strengthening, warmth</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border/40 px-4 py-3 font-medium">Inner (Medial)</td>
                <td className="border border-border/40 px-4 py-3">Dull ache, tenderness</td>
                <td className="border border-border/40 px-4 py-3">Overpronation, worn shoes</td>
                <td className="border border-border/40 px-4 py-3">Hip exercises, gait check</td>
              </tr>
              <tr>
                <td className="border border-border/40 px-4 py-3 font-medium">Outer (Lateral)</td>
                <td className="border border-border/40 px-4 py-3">Sharp, burning, snapping</td>
                <td className="border border-border/40 px-4 py-3">IT band tension, high mileage</td>
                <td className="border border-border/40 px-4 py-3">Foam rolling, surface variety</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border border-border/40 px-4 py-3 font-medium">Back (Posterior)</td>
                <td className="border border-border/40 px-4 py-3">Tight, pulling, pressure</td>
                <td className="border border-border/40 px-4 py-3">Long distance, tight hamstrings</td>
                <td className="border border-border/40 px-4 py-3">Hamstring stretches, warmth</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Each location responds to slightly different comfort habits. For a deeper dive into sharp or intermittent sensations, check out our <Link to="/guides/sharp-knee-pain-guide" className="text-primary underline hover:text-primary/80">sharp knee discomfort guide</Link>.
        </p>

        <SectionDivider />

        {/* --- Runner's Quick Checklist --- */}
        <h2>Runner's Quick Checklist</h2>
        <p>
          Use this simple checklist to support your knee comfort before and after every run. Small, consistent habits make the biggest difference over time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          <div className="rounded-xl border border-border/40 p-5 bg-muted/20">
            <h3 className="flex items-center gap-2">🏃 Before Your Run</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>✅ Dynamic warm-up (leg swings, walking lunges) — 5 minutes minimum</li>
              <li>✅ Check your shoes for wear — replace every 400–500 miles</li>
              <li>✅ Apply gentle warmth to stiff areas if needed</li>
              <li>✅ Start with an easy pace for the first 5–10 minutes</li>
              <li>✅ Choose your surface — vary between road, trail, and track</li>
              <li>✅ Hydrate before heading out</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border/40 p-5 bg-muted/20">
            <h3 className="flex items-center gap-2">🧘 After Your Run</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>✅ Cool-down walk for 5 minutes — don't sit immediately</li>
              <li>✅ Gentle static stretches (quads, hamstrings, calves, IT band)</li>
              <li>✅ Apply warmth to any areas that feel stiff or tight</li>
              <li>✅ Foam roll the outer thigh, quads, and calves</li>
              <li>✅ Rehydrate and refuel within 30 minutes</li>
              <li>✅ Note which knee areas felt sensitive — track patterns over time</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border/40 p-5 bg-muted/20">
            <h3 className="flex items-center gap-2">📅 Weekly Maintenance</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>✅ Hip and glute strengthening (clamshells, lateral band walks)</li>
              <li>✅ Quad strengthening (wall sits, step-ups, single-leg squats)</li>
              <li>✅ Deep hamstring and calf flexibility work</li>
              <li>✅ Core stability exercises (planks, dead bugs)</li>
              <li>✅ One rest or cross-training day (swimming, cycling)</li>
              <li>✅ Review your weekly mileage — increase by no more than 10%</li>
            </ul>
          </div>
        </div>


        <h2>Putting It All Together</h2>
        <p>
          Knowing your runner's knee pain location is one of the most practical things you can do to support your daily running comfort. Rather than treating all knee discomfort the same, paying attention to <em>where</em> the sensation shows up helps you focus on the right habits — whether that's strengthening specific muscles, adjusting your form, upgrading your shoes, or simply adding warmth to your post-run routine.
        </p>
        <p>
          The goal isn't to diagnose anything — it's to become more aware of your body's patterns so you can make small, consistent adjustments that support long-term comfort and enjoyment of running.
        </p>

        <p className="text-xs text-muted-foreground mt-8 italic">
          This content is not medical advice. It is based on general information and common patterns runners report. Always consult a healthcare professional for persistent or worsening knee concerns.
        </p>
      </>
    ),
  },
};
