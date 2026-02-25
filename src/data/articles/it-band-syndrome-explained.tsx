import { Link } from "react-router-dom";
import PremiumCTA from "@/components/PremiumCTA";
import heroImage from "@/assets/article-hero-it-band-syndrome.jpg";
import diagramOuterKnee from "@/assets/diagram-it-band-outer-knee.jpg";
import diagramThighTension from "@/assets/diagram-it-band-thigh-tension.jpg";

const SectionDivider = () => (
  <hr className="my-10 border-t border-border/40" />
);

export const itBandSyndromeExplained = {
  article: {
    slug: "it-band-syndrome-explained",
    title: "IT Band Syndrome Explained: Why Side Knee Discomfort Happens and Common Patterns Runners Notice",
    subtitle: "Understanding IT band-related outer knee sensations",
    intro: "Many runners experience a distinct tightness or discomfort along the outer side of the knee, especially during or after longer runs. This guide explains what the IT band is, why this area becomes sensitive, and what patterns people commonly report.",
    metaTitle: "IT Band Syndrome Explained: Side Knee Discomfort & Runner Patterns",
    metaDescription: "Learn why IT band syndrome causes outer knee discomfort, common patterns runners notice, and everyday comfort approaches for side knee sensations.",
    heroImage: heroImage,
    publishedDate: "February 25, 2026",
    nextSlug: "runners-knee-pain-location",
    nextTitle: "Runner's Knee Pain Location: Why It Happens & What People Commonly Feel",
    faqs: [
      { question: "What is the IT band?", answer: "The IT band (iliotibial band) is a thick band of connective tissue that runs along the outside of the thigh, from the hip to just below the knee. It helps stabilize the knee during movement." },
      { question: "Why does the outer knee feel tight during runs?", answer: "Repetitive bending and straightening of the knee during running can cause the IT band to create friction near the outer knee, leading to sensations of tightness or discomfort." },
      { question: "Is IT band discomfort the same as side knee pain?", answer: "IT band discomfort is one common cause of outer knee sensations, but not all side knee discomfort is IT band-related. Other factors like ligament tension or joint mechanics can also contribute." },
      { question: "Can running form influence IT band sensations?", answer: "Yes, factors like stride length, foot strike pattern, running on cambered roads, and hip stability all influence how much stress the IT band experiences during runs." },
    ],
    seoTags: "it band discomfort, outer knee tightness, side knee pain running, running knee discomfort zones, it band awareness, knee discomfort location guide, daily knee comfort habits, it band pressure running, outer knee sensations, knee pain location explained, running form discomfort patterns",
    content: (
      <>
        <p>
          If you've ever felt a persistent tightness or pulling sensation along the outer side of your knee during or after a run, you're experiencing one of the most commonly reported sensations among runners. This type of discomfort is often associated with the <strong>iliotibial band</strong>, a thick band of connective tissue that plays a key role in knee stability.
        </p>
        <p>
          Understanding where this sensation comes from, what it feels like, and which running patterns tend to bring it on can help you make informed adjustments to your daily habits and routines.
        </p>
        <p>
          For a broader overview of running-related knee concerns across all locations, see our <Link to="/guides/running-knee-pain-guide" className="text-primary underline hover:text-primary/80">complete running knee guide</Link>.
        </p>

        <SectionDivider />

        {/* --- Section 1: What Is the IT Band? --- */}
        <h2>What Is the IT Band? (Easy-to-Understand Overview)</h2>

        <h3>Location Overview</h3>
        <p>
          The <strong>iliotibial band</strong> (often called the IT band) is a long, thick strip of connective tissue that runs along the outside of your thigh. It starts at the hip (connecting to muscles like the tensor fasciae latae and gluteus maximus) and extends all the way down to the outer side of the knee, where it attaches just below the joint.
        </p>
        <ul>
          <li>It spans the entire outer thigh, from hip to knee</li>
          <li>It is not a muscle, but a band of fascia (tough connective tissue)</li>
          <li>It helps stabilize the knee during walking, running, and bending movements</li>
          <li>Every time the knee bends and straightens, the IT band slides over the outer knee</li>
        </ul>
        <p>
          Because it crosses the knee joint on the outside, the IT band is particularly sensitive to <strong>repetitive motion</strong>, which is why runners tend to notice sensations in this area more than most people.
        </p>

        <h3>How People Commonly Describe This Discomfort</h3>
        <p>
          People who experience IT band-related sensations describe them in a variety of ways:
        </p>
        <ul>
          <li>A tightness or pulling sensation along the outer knee</li>
          <li>A dull ache on the side of the knee that builds gradually during a run</li>
          <li>A snapping or clicking feeling near the outer knee</li>
          <li>Stiffness along the outer thigh after sitting for extended periods</li>
          <li>Discomfort that appears at a consistent point during longer runs (e.g., always at mile 3)</li>
        </ul>
        <p>
          These sensations are typically not sudden or sharp. Instead, they tend to build up gradually and become more noticeable as the activity continues.
        </p>

        <SectionDivider />

        {/* --- Section 2: Outer Knee Discomfort --- */}
        <h2>Outer Knee Discomfort: The Most Mentioned Sensation</h2>

        <h3>What It Feels Like (Common Experiences)</h3>
        <p>
          The outer knee is by far the most commonly reported area for IT band-related discomfort. Runners frequently describe:
        </p>
        <ul>
          <li>A burning or warm sensation on the outer side of the knee</li>
          <li>Tightness that starts mild and progressively worsens during a run</li>
          <li>Discomfort that intensifies when running downhill or on uneven terrain</li>
          <li>Stiffness that lingers after the run, especially when bending the knee</li>
          <li>A feeling of pressure or friction near the outer knee bone</li>
        </ul>
        <p>
          Many people note that the discomfort is not present at the start of a run but appears after a certain distance or time. This gradual onset is one of the hallmark patterns associated with IT band sensitivity. If you're experiencing <Link to="/guides/sharp-knee-pain-guide" className="text-primary underline hover:text-primary/80">sharp knee sensations</Link> instead, the cause may be different.
        </p>

        <h3>When It Most Often Appears (Activity Patterns)</h3>
        <p>
          IT band-related outer knee discomfort tends to follow predictable patterns:
        </p>
        <ul>
          <li><strong>Longer runs:</strong> Sensations often appear after a certain distance threshold, which varies by person</li>
          <li><strong>Downhill running:</strong> The angle of descent increases stress on the outer knee area</li>
          <li><strong>Cambered roads:</strong> Running on sloped surfaces puts uneven pressure on each leg</li>
          <li><strong>Sudden mileage increases:</strong> Jumping from 10 km to 15 km per week without gradual build-up</li>
          <li><strong>Stride changes:</strong> Overstriding or changing foot strike patterns abruptly</li>
        </ul>

        <figure className="my-8">
          <img
            src={diagramOuterKnee}
            alt="Diagram showing the outer knee area where IT band discomfort is commonly felt"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The outer knee zone where IT band-related sensations are most commonly reported
          </figcaption>
        </figure>

        <SectionDivider />

        {/* --- Section 3: IT Band Tension Along the Thigh --- */}
        <h2>IT Band Tension Along the Thigh</h2>

        <h3>Why People Notice Tightness Above the Knee</h3>
        <p>
          While the outer knee gets the most attention, many runners also report tightness along the outer thigh itself, above the knee joint. This makes sense because the IT band runs the entire length of the outer thigh.
        </p>
        <ul>
          <li><strong>Weak hip muscles:</strong> When the glutes and hip stabilizers aren't strong enough, the IT band compensates by taking on more tension</li>
          <li><strong>Prolonged sitting:</strong> Extended periods in a seated position can contribute to overall tightness along the outer thigh</li>
          <li><strong>Limited flexibility:</strong> Tight hip flexors and restricted hip mobility can increase tension along the IT band's path</li>
          <li><strong>Repetitive motion without variation:</strong> Running the same route, pace, and surface consistently without cross-training</li>
        </ul>
        <p>
          This is why many runners find that their knee and hip discomfort feel connected. For more on this connection, see our guide on <Link to="/guides/knee-discomfort-lower-back-hips" className="text-primary underline hover:text-primary/80">how knee discomfort connects to the lower back and hips</Link>.
        </p>

        <h3>Everyday Approaches That People Try</h3>
        <ul>
          <li>Applying gentle warmth to the outer thigh and knee area after runs</li>
          <li>Foam rolling along the outer thigh (avoiding direct pressure on the knee joint)</li>
          <li>Hip-strengthening exercises like clamshells, lateral band walks, and single-leg bridges</li>
          <li>Stretching the hip flexors and glutes before and after activity</li>
          <li>Gradually increasing mileage (the 10% rule) rather than making sudden jumps</li>
          <li>Varying running surfaces and routes to reduce repetitive strain</li>
        </ul>

        <figure className="my-8">
          <img
            src={diagramThighTension}
            alt="Diagram showing IT band tension path along the outer thigh"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            IT band tension often extends along the outer thigh, not just the knee
          </figcaption>
        </figure>

        <PremiumCTA
          headline="Looking for post-run outer knee comfort support?"
          text="FlexiKnee wraps around the full knee area, delivering soothing warmth, red light, and gentle vibration to the outer knee zone where IT band-related sensations are most common."
        />

        <SectionDivider />

        {/* --- Section 4: IT Band vs Other Side Knee Discomfort --- */}
        <h2>IT Band vs Other Side Knee Discomfort</h2>
        <p>
          Not all outer or side knee discomfort is IT band-related. Here's a simple comparison to help you understand the differences:
        </p>

        <div className="overflow-x-auto my-8">
          <table className="w-full text-sm border border-border/40 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left p-3 font-semibold text-foreground border-b border-border/30">Factor</th>
                <th className="text-left p-3 font-semibold text-foreground border-b border-border/30">IT Band Discomfort</th>
                <th className="text-left p-3 font-semibold text-foreground border-b border-border/30">Other Side Knee Causes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/20">
                <td className="p-3 font-medium text-foreground">Location</td>
                <td className="p-3">Outer knee, sometimes extending up the thigh</td>
                <td className="p-3">Inner knee, joint line, or behind the knee</td>
              </tr>
              <tr className="border-b border-border/20 bg-muted/10">
                <td className="p-3 font-medium text-foreground">Onset</td>
                <td className="p-3">Gradual, builds during activity</td>
                <td className="p-3">Can be sudden or activity-specific</td>
              </tr>
              <tr className="border-b border-border/20">
                <td className="p-3 font-medium text-foreground">Sensation</td>
                <td className="p-3">Tightness, burning, pulling</td>
                <td className="p-3">Sharp, clicking, or pressure</td>
              </tr>
              <tr className="border-b border-border/20 bg-muted/10">
                <td className="p-3 font-medium text-foreground">Common trigger</td>
                <td className="p-3">Repetitive running, especially downhill</td>
                <td className="p-3">Twisting, impact, or sudden movements</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Related area</td>
                <td className="p-3">Hip and outer thigh</td>
                <td className="p-3">Meniscus, ligaments, or joint capsule</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          For a more detailed look at inner vs outer knee sensations, our <Link to="/guides/side-knee-pain-comfort-guide" className="text-primary underline hover:text-primary/80">side knee comfort guide</Link> explores both types in depth.
        </p>

        <SectionDivider />

        {/* --- Section 5: How Runners Reduce Day-to-Day Irritation --- */}
        <h2>How Runners Reduce Day-to-Day Irritation</h2>
        <p>
          Many runners who experience IT band-related sensations find that small, consistent adjustments to their daily habits make the biggest difference over time:
        </p>
        <ul>
          <li><strong>Pre-run warm-up:</strong> Dynamic stretches focusing on hips, glutes, and outer thigh before every run</li>
          <li><strong>Post-run warmth:</strong> Applying gentle warmth to the outer knee and thigh area after activity</li>
          <li><strong>Hip strengthening:</strong> Building glute and hip stabilizer strength to reduce IT band compensation</li>
          <li><strong>Surface variety:</strong> Alternating between flat trails, roads, and tracks to vary the stress patterns</li>
          <li><strong>Shoe assessment:</strong> Ensuring running shoes provide appropriate support and aren't worn out</li>
          <li><strong>Gradual progression:</strong> Following the 10% weekly mileage increase rule</li>
          <li><strong>Cross-training:</strong> Swimming, cycling, or yoga on non-running days to reduce repetitive strain</li>
          <li><strong>Foam rolling routine:</strong> Regular gentle rolling along the outer thigh (not directly on the knee joint)</li>
        </ul>

        <SectionDivider />

        {/* --- Conclusion --- */}
        <h2>Conclusion</h2>
        <p>
          Understanding where your discomfort originates is one of the most useful steps you can take as a runner. IT band-related sensations follow recognizable patterns: they tend to build gradually, focus on the outer knee, and connect to hip and thigh mechanics.
        </p>
        <p>
          By paying attention to when and where the discomfort appears, you can adjust your running habits, strengthen the right muscle groups, and build daily comfort routines that support your outer knee area over the long term.
        </p>
        <p>
          <em>This content is not medical advice. It is based on general research and common experiences people report. If your discomfort is severe or persistent, consider consulting a healthcare professional.</em>
        </p>
      </>
    ),
  },
  cta: "Explore FlexiKnee for IT band and outer knee comfort support →",
};
