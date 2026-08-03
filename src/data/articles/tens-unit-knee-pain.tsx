import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3-51-55/tens-unit-knee-pain.webp";
import padPlacementAvif from "@/assets/article-photos/wave-3-51-55/tens-four-pad-placement.avif";
import padPlacementWebp from "@/assets/article-photos/wave-3-51-55/tens-four-pad-placement.webp";
import safeSettingsAvif from "@/assets/article-photos/wave-3-51-55/tens-safe-settings.avif";
import safeSettingsWebp from "@/assets/article-photos/wave-3-51-55/tens-safe-settings.webp";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const tensUnitKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "tens-unit-knee-pain",
    title: "TENS Unit for Knee Pain: Pad Placement, Settings, Safety, and Evidence",
    subtitle:
      "How electrical nerve stimulation differs from muscle stimulation, what studies and guidelines say, and how to avoid treating one pad diagram as a prescription",
    intro:
      "A TENS unit can make a painful knee feel different within minutes, which is exactly why expectations need to stay grounded. The tingling may temporarily turn down pain for some people. It does not show that cartilage has regenerated, inflammation has disappeared, or the joint is ready for extra load. Evidence for knee pain is mixed, and major osteoarthritis guidelines do not recommend routine TENS. If it is still being considered as an individual comfort tool, safe placement, device-specific instructions, and an honest response test matter more than finding a supposed perfect setting online.",
    quickAnswer:
      "TENS sends mild electrical pulses through skin electrodes to alter pain signals. Some people report short-term relief, but large trials and current knee osteoarthritis guidelines do not show enough consistent benefit for routine use. Pad placement is not universal: an example may place two or four pads around the painful knee while avoiding the kneecap and broken or numb skin, but the device manual or clinician should decide the layout. Start with the unit off, raise a conventional TENS setting to a strong but comfortable tingling, and reduce or stop if it becomes painful, causes a strong muscle contraction, or irritates the skin.",
    metaTitle: "TENS Unit for Knee Pain: Pads, Settings and Evidence",
    metaDescription:
      "Learn how a TENS unit for knee pain works, example pad placement, safe settings, contraindications and what osteoarthritis evidence really shows.",
    heroImage,
    publishedDate: "August 3, 2026",
    lastUpdated: "August 3, 2026",
    nextSlug: "cold-therapy-machine-knee",
    nextTitle: "Cold Therapy Machine for the Knee",
    seoTags:
      "tens unit for knee pain, tens for knee pain, tens unit knee, where to place tens pads for knee pain, tens pad placement knee, tens machine for knee pain, how to use tens unit for knee pain, tens settings for knee pain, tens unit for arthritis knee, electrical stimulation knee pain, four pad tens placement knee, two pad tens placement knee, tens vs ems knee, is tens safe for knees",
    faqs: [
      {
        question: "Does a TENS unit help knee pain?",
        answer:
          "It may provide temporary relief for some people, but results are inconsistent. A large sham-controlled osteoarthritis trial found no meaningful advantage, and NICE plus the American College of Rheumatology advise against routine TENS for knee osteoarthritis. Smaller studies have reported immediate benefits in selected outcomes. Treat it as an optional symptom-modulation trial, not a repair treatment or replacement for diagnosis and exercise."
      },
      {
        question: "Where should TENS pads go for knee pain?",
        answer:
          "There is no universal knee placement. A common example places two pads on opposite sides of the painful area or four pads around it, with a gap between pads and the kneecap left uncovered. That is an illustration, not a prescription. Follow the exact device manual or a clinician because channel pairing, pain location, skin condition, surgery history, and device design can change the layout."
      },
      {
        question: "What TENS setting should I use for knee pain?",
        answer:
          "For conventional sensory TENS, intensity is commonly raised to a strong but comfortable tingling without pain or a strong visible contraction. There is no single frequency, pulse width, or session length proven best for every knee and device. Begin only after reading the manual, keep the unit off while moving pads, and use clinician instructions when they differ from general information."
      },
      {
        question: "Is TENS the same as EMS or NMES?",
        answer:
          "No. TENS is mainly intended to modulate pain through sensory stimulation. EMS or NMES is designed to produce a muscle contraction and may be used in supervised rehabilitation for a different goal. Combination devices can include both modes, so the word electrical on the package is not enough. Confirm the selected program before increasing intensity."
      },
      {
        question: "Can I use a TENS unit for knee arthritis?",
        answer:
          "Do not assume that a consumer device is a guideline-supported arthritis treatment. NICE says not to offer TENS for osteoarthritis because evidence of benefit is insufficient, and the American College of Rheumatology strongly recommends against it for knee and hip osteoarthritis. A clinician who knows your history can help decide whether a short individual comfort trial is reasonable despite that uncertainty."
      },
      {
        question: "Who should not use a TENS unit?",
        answer:
          "Seek medical guidance before use with a pacemaker, defibrillator, implanted neurostimulator or other electronic implant, epilepsy, pregnancy, reduced sensation, circulation concerns, or a recent operation. Do not place pads over broken, infected, irritated, or numb skin, on the front or side of the neck, across the chest, or on the head. Never use TENS in water, while asleep, driving, or operating machinery."
      }
    ],
    sources: [
      {
        title: "Transcutaneous Electrical Nerve Stimulation (TENS)",
        publisher: "NHS",
        url: "https://www.nhs.uk/tests-and-treatments/transcutaneous-electrical-nerve-stimulation-tens/"
      },
      {
        title: "Osteoarthritis in Over 16s: Diagnosis and Management",
        publisher: "NICE via NCBI Bookshelf",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK588843/"
      },
      {
        title: "2019 American College of Rheumatology and Arthritis Foundation Guideline for Osteoarthritis Management",
        publisher: "Arthritis Care and Research via PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11488261/"
      },
      {
        title: "Effect of Transcutaneous Electrical Nerve Stimulation (TENS) on Knee Pain and Physical Function in Patients With Symptomatic Knee Osteoarthritis: The ETRELKA Randomized Clinical Trial",
        publisher: "Osteoarthritis and Cartilage via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/34826572/"
      },
      {
        title: "Effects of TENS on Pain, Pain Sensitivity and Function in People With Knee Osteoarthritis",
        publisher: "Physical Therapy via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/22466027/"
      },
      {
        title: "Immediate Effects of Transcutaneous Electrical Nerve Stimulation on Pain and Physical Performance in Individuals With Preradiographic Knee Osteoarthritis: A Randomized Controlled Trial",
        publisher: "Archives of Physical Medicine and Rehabilitation via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/30315763/"
      },
      {
        title: "Electrical Stimulation Therapies for Active Duty Military With Patellofemoral Pain Syndrome: A Randomized Trial",
        publisher: "Military Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/32248227/"
      },
      {
        title: "Electrode Placement Affects Clinical Outcome in Transcutaneous Electrical Nerve Stimulation for Knee Osteoarthritis: A Combined Cadaver Study and Randomized Controlled Trial",
        publisher: "Pain and Therapy via PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12279651/"
      }
    ],
    content: (
      <>
        <p>
          A four-pad diagram around the kneecap can make TENS look like a simple map problem. Yet <strong>where to place TENS pads for knee pain</strong> is only one part of the decision. A technically neat square cannot tell you why the knee hurts, whether electrical stimulation is appropriate, or whether the selected program is actually TENS. Contraindications, skin sensation, device instructions, treatment goals, and evidence matter too.
        </p>
        <p>
          This article covers consumer TENS for temporary pain modulation. It is not a rehabilitation prescription and does not clear a painful or swollen knee for activity. If the knee repeatedly reacts after training, use the <Link to="/guides/knee-pain-after-exercise" className={linkClass}>knee pain after exercise guide</Link> to examine load and recovery rather than turning the current higher.
        </p>

        <h2>What Is a TENS Unit?</h2>
        <p>
          TENS stands for transcutaneous electrical nerve stimulation. A small battery-powered unit sends pulses through lead wires or a wireless module to adhesive electrodes on the skin. The user normally feels tingling beneath and between the pads. The intended goal is to alter pain processing temporarily, not to heat the joint, massage tissue, or force a strengthening contraction.
        </p>
        <p>
          Proposed mechanisms include changing the transmission of pain-related signals in the nervous system and engaging the body's own pain-modulating pathways. These explanations are plausible, but they do not mean the device treats the underlying condition. Less pain while the unit is running may be useful. It does not demonstrate that cartilage, tendon, meniscus, or ligament tissue has healed.
        </p>
        <p>
          TENS is also different from the warming, vibration, and red-light features found in some knee devices. The <Link to="/guides/do-knee-massagers-work" className={linkClass}>guide to whether knee massagers work</Link> separates those comfort features. For light-based products, the <Link to="/guides/red-light-therapy-for-knees" className={linkClass}>red light therapy evidence guide</Link> addresses a different mechanism and evidence base.
        </p>

        <h2>TENS vs EMS or NMES</h2>
        <p>
          Packaging can blur these modes. Conventional TENS targets a strong but comfortable sensory feeling and usually should not produce a forceful muscle contraction. Electrical muscle stimulation, often labeled EMS or NMES, is intended to activate muscle. Clinicians may use NMES after certain operations or when quadriceps activation is limited, but that is a different goal, dose, and safety decision.
        </p>
        <p>
          Combination units may store TENS, massage-like, and muscle programs beside one another. Check the screen and manual before increasing intensity. A program that makes the thigh jump is not simply a more powerful version of sensory TENS. If muscle activation is the rehabilitation goal, it should be prescribed and progressed as such rather than improvised from a pain-relief diagram.
        </p>

        <h2>Does TENS Help Knee Pain?</h2>
        <p>
          The most accurate answer is that some individuals feel temporary relief, while research does not support routine use for knee osteoarthritis. The NHS describes TENS as a method that may provide temporary pain relief and emphasizes that it does not work for everyone. That wording fits the uncertainty better than claims that electrical pulses repair a knee.
        </p>
        <p>
          The ETRELKA trial enrolled 220 people with knee osteoarthritis and compared active TENS with a sham device for one month. Active treatment did not produce a clinically relevant improvement over sham in pain or function. This matters because a believable sham helps separate the specific electrical effect from attention, expectation, device ritual, and natural symptom variation.
        </p>
        <p>
          Current guidelines reflect that evidence. NICE advises not offering TENS for osteoarthritis because there is insufficient evidence of benefit. The American College of Rheumatology and Arthritis Foundation guideline strongly recommends against TENS for knee and hip osteoarthritis. Those are recommendations about routine clinical use, not proof that no individual ever feels better, but they should prevent a consumer device from being presented as established arthritis care.
        </p>
        <p>
          Smaller studies have found immediate changes in pain, timed walking, or pressure sensitivity in some participants. Other work has examined electrical stimulation in patellofemoral pain or compared electrode locations. A 2025 placement trial reported promising short-term differences among layouts, but it was a single-center study with brief follow-up and retrospective trial registration. It can inform future research without creating one universal pad map or overturning larger evidence and guidelines.
        </p>
        <p>
          The mixed record supports an individual response test with modest expectations. If a clinician considers TENS reasonable, define the goal before starting. A useful outcome could be enough temporary comfort to complete a normal walk or prescribed exercise with better control. Claims about dissolving inflammation, rebuilding cartilage, increasing circulation everywhere, or curing arthritis go beyond the evidence.
        </p>

        <h2>Example TENS Pad Placement Around the Knee</h2>
        <figure className="my-8">
          <picture>
            <source srcSet={padPlacementAvif} type="image/avif" />
            <img
              src={padPlacementWebp}
              alt="Four separated TENS electrode pads positioned around a seated person's knee with the kneecap left uncovered and the controller beside the leg"
              loading="lazy"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
            />
          </picture>
          <figcaption>
            This four-pad photo is an example, not a universal prescription. Keep electrodes separated and pair channels exactly as the device manual shows.
          </figcaption>
        </figure>
        <p>
          A two-pad example may place electrodes on opposite sides of the painful region while keeping them on intact, normally sensitive skin. A four-pad example may surround the knee with superomedial, superolateral, inferomedial, and inferolateral positions. On a two-channel unit, each pair must connect according to the manual, such as A1 with A2 and B1 with B2. The wires should have slack and should not cross the chest.
        </p>
        <p>
          That diagram is not a command to place pads in those exact spots. The painful structure, incision location, altered sensation, swelling, body shape, electrode size, and device channel design may call for a different setup or no TENS at all. Do not place electrodes directly over broken or inflamed skin, an unhealed incision, or an area you cannot feel normally. Keep pads from touching or overlapping because current density can become uncomfortable at the edges.
        </p>
        <p>
          Leave the kneecap itself uncovered unless a qualified professional and the device instructions specify otherwise. Avoid the back crease if movement causes pads to fold or lift. Never create a path across the chest, place electrodes on the front or side of the neck, or use them on the eyes, mouth, or head. The unit should be off while pads are applied, removed, or moved.
        </p>

        <h2>How to Use a TENS Unit for Knee Pain Safely</h2>
        <ol className="my-6 list-decimal space-y-3 pl-6">
          <li><strong>Check that TENS is appropriate.</strong> Review contraindications, the cause of new pain, recent procedures, and the exact device with a clinician when uncertain.</li>
          <li><strong>Read the complete manual.</strong> Confirm the selected mode, channel pairing, compatible electrodes, cleaning instructions, and warnings for that model.</li>
          <li><strong>Inspect and clean the skin.</strong> Use intact, normally sensitive skin that is dry and free from lotion. Replace damaged, dirty, or dried-out pads as directed.</li>
          <li><strong>Connect with the power off.</strong> Attach leads and place separated pads before turning the unit on. Keep cables away from trip and strangulation hazards.</li>
          <li><strong>Raise intensity gradually.</strong> For sensory TENS, seek a strong but comfortable tingling, not pain, burning, or a forceful muscle contraction.</li>
          <li><strong>Test a normal task.</strong> Compare the same gentle activity before, during, and after rather than escalating exercise because sensation is masked.</li>
          <li><strong>Turn it off before removal.</strong> Lower intensity, switch off, then peel pads gently and inspect the skin.</li>
        </ol>
        <p>
          Do not use TENS in a bath, shower, pool, or other wet setting. Do not sleep with it running or use it while driving, cycling in traffic, cooking over heat, or operating machinery. Pain modulation can distract from hazards, wires can catch, and sleeping prevents reliable skin and intensity checks.
        </p>

        <h2>What Setting Should You Use?</h2>
        <figure className="my-8">
          <picture>
            <source srcSet={safeSettingsAvif} type="image/avif" />
            <img
              src={safeSettingsWebp}
              alt="Seated woman adjusting a handheld TENS controller connected to two electrode pads placed above and below the side of her knee"
              loading="lazy"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
            />
          </picture>
          <figcaption>
            Adjust intensity gradually while seated and able to monitor the skin and sensation. Settings should follow the device manual and individual guidance.
          </figcaption>
        </figure>
        <p>
          Online protocols often advertise one frequency, pulse width, or duration as the best TENS setting for knee pain. Research uses many combinations, and consumer devices label modes differently. A number copied from one study may not correspond to the same waveform or output on another unit. The manual and clinician plan take priority.
        </p>
        <p>
          With conventional TENS, intensity is often more practical to judge by sensation than by a screen number. Increase slowly until the tingling is clear and strong but comfortable. If it fades because the nervous system adapts, the manual may permit a small increase while maintaining comfort. Reduce or stop for sharpness, burning, dizziness, nausea, distress, a strong visible contraction, or increasing pain.
        </p>
        <p>
          There is also no universal session length. A shorter supervised trial can establish whether the sensation is tolerable and whether the task changes. Longer use increases the importance of skin checks and device-specific limits. More current or more minutes do not turn a non-responder into a responder, and neither variable proves a stronger therapeutic effect.
        </p>

        <h2>Who Needs Medical Guidance Before TENS?</h2>
        <p>
          Ask a doctor or the relevant device specialist before use with a pacemaker, implantable cardioverter-defibrillator, implanted neurostimulator, or another electronic implant. Electrical interference risks depend on the implant, stimulation site, and device. Do not rely on placing pads farther from the chest as a self-designed workaround.
        </p>
        <p>
          People with epilepsy should seek guidance, and electrodes should not be used on the head or neck. During pregnancy, ask the doctor or midwife rather than applying pads around the trunk or pelvis from a generic diagram. Reduced sensation, neuropathy, poor circulation, fragile skin, active cancer near the intended site, and recent surgery also require individualized advice.
        </p>
        <p>
          New unexplained knee pain deserves a diagnosis before repeated masking. A rapidly swollen knee, inability to bear weight, locking, repeated giving way, or pain after significant trauma is not a consumer-electronics problem. For a familiar arthritis diagnosis, the <Link to="/guides/knee-arthritis-pain-guide" className={linkClass}>knee arthritis pain guide</Link> puts exercise, load, symptom patterns, and assessment in context.
        </p>

        <h2>How to Judge Whether TENS Is Worth Continuing</h2>
        <p>
          Define one modest goal and one comparison. For example, rate comfort during a ten-minute usual walk or during a prescribed set of sit-to-stands. Keep footwear, route, repetitions, and other treatments similar. Compare active use with an ordinary day, but remember that expectation and day-to-day variation can influence the result.
        </p>
        <p>
          A worthwhile response should be noticeable, repeatable, and useful without causing skin problems or encouraging excessive activity. If relief lasts only during stimulation, that may still have a practical role, but describe it honestly. If several careful trials produce no meaningful change, increasing current indefinitely is unlikely to be a sensible plan.
        </p>
        <p>
          Temporary pain relief should support, not replace, a capacity-building approach. The <Link to="/guides/knee-pain-exercises-guide" className={linkClass}>knee pain exercise guide</Link> explains how to choose a manageable starting level. If TENS makes a planned exercise more comfortable, keep the original dose until the next-day response is known.
        </p>

        <h2>Common TENS Mistakes</h2>
        <ul>
          <li><strong>Buying a unit as a cure.</strong> TENS may alter pain temporarily but does not regenerate cartilage or repair a torn structure.</li>
          <li><strong>Copying one pad map for every knee.</strong> Layout depends on the device, symptom location, skin, sensation, history, and clinician guidance.</li>
          <li><strong>Confusing TENS with EMS.</strong> A strong muscle contraction may mean the wrong mode or an unsuitable intensity for a sensory goal.</li>
          <li><strong>Turning intensity up through discomfort.</strong> Painful stimulation and skin burning are warning signs, not evidence that treatment is working harder.</li>
          <li><strong>Using dry or overlapping pads.</strong> Poor contact can concentrate the sensation and irritate skin.</li>
          <li><strong>Masking a training flare.</strong> Less pain during stimulation does not erase swelling, fatigue, or the need to recover from the session.</li>
          <li><strong>Using it unattended.</strong> Water, sleep, driving, and machinery create avoidable safety risks.</li>
        </ul>

        <h2>TENS Compared With Other Comfort Options</h2>
        <p>
          TENS is not automatically better because it feels more technical. Heat may suit a familiar stiffness pattern, while cold may be chosen for short-term comfort after a clinician-approved situation. The <Link to="/guides/heat-vs-ice-for-knees" className={linkClass}>heat versus ice guide</Link> explains those choices. None of these tools should delay assessment of a hot, red, rapidly swollen, locked, or unstable knee.
        </p>
        <p>
          Cost also matters. Include replacement electrodes, batteries, leads, conductive gel if approved, and the time required to set up and clean the device. A wireless model removes dangling leads but does not improve the underlying evidence. Choose convenience only after deciding that an individual trial is safe and produces a useful effect.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Stop TENS and seek advice for burns, blisters, persistent redness, numbness, color change, dizziness, palpitations, unexpected muscle contractions, or worsening pain. Arrange prompt assessment after trauma if the knee rapidly swells, locks, repeatedly gives way, looks deformed, or cannot bear weight. A hot red swollen knee with fever, new calf swelling with chest pain or breathing difficulty, or a cold discolored foot needs urgent medical help, not stronger stimulation.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          A TENS unit may provide temporary knee pain relief for an individual responder, but the evidence is mixed and major osteoarthritis guidelines do not support routine use. Pad placement should be treated as device-specific and clinician-informed, not as one universal four-pad prescription. Confirm contraindications, keep the unit off while handling electrodes, aim for strong but comfortable sensory tingling, and stop for skin or circulation changes. Most importantly, use any short-lived comfort to support an appropriate movement and strengthening plan rather than to hide warning signs or promise tissue repair.
        </p>
      </>
    )
  }
};
