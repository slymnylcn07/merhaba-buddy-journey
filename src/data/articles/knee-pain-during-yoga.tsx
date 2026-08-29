import { Link } from "react-router-dom";
import { InfoBox } from "@/components/ArticleCharts";
import type { ArticleExport } from "./types";

import heroImage from "@/assets/article-hero-knee-pain-yoga.jpg";
import imgLotusPressure from "@/assets/article-yoga-knee-lotus-pressure.jpg";
import imgAlignment from "@/assets/article-yoga-knee-alignment.jpg";
import imgHipKnee from "@/assets/article-yoga-hip-knee-connection.jpg";
import imgPigeonStress from "@/assets/article-yoga-pigeon-knee-stress.jpg";
import imgCorrectIncorrect from "@/assets/article-yoga-correct-incorrect-knee.jpg";
import imgLotusPose from "@/assets/article-yoga-lotus-pose.jpg";
import imgHeroPose from "@/assets/article-yoga-hero-pose.jpg";
import imgChildPose from "@/assets/article-yoga-child-pose.jpg";

const faqs = [
  { question: "Why does my knee hurt during yoga?", answer: "Yoga can combine deep knee bending, kneeling pressure, standing load, and hip rotation. When a pose depends on motion that the hip or ankle cannot provide comfortably, the knee may become the point where pressure or twisting is felt. Pain is a reason to come out of the pose and modify it, not proof that more stretching is needed." },
  { question: "Why does lotus pose hurt my knees?", answer: "Lotus requires substantial hip external rotation before the foot is placed on the opposite thigh. Pulling the foot into position when the hip is not ready can transfer rotation to the knee. Support a simpler cross-legged position and never use the arm to force the knee downward." },
  { question: "How can I modify child's pose for knee pain?", answer: "Place a folded blanket or bolster between the calves and thighs to reduce deep flexion, widen the knees if comfortable, or use a higher supported rest position. Leave the pose if pressure, pinching, or back-of-knee pain persists." },
  { question: "How can I modify pigeon pose for knee pain?", answer: "Keep the front heel closer to the pelvis, support the hip with a block or blanket, or use a reclined figure-four variation. The front knee should not be forced toward a right angle when hip rotation is limited." },
  { question: "Can yoga help knee pain?", answer: "Yoga may help some people with knee osteoarthritis, but reviews rate much of the evidence as low or very low certainty and programs differ. A modified practice may improve movement, strength, balance, or confidence. It is not appropriate for every acute injury or swollen knee." },
  { question: "Why does the back of my knee hurt in yoga?", answer: "Straight-leg poses can tension the hamstring and calf, while deep flexion can compress the back of the joint. Pain, swelling, a lump, or blocked motion needs a different assessment from ordinary muscle stretch." },
  { question: "Should my knee move past my toes in yoga?", answer: "Knee position cannot be judged by one visual rule. The pose, load, heel contact, anatomy, symptoms, and control matter. Use a pain-free range and avoid twisting or collapse rather than forcing every knee into the same alignment cue." },
];

