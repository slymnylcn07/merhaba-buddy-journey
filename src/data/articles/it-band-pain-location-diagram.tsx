import { Link } from "react-router-dom";
import PremiumCTA from "@/components/PremiumCTA";
import heroImage from "@/assets/article-hero-it-band-diagram.jpg";
import diagramFullPath from "@/assets/diagram-it-band-full-path.jpg";
import diagramKneeZone from "@/assets/diagram-it-band-knee-zone.jpg";
import diagramComparisonZones from "@/assets/diagram-it-band-comparison-zones.jpg";

const SectionDivider = () => (
  <hr className="my-10 border-t border-border/40" />
);

export const itBandPainLocationDiagram = {
  article: {
    slug: "it-band-pain-location-diagram",
    title: "IT Band Pain Location Diagram: A Simple Visual Guide to Outer Knee Discomfort",
    subtitle: "See exactly where IT band discomfort is commonly felt",
    intro: "If you've ever wondered exactly where IT band discomfort shows up, this visual guide is for you. Using simple diagrams, we'll walk through the IT band's path from hip to knee, highlight the most common discomfort zones, and help you distinguish IT band sensations from other types of side knee discomfort. This guide is especially useful for runners and active individuals who want to understand their body better.",
    metaTitle: "IT Band Pain Location Diagram: Visual Guide to Outer Knee Discomfort",
    metaDescription: "Visual guide to IT band pain location with diagrams. See where IT band discomfort is commonly felt, outer knee zones, and how it differs from other side knee sensations.",
    heroImage: heroImage,
    publishedDate: "February 25, 2026",
    nextSlug: "it-band-syndrome-explained",
    nextTitle: "IT Band Syndrome Explained: Why Side Knee Discomfort Happens",
    faqs: [
      { question: "Where exactly is IT band discomfort felt?", answer: "IT band discomfort is most commonly felt along the outer side of the knee, where the band inserts just below the joint. Some people also notice tightness along the outer thigh above the knee." },
      { question: "How can I tell if my outer knee discomfort is IT band-related?", answer: "IT band discomfort typically builds gradually during activity (especially running), focuses on the outer knee, and often connects to tightness along the outer thigh. Sudden or sharp sensations may have a different source." },
      { question: "Does IT band discomfort always mean a serious problem?", answer: "Not necessarily. Many people experience mild IT band tightness that responds well to daily habits like gentle stretching, warmth, and hip strengthening. Persistent or worsening discomfort may benefit from professional guidance." },
    ],
    seoTags: "it band pain location, outer knee discomfort, it band diagram, side knee pain running, lateral knee soreness, runners knee outer pain, knee discomfort guide, it band awareness, lateral thigh tightness, it band visual guide, outer knee zone diagram, running knee discomfort zones, it band knee map",
    content: (
      <>
        <SectionDivider />

        {/* --- SECTION 1: IT Band Path --- */}
        <h2>Where the IT Band Runs</h2>

        <h3>Location Overview</h3>
        <p>
          The <strong>iliotibial band</strong> (IT band) is a long, thick strip of connective tissue that runs along the <strong>outside of your thigh</strong>. It connects at the hip (near the tensor fasciae latae and glute muscles) and extends all the way down to the outer side of the knee, attaching just below the joint line.
        </p>
        <ul>
          <li>It spans the full length of the outer thigh</li>
          <li>It is connective tissue (fascia), not a muscle</li>
          <li>It helps stabilize the knee during walking, running, and bending</li>
          <li>Every stride causes the IT band to slide over the outer knee</li>
        </ul>

        <figure className="my-8">
          <img
            src={diagramFullPath}
            alt="Diagram showing the IT band path running along the outside of the thigh from hip to knee"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The IT band runs along the entire outer thigh, from hip to just below the knee
          </figcaption>
        </figure>

        <p>
          Because this band crosses the knee joint on the outside, it is especially sensitive to <strong>repetitive motion</strong>. That's why runners and cyclists tend to notice sensations in this area more often than others. For a detailed breakdown of why this happens and common runner patterns, see our <Link to="/guides/it-band-syndrome-explained" className="text-primary underline hover:text-primary/80">IT band syndrome guide</Link>. For a broader overview of running-related knee concerns, see our <Link to="/guides/running-knee-pain-guide" className="text-primary underline hover:text-primary/80">running knee guide</Link>.
        </p>

        <SectionDivider />

        {/* --- SECTION 2: Outer Knee Discomfort Zone --- */}
        <h2>Where People Commonly Feel IT Band Discomfort</h2>

        <h3>What It Feels Like</h3>
        <p>
          The outer knee is the most frequently reported area for IT band-related sensations. People commonly describe:
        </p>
        <ul>
          <li>A <strong>burning or warm feeling</strong> on the outer side of the knee</li>
          <li>A <strong>tightness</strong> that starts mild and builds during activity</li>
          <li>A <strong>pulling sensation</strong> that feels like it extends up the outer thigh</li>
          <li>Stiffness in the outer knee area after sitting for a long time</li>
          <li>A <strong>snapping or clicking</strong> feeling near the outer knee bone</li>
        </ul>

        <figure className="my-8">
          <img
            src={diagramKneeZone}
            alt="Diagram highlighting the outer knee zone where IT band discomfort is most commonly felt"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The outer knee zone: the most common area for IT band-related sensations
          </figcaption>
        </figure>

        <h3>When It Usually Shows Up</h3>
        <p>
          IT band discomfort tends to follow predictable activity patterns:
        </p>
        <ul>
          <li><strong>Longer runs:</strong> Sensations often appear after a certain distance, which varies person to person</li>
          <li><strong>Running downhill:</strong> The angle of descent increases stress on the outer knee</li>
          <li><strong>Cambered roads or trails:</strong> Uneven surfaces create asymmetric pressure on each leg</li>
          <li><strong>Sudden mileage increases:</strong> Adding distance too quickly without gradual build-up</li>
          <li><strong>Prolonged sitting:</strong> Extended periods in a seated position can contribute to tightness</li>
        </ul>

        <PremiumCTA
          headline="Looking for daily outer knee comfort support?"
          text="FlexiKnee wraps around the full knee area, delivering soothing warmth, red light, and gentle vibration to the outer knee zone where IT band sensations are most commonly felt."
        />

        <SectionDivider />

        {/* --- SECTION 3: IT Band vs Other Side Knee Discomfort --- */}
        <h2>How It Differs from Other Side Knee Sensations</h2>
        <p>
          Not all outer or side knee discomfort comes from the IT band. The diagram below shows three distinct zones on the outer leg, each associated with different types of sensations:
        </p>

        <figure className="my-8">
          <img
            src={diagramComparisonZones}
            alt="Comparison diagram showing three outer knee discomfort zones: above-knee, at-knee, and below-knee"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Three common outer knee discomfort zones: above-knee (thigh), at-knee (lateral), and below-knee
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="rounded-xl border border-border/40 p-5 bg-muted/20">
            <h3 className="flex items-center gap-2 text-base">🟢 Above-Knee (Outer Thigh)</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Tightness along the outer thigh</li>
              <li>Often connected to hip weakness</li>
              <li>Responds well to foam rolling and hip strengthening</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border/40 p-5 bg-muted/20">
            <h3 className="flex items-center gap-2 text-base">🔵 At-Knee (Lateral Knee)</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Burning or aching on the outer knee</li>
              <li>Most common IT band discomfort zone</li>
              <li>Builds during running, especially downhill</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border/40 p-5 bg-muted/20">
            <h3 className="flex items-center gap-2 text-base">🟣 Below-Knee (Outer Shin)</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Less commonly IT band-related</li>
              <li>May involve lateral ligament or joint line</li>
              <li>Often has different triggers than IT band</li>
            </ul>
          </div>
        </div>

        <p>
          Understanding which zone your discomfort falls into can help you adjust your daily habits more effectively. For a deeper comparison of inner vs outer knee sensations, see our <Link to="/guides/side-knee-pain-comfort-guide" className="text-primary underline hover:text-primary/80">side knee comfort guide</Link>. If your discomfort is specifically related to running patterns, our <Link to="/guides/it-band-syndrome-explained" className="text-primary underline hover:text-primary/80">IT band syndrome guide</Link> provides a more detailed breakdown.
        </p>

        <SectionDivider />

        {/* --- Conclusion --- */}
        <h2>Conclusion</h2>
        <p>
          Knowing <strong>where</strong> your discomfort shows up is one of the most helpful steps you can take. IT band sensations follow recognizable patterns: they build gradually, concentrate on the outer knee, and often connect to the outer thigh and hip area. By identifying the specific zone, you can make smarter adjustments to your running habits, daily routines, and comfort strategies.
        </p>
        <p>
          <em>This content is not medical advice. It is based on general research and common experiences people report. If your discomfort is severe or persistent, consider consulting a healthcare professional.</em>
        </p>
      </>
    ),
  },
  cta: "Explore FlexiKnee for outer knee and IT band comfort support →",
};