const kneePainDuringYoga: ArticleExport = {
  cta: "yoga-knee-support",
  article: {
    slug: "knee-pain-during-yoga",
    title: "Knee Pain During Yoga: Lotus, Pigeon & Child's Pose",
    subtitle: "Use pose-specific supports for rotation, kneeling, deep flexion, and back-of-knee symptoms",
    intro: "Knee pain during yoga is most useful when described by pose. Lotus and pigeon ask for hip rotation, child's pose and hero pose use deep knee flexion, kneeling places direct pressure at the front, and standing poses add load. This guide shows how to modify each demand without forcing range, and it keeps general yoga-for-osteoarthritis research separate from an acute painful pose.",
    metaTitle: "Knee Pain During Yoga: Lotus, Pigeon & Child's Pose",
    metaDescription: "Modify lotus, pigeon, child's pose, hero pose, kneeling and standing yoga for knee pain. Learn back-of-knee clues, props and warning signs.",
    heroImage,
    publishedDate: "March 7, 2026",
    lastUpdated: "August 29, 2026",
    nextSlug: "knee-pain-when-kneeling",
    nextTitle: "Knee Pain When Kneeling",
    faqs,
    seoTags: "knee pain during yoga,knee pain yoga,lotus pose knee pain,pigeon pose knee pain,child's pose knee pain,hero pose knee pain,kneeling yoga knee pain,back of knee pain yoga,yoga for knee pain relief,yoga knee modifications,yoga blocks knee support,knee pain after yoga",
    sources: [
      { title: "Effectiveness of yoga for knee osteoarthritis: systematic review and meta-analysis", publisher: "Clinical Rehabilitation", url: "https://pubmed.ncbi.nlm.nih.gov/41761497/" },
      { title: "Yoga for knee osteoarthritis: a systematic review and meta-analysis", publisher: "BMC Complementary Medicine and Therapies", url: "https://pubmed.ncbi.nlm.nih.gov/38753745/" },
      { title: "Knee pain", publisher: "NHS", url: "https://www.nhs.uk/symptoms/knee-pain/" },
      { title: "Knee Conditioning Program", publisher: "OrthoInfo, American Academy of Orthopaedic Surgeons", url: "https://orthoinfo.aaos.org/en/recovery/knee-conditioning-program/" },
    ],
    content: (
      <>
        <InfoBox title="Quick Answer"><p><strong>Knee pain during yoga means the pose, range, support, or load needs to change.</strong> Do not force lotus or pigeon by pulling the foot or pressing the knee. Reduce deep flexion in child's pose or hero pose with a bolster, cushion kneeling pressure, and use a comfortable range in standing poses. Stop for sharp pain, swelling, locking, giving way, numbness, or loss of motion.</p></InfoBox>

        <p>This page owns pain caused by a yoga pose. Use <Link to="/guides/knee-pain-when-kneeling">knee pain when kneeling</Link> when floor pressure is the main problem across daily activities, <Link to="/guides/knee-pain-when-squatting">knee pain when squatting</Link> for loaded squat mechanics, and <Link to="/guides/back-of-knee-pain-explained">back-of-knee pain</Link> when posterior symptoms occur outside yoga too.</p>

        <h2>Match the Pain to the Yoga Pose</h2>
        <div className="my-6 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-4">Pose or family</th><th className="p-4">Main knee demand</th><th className="p-4">Lower-demand option</th></tr></thead><tbody className="divide-y divide-slate-200"><tr><td className="p-4 font-semibold">Lotus or cross-legged seat</td><td className="p-4">Hip rotation with the knee bent</td><td className="p-4">Easy pose, legs farther forward, hips raised on blankets</td></tr><tr><td className="p-4 font-semibold">Pigeon</td><td className="p-4">Front-hip rotation with a bent knee</td><td className="p-4">Heel closer to pelvis, hip support, reclined figure four</td></tr><tr><td className="p-4 font-semibold">Child's pose or hero pose</td><td className="p-4">Deep knee flexion and possible front-knee pressure</td><td className="p-4">Bolster between thigh and calf, higher seat, shorter hold</td></tr><tr><td className="p-4 font-semibold">Tabletop or low lunge</td><td className="p-4">Direct kneeling pressure</td><td className="p-4">Folded mat, blanket, blocks, or standing variation</td></tr><tr><td className="p-4 font-semibold">Warrior, chair, or squat poses</td><td className="p-4">Weight-bearing knee bend and balance</td><td className="p-4">Shorter stance, smaller bend, wall or chair support</td></tr></tbody></table></div>

        <h2>Why Hip Motion Matters to the Knee</h2>
        <p>The hip can rotate through a much larger range than the knee. In lotus and pigeon, the visible foot position is produced primarily by hip rotation. When the hip reaches its comfortable limit, pulling the foot farther or pressing the thigh down can transfer torque toward the knee. The solution is not to make the knee “more flexible.” It is to reduce the pose and develop hip mobility and control gradually.</p>
        <figure className="my-8"><img src={imgHipKnee} alt="Yoga practitioner using hip rotation without forcing the bent knee" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">Let the hip determine the range instead of using the knee as a lever.</figcaption></figure>

        <h2>Lotus Pose Knee Pain</h2>
        <p>Lotus is an advanced hip-rotation position, not a required milestone. Pain at the inner knee, joint line, or around the kneecap is a reason to release the pose. Never pull the foot onto the opposite thigh while the knee is unsupported, and never press the knee toward the floor.</p>
        <ul><li>Sit higher on folded blankets so the pelvis can tilt comfortably.</li><li>Use an easy cross-legged seat with the feet in front rather than stacked.</li><li>Support the outer thighs or knees with blocks or cushions.</li><li>Choose half lotus only if it is genuinely pain-free and the hip supplies the motion.</li></ul>
        <figure className="my-8"><img src={imgLotusPose} alt="Supported cross-legged alternative to full lotus pose" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">A simpler seat can provide the breathing or meditation goal without forcing the knee.</figcaption></figure>
        <figure className="my-8"><img src={imgLotusPressure} alt="Illustration of rotational pressure at the knee when lotus is forced" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">The knee should not be used to create hip rotation.</figcaption></figure>

        <h2>Pigeon Pose Knee Pain</h2>
        <p>A common cue to make the front shin parallel with the short edge of the mat is not suitable for every hip. Bringing the heel closer to the pelvis reduces the rotational demand. Supporting the front-side hip can also prevent the body from hanging into the knee. A reclined figure-four pose often trains a similar hip position with less body weight on the front leg.</p>
        <figure className="my-8"><img src={imgPigeonStress} alt="Pigeon pose showing support under the hip and a less demanding front-knee angle" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">Use props to support the pelvis and let the front shin choose a comfortable angle.</figcaption></figure>

        <h2>Child's Pose and Hero Pose Knee Pain</h2>
        <p>Child's pose and hero pose place the knee in deep flexion. A folded blanket or bolster between the calves and thighs limits how far the knee closes. Sitting on a block or bolster raises the hips in hero pose. If the knee feels pinched, full, or painful behind the joint, reduce the bend rather than waiting for the sensation to stretch away.</p>
        <figure className="my-8"><img src={imgChildPose} alt="Child's pose modified with support between thighs and calves" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">A bolster can preserve the resting quality of the pose while reducing deep flexion.</figcaption></figure>
        <figure className="my-8"><img src={imgHeroPose} alt="Hero pose modified with a raised supported seat" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">Raise the seat until both knees and ankles remain comfortable.</figcaption></figure>

        <h2>Kneeling and Standing-Pose Modifications</h2>
        <p>For tabletop, low lunge, or gate pose, fold the mat or add a blanket under the kneecap and upper shin. Padding changes surface pressure but does not solve deep joint pain. In standing poses, use a shorter stance, smaller bend, wall or chair support, and a foot position that allows the knee to track comfortably.</p>
        <p>A rigid “never let the knee pass the toes” rule is not necessary. The whole movement, symptoms, balance, load, and anatomy matter. The more useful cue is to avoid a painful range or a twisting collapse that cannot be controlled.</p>
        <figure className="my-8"><img src={imgAlignment} alt="Supported standing yoga pose with comfortable knee and foot alignment" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">Use support so alignment can be controlled without chasing pose depth.</figcaption></figure>
        <figure className="my-8"><img src={imgCorrectIncorrect} alt="Comparison of a supported yoga knee position and a forced painful position" className="w-full rounded-xl" loading="lazy" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">The correct version is the one that meets the pose goal without pain or forced rotation.</figcaption></figure>

        <h2>Back-of-Knee Pain During Yoga</h2>
        <p>Google Trends shows growing interest in back-of-knee pain alongside yoga searches. In a straight-leg forward fold, the sensation may come from the hamstring or calf, but sharp pain, nerve-like symptoms, or a blocked knee should not be treated as a deeper-stretch problem. In child's pose or another deep bend, a cyst or joint fullness may be compressed. A visible lump, calf swelling, or persistent loss of motion deserves assessment.</p>

        <h2>Knee Pain After Yoga vs During a Pose</h2>
        <p>Pain during one pose provides a specific range, pressure, or alignment clue. Pain that appears later may reflect total time, repeated kneeling, an unfamiliar sequence, or a session that exceeded current capacity. Record the exact poses and the following-morning response. Reduce one variable in the next session rather than changing the entire practice.</p>

        <h2>Can Yoga Help Knee Pain Relief?</h2>
        <p>Recent systematic reviews suggest yoga may improve pain or function for some people with knee osteoarthritis, but certainty is often low or very low and programs vary substantially. That supports yoga as a possible modified movement option, not as a cure or a reason to practice through an acute injury. A clinician or experienced instructor can help adapt load, balance, and floor transitions.</p>

        <h2>When to Stop and Get Medical Help</h2>
        <p>Stop the pose for sharp or increasing pain, a pop, swelling, locking, giving way, numbness, weakness, or loss of normal motion. Seek urgent help for inability to bear weight, a deformed knee, a hot red swollen joint with fever, or new calf swelling with chest pain or breathlessness. Persistent pain despite removing the provoking pose deserves assessment.</p>

        <h2>The Bottom Line</h2>
        <p>Yoga knee pain is best solved pose by pose. Lotus and pigeon require hip rotation, child's pose and hero pose use deep flexion, kneeling adds surface pressure, and standing poses add load. Props are tools for changing demand, not signs of failure. Keep the range pain-free, never use the knee as a lever, and treat swelling, locking, or posterior warning signs as more than a flexibility issue.</p>
      </>
    ),
  },
};

export { kneePainDuringYoga };
