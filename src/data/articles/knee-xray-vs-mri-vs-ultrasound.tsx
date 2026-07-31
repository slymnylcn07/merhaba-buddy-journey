import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/knee-xray-vs-mri-vs-ultrasound.webp";
import imagingComparison from "@/assets/article-diagrams/wave-3/knee-imaging-what-each-shows.svg";
import imagingDecisionPath from "@/assets/article-diagrams/wave-3/knee-imaging-decision-path.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const kneeXrayVsMriVsUltrasound: ArticleExport = {
  cta: "",
  article: {
    slug: "knee-xray-vs-mri-vs-ultrasound",
    title: "Knee X-Ray vs MRI vs Ultrasound: What Each Test Can Show",
    subtitle:
      "A practical comparison of bone, cartilage, ligaments, tendons, fluid, radiation, contrast, and common imaging pathways",
    intro:
      "You go in because your knee still hurts, and the clinician suggests an X-ray. It is natural to wonder why they did not order the more detailed MRI, or whether a quick ultrasound would show the same thing. The answer is not that one scan is always better. An X-ray, MRI, and ultrasound look at the knee in different ways, and each becomes useful when it answers a specific question. Understanding those differences can make the imaging process feel less arbitrary without turning the decision into a test you have to choose by yourself.",
    quickAnswer:
      "A knee X-ray is strongest for bone, alignment, fracture, dislocation, and common arthritis changes. MRI is stronger for the menisci, ligaments, cartilage, tendons, bone marrow, and injuries hidden on an X-ray. Ultrasound is most useful for a focused, real-time look at superficial tendons, fluid, bursae, or a Baker's cyst, and for guiding a needle. For chronic knee pain, an X-ray is often the first imaging study when a scan is needed. MRI may be the next step when symptoms and examination suggest a deeper problem that the X-ray cannot answer. No scan should be interpreted separately from the history and physical examination.",
    metaTitle: "Knee X-Ray vs MRI vs Ultrasound: What Each Shows",
    metaDescription:
      "Compare knee X-rays, MRI and ultrasound. See what each test can reveal, what it may miss, when contrast is used and why the physical exam matters.",
    heroImage,
    publishedDate: "July 31, 2026",
    lastUpdated: "July 31, 2026",
    nextSlug: "osgood-schlatter-adults",
    nextTitle: "Osgood-Schlatter in Adults",
    seoTags:
      "knee x ray vs MRI, knee MRI vs x ray, knee ultrasound vs MRI, what does a knee x ray show, what does a knee MRI show, what does a knee ultrasound show, best scan for knee pain, normal knee x ray but pain",
    faqs: [
      {
        question: "Is MRI better than X-ray for knee pain?",
        answer:
          "Neither test is universally better. X-rays are particularly useful for fractures, dislocation, alignment, and common bone changes associated with arthritis. MRI provides much more detail about the menisci, ligaments, cartilage, tendons, bone marrow, and other internal structures. The better test is the one that answers the clinical question and is likely to change care."
      },
      {
        question: "Can an X-ray show a meniscus or ACL tear?",
        answer:
          "An ordinary X-ray does not directly show a meniscus or ACL tear. It may reveal a related fracture, an avulsion injury, arthritis, or another bone problem that changes the diagnosis. MRI provides a clearer assessment of the menisci and knee ligaments when that information is needed."
      },
      {
        question: "Why is an X-ray often ordered before a knee MRI?",
        answer:
          "An X-ray can answer several common first-line questions quickly, including whether there is a fracture, dislocation, alignment problem, joint-space narrowing, or another bone change. For chronic knee pain, the American College of Radiology generally recommends radiographs as initial imaging. MRI may follow when the X-ray is normal or incomplete for the problem a clinician still suspects."
      },
      {
        question: "What if my knee X-ray is normal but the pain continues?",
        answer:
          "A normal X-ray does not exclude a meniscus, ligament, cartilage, tendon, bone-marrow, or subtle bone injury. Persistent symptoms deserve reassessment. A clinician can compare the examination, injury history, swelling, locking, and function to decide whether MRI, ultrasound, a different test, or treatment without another scan is the useful next step."
      },
      {
        question: "Can ultrasound detect a meniscus tear?",
        answer:
          "Ultrasound can identify some meniscal abnormalities in selected settings, but it is less suited to a complete evaluation of the structures deep inside the knee. MRI is generally preferred when an acute meniscus tear or broader internal derangement is suspected. Ultrasound is stronger for focused superficial tendon, fluid, bursa, cyst, and dynamic questions."
      },
      {
        question: "Does a knee MRI need contrast?",
        answer:
          "Many common knee MRI examinations for suspected meniscus, ligament, cartilage, or occult injury are performed without intravenous contrast. Contrast is not an automatic upgrade. It is selected when it helps answer a particular question. An MR arthrogram, in which contrast is placed into the joint, is a separate procedure from a routine knee MRI."
      }
    ],
    content: (
      <>
        <p>
          People often describe MRI as the strongest scan because it produces detailed pictures of many structures.
          Detail, however, is not the same as usefulness. A beautifully detailed image that does not answer the
          clinician&apos;s question may add cost, delay, and confusing incidental findings without changing treatment.
          A simpler test may be more informative at the right point in the evaluation.
        </p>
        <p>
          The same principle applies to ultrasound. It can show certain tendons and fluid collections exceptionally
          well while the examiner moves the probe over the precise painful spot. It does not become a complete
          substitute for MRI simply because both can show soft tissue. The useful comparison is therefore not which
          machine wins, but which tissue and decision need to be examined.
        </p>

        <h2>Knee X-Ray vs MRI vs Ultrasound at a Glance</h2>
        <figure className="my-8">
          <img
            src={imagingComparison}
            alt="Comparison diagram showing the knee structures most clearly evaluated by X-ray, MRI, and ultrasound"
            loading="lazy"
          />
          <figcaption>
            Each modality emphasizes different structures. The clearest picture is the one that answers the clinical
            question.
          </figcaption>
        </figure>

        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Test</th>
                <th className="px-5 py-4 font-semibold">What it shows best</th>
                <th className="px-5 py-4 font-semibold">Important limitation</th>
                <th className="px-5 py-4 font-semibold">Radiation</th>
                <th className="px-5 py-4 font-semibold">Contrast</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Knee X-ray</td>
                <td className="px-5 py-4 text-slate-600">
                  Fracture, dislocation, bone alignment, osteophytes, and joint-space narrowing
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Does not directly show the menisci, cruciate ligaments, tendons, or articular cartilage
                </td>
                <td className="px-5 py-4 text-slate-600">Uses a small diagnostic dose of ionizing radiation</td>
                <td className="px-5 py-4 text-slate-600">Routine knee X-rays do not require contrast</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Knee MRI</td>
                <td className="px-5 py-4 text-slate-600">
                  Menisci, ligaments, cartilage, tendons, bone marrow, fluid, and occult injury
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Incidental findings, motion, metal artifact, cost, time, and safety screening can matter
                </td>
                <td className="px-5 py-4 text-slate-600">No ionizing radiation</td>
                <td className="px-5 py-4 text-slate-600">
                  Many common knee protocols use no IV contrast
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Knee ultrasound</td>
                <td className="px-5 py-4 text-slate-600">
                  Superficial tendons, selected ligaments, fluid, bursae, cysts, movement, and needle guidance
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Bone blocks sound, and deep internal structures are not evaluated as comprehensively as with MRI
                </td>
                <td className="px-5 py-4 text-slate-600">No ionizing radiation</td>
                <td className="px-5 py-4 text-slate-600">Standard diagnostic ultrasound needs no injected contrast</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Why the Best Knee Scan Is the Wrong Question</h2>
        <p>
          Imaging works best after the clinician has defined a question. Did a fall cause a fracture? Is an older
          knee losing joint space under load? Does a twisting injury suggest a meniscus or ligament problem? Is the
          fullness behind the knee a fluid-filled cyst? The answers point toward different tests.
        </p>
        <p>
          History and examination come first because they narrow the field. The clinician may ask how the problem
          began, where the pain is located, whether swelling appeared quickly, whether the knee locks or gives way,
          and which movements reproduce the symptom. They may then assess motion, tenderness, stability, strength,
          walking, and the joints above and below the knee. Our{" "}
          <Link to="/guides/knee-pain-locations-visual-guide" className={linkClass}>
            knee pain location guide
          </Link>{" "}
          can help you describe the area, but location alone cannot select a scan or confirm a diagnosis.
        </p>
        <p>
          Sometimes the examination supports an initial treatment plan without advanced imaging. In other cases,
          imaging changes whether the person needs protection from weight bearing, a specialist referral, a procedure,
          or a particular rehabilitation pathway. The most useful scan is not necessarily the one that reveals the
          greatest number of abnormalities. It is the one most likely to clarify the next decision.
        </p>

        <h2>What Does a Knee X-Ray Show?</h2>
        <p>
          X-rays pass through the body and are absorbed differently by dense bone and softer tissue. Bone therefore
          appears with far more definition than muscles, tendons, and other soft tissues. A standard knee series uses
          more than one view because a single angle can hide a fracture line, alignment issue, or area of joint-space
          loss.
        </p>

        <h3>Bone injury, dislocation, and alignment</h3>
        <p>
          After a fall or forceful twist, an X-ray can identify many fractures and show whether the bones remain
          aligned. It can also reveal an avulsion fracture, where a ligament or tendon pulls a small piece of bone
          away from its attachment. That finding can be an important clue even though the ligament itself is not
          clearly visible on the image. X-rays also help assess deformity, prior bone injury, some abnormal bone
          growths, and changes around previous surgery.
        </p>
        <p>
          A normal X-ray does not exclude every bone injury. Small, nondisplaced, stress-related, or occult fractures
          can be difficult to see, particularly early. If the injury story, focal bone tenderness, swelling, or
          inability to use the knee still raises concern, the clinician may protect the leg and choose further
          assessment rather than treating the first image as the final word.
        </p>

        <h3>Arthritis and joint-space changes</h3>
        <p>
          X-rays commonly support knee osteoarthritis assessment by showing osteophytes, changes in bone shape,
          areas of increased bone density, and narrowing between the femur and tibia or behind the kneecap. The dark
          space between bones is not a direct photograph of cartilage. Because cartilage does not appear clearly on
          an ordinary X-ray, reduced joint space is used as an indirect sign that cartilage and the broader joint
          have changed.
        </p>
        <p>
          Weight-bearing views may be requested because standing shows the joint while it is loaded. A knee can look
          different under body weight than it does lying down. Imaging is still only one part of arthritis
          assessment. Some people have substantial radiographic change with modest symptoms, while others have
          important pain and limitation with less dramatic X-ray findings. The{" "}
          <Link to="/guides/knee-arthritis-pain-guide" className={linkClass}>
            knee arthritis guide
          </Link>{" "}
          explains treatment without assuming that an image determines how a knee should feel.
        </p>

        <h3>What an X-ray does not show directly</h3>
        <p>
          An X-ray does not directly display a torn meniscus, ACL, PCL, or most tendon injuries. It also provides
          little detail about articular cartilage, muscles, bone marrow, and many causes of swelling. An X-ray may
          still be ordered when one of those problems is suspected because it can find a fracture or arthritis that
          changes the interpretation and the next step.
        </p>

        <h2>What Does a Knee MRI Show?</h2>
        <p>
          MRI uses a strong magnetic field, radiofrequency energy, and a computer to create images in multiple planes.
          It does not use X-rays. The contrast between water, fat, muscle, cartilage, and other tissues allows MRI to
          examine both hard and soft structures within the same study.
        </p>

        <h3>Menisci, ligaments, cartilage, and tendons</h3>
        <p>
          MRI can show the medial and lateral menisci, the ACL and PCL, the collateral ligaments, articular cartilage,
          quadriceps and patellar tendons, muscles, and supporting tissues around the kneecap. It may clarify whether
          several structures were injured in the same event, which is especially useful after a forceful twist,
          collision, or dislocation.
        </p>
        <p>
          MRI is not required to diagnose every ligament injury. For example, a skilled examination may strongly
          support an ACL injury, while MRI helps confirm the pattern and assess the meniscus, cartilage, bone, and
          other ligaments. A report should be interpreted with the injury mechanism and stability examination, not
          used as a stand-alone verdict about function.
        </p>

        <h3>Bone marrow, hidden fractures, and joint fluid</h3>
        <p>
          MRI can reveal bone-marrow changes, bone bruising, osteochondral injury, and some fractures that are not
          apparent on initial X-rays. It also shows joint fluid and many causes of internal swelling. These strengths
          do not mean every swollen or painful knee needs an MRI. A hot, red, acutely swollen joint may require urgent
          examination, blood tests, or sampling of joint fluid rather than waiting for an elective scan.
        </p>
        <p>
          MRI can also provide information about infection, a mass, dead bone, and postoperative complications when
          one of those problems is clinically suspected. The imaging protocol may change for those questions, which
          is one reason a generic self-ordered knee MRI is not equivalent to a study planned by the treating and
          imaging teams.
        </p>

        <h3>When MRI often follows an X-ray</h3>
        <p>
          The American College of Radiology rates knee radiography as usually appropriate initial imaging for chronic
          knee pain. When the initial X-ray is negative or shows a joint effusion and further imaging is warranted,
          MRI without intravenous contrast is usually appropriate as the next test. If the X-ray already demonstrates
          typical degenerative change, MRI may or may not add useful information. The decision depends on whether the
          symptoms, examination, or planned treatment raise a question that the X-ray did not answer.
        </p>
        <p>
          After acute trauma with focal tenderness, an effusion, or inability to bear weight, radiographs are also
          commonly the initial study. If no fracture appears but an occult fracture or internal derangement remains a
          concern, MRI without intravenous contrast is usually appropriate as a next study. This is why an X-ray-first
          pathway is not a refusal to investigate soft tissue. It is a staged approach in which each result informs
          the next decision.
        </p>

        <h3>Does knee MRI need contrast?</h3>
        <p>
          Many common knee MRI protocols for suspected meniscus, ligament, cartilage, or occult injury do not use
          intravenous contrast. Contrast is not an automatic upgrade that makes every scan better. It is selected when
          the additional information is relevant to a particular concern. The ordering clinician and radiologist may
          alter the protocol for a mass, infection, inflammation, prior surgery, or another focused question.
        </p>
        <p>
          An MR arthrogram is different from a routine MRI. Contrast is introduced into the joint before imaging so
          that selected internal structures can be assessed in a particular way. It is not the standard starting test
          for ordinary knee pain. If contrast has been proposed, ask what question it is intended to answer and
          whether kidney disease, pregnancy, allergies, or previous reactions affect the plan.
        </p>

        <h2>What Does a Knee Ultrasound Show?</h2>
        <p>
          Ultrasound sends sound waves from a handheld probe and converts the returning echoes into a live image.
          Because the image appears in real time, the examiner can compare the painful and less painful sides, press
          over the exact tender spot, and sometimes watch a tendon or joint region while the knee moves.
        </p>

        <h3>Superficial tendons, fluid, bursae, and cysts</h3>
        <p>
          A focused knee ultrasound can assess the quadriceps and patellar tendons, selected portions of the
          collateral ligaments, superficial muscles and nerves, joint effusion, synovial thickening, and bursae. It is
          particularly useful for evaluating a lump behind the knee and determining whether it has the appearance of a
          fluid-filled Baker&apos;s cyst or a solid structure. Our{" "}
          <Link to="/guides/back-of-knee-pain-explained" className={linkClass}>
            guide to pain and fullness behind the knee
          </Link>{" "}
          explains why a lump still needs clinical context.
        </p>
        <p>
          Real-time imaging also makes ultrasound useful for guiding aspiration or injection. The operator can see the
          needle route and the targeted fluid collection or tissue rather than relying only on surface landmarks.
          Diagnostic ultrasound itself is noninvasive, while an ultrasound-guided procedure still involves the risks
          and preparation associated with the needle and medication used.
        </p>

        <h3>Why ultrasound is not a smaller MRI</h3>
        <p>
          Sound waves do not pass through bone well. Ultrasound can show the outer surface of bone but not the marrow
          inside it. Structures deep within the joint, including the cruciate ligaments and much of the menisci and
          articular cartilage, are not assessed as comprehensively as they are on MRI. Deeper tissues can also be more
          difficult to see in a larger limb.
        </p>
        <p>
          Ultrasound may identify selected meniscal abnormalities, and it can be considered when MRI is unavailable or
          cannot be performed. That does not make it the preferred general test for suspected internal derangement.
          Current ACR guidance does not recommend ultrasound as routine initial imaging for chronic knee pain or acute
          trauma. Its value is highest when the clinical question is focused and accessible from the skin.
        </p>

        <h2>Which Test Is Often Chosen for Different Knee Problems?</h2>
        <figure className="my-8">
          <img
            src={imagingDecisionPath}
            alt="Typical adult decision path showing when clinicians may choose knee X-ray, MRI, or ultrasound"
            loading="lazy"
          />
          <figcaption>
            This is a typical adult pathway, not a rule for ordering your own scan. Age, pregnancy, previous surgery,
            examination findings, and the suspected condition can change the choice.
          </figcaption>
        </figure>

        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Clinical situation</th>
                <th className="px-5 py-4 font-semibold">Often-considered first step</th>
                <th className="px-5 py-4 font-semibold">What may follow</th>
                <th className="px-5 py-4 font-semibold">Why the pathway can change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">
                  Fall or twist with focal tenderness, effusion, or inability to bear weight
                </td>
                <td className="px-5 py-4 text-slate-600">Clinical assessment and knee X-rays</td>
                <td className="px-5 py-4 text-slate-600">
                  MRI without contrast if an occult fracture or internal injury remains suspected
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Major trauma, dislocation, circulation concerns, or age can require a different urgent pathway
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Chronic knee pain without a clear injury</td>
                <td className="px-5 py-4 text-slate-600">History, examination, and often X-ray when imaging is needed</td>
                <td className="px-5 py-4 text-slate-600">
                  MRI when the X-ray is normal or incomplete for a clinically important question
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Many common pain patterns can begin treatment without immediate advanced imaging
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Typical osteoarthritis pattern</td>
                <td className="px-5 py-4 text-slate-600">Weight-bearing X-rays may be sufficient</td>
                <td className="px-5 py-4 text-slate-600">
                  MRI only if another diagnosis or treatment decision needs clarification
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Symptoms and X-ray severity do not always match
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">
                  Focal tendon pain, superficial swelling, or a lump behind the knee
                </td>
                <td className="px-5 py-4 text-slate-600">Focused ultrasound may be useful</td>
                <td className="px-5 py-4 text-slate-600">
                  MRI if the concern is deeper, broader, or linked to internal joint structures
                </td>
                <td className="px-5 py-4 text-slate-600">
                  The exact location and whether movement changes the finding matter
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Hot, red, rapidly swollen knee</td>
                <td className="px-5 py-4 text-slate-600">Prompt clinical assessment</td>
                <td className="px-5 py-4 text-slate-600">
                  Blood work, joint-fluid testing, and selected imaging may be used
                </td>
                <td className="px-5 py-4 text-slate-600">
                  Infection and crystal arthritis cannot be safely handled as a scan-choice question
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Acute injury with swelling or difficulty bearing weight</h3>
        <p>
          A fall, collision, or forceful twist followed by focal tenderness, swelling, or difficulty bearing weight
          deserves an examination. X-rays are commonly used first to assess fracture and alignment. If the knee looks
          deformed, circulation or sensation changes, or the trauma was substantial, urgent care takes priority over
          comparing outpatient scan options.
        </p>
        <p>
          When the X-ray is negative but the knee remains very difficult to use, a clinician may suspect a hidden
          fracture, meniscus injury, ligament injury, or osteochondral problem. MRI without contrast can then provide
          information that the X-ray could not. The{" "}
          <Link to="/guides/understanding-knee-injuries" className={linkClass}>
            knee injury guide
          </Link>{" "}
          describes injury patterns and warning signs without assuming that every pop means the same structure tore.
        </p>

        <h3>Long-lasting pain with no single injury</h3>
        <p>
          Chronic pain is often evaluated with a history, examination, and X-rays when imaging is likely to help.
          This can identify osteoarthritis, alignment change, an old bone injury, or another bony explanation. If
          symptoms suggest a meniscus, tendon, cartilage, or other internal problem and the X-ray does not explain
          them, MRI may be considered.
        </p>
        <p>
          Advanced imaging is not automatically required because pain has lasted a certain number of days. The
          decision also depends on whether symptoms are improving, whether the knee locks or repeatedly gives way,
          whether swelling returns, what treatment has been tried, and how the result would change the plan.
        </p>

        <h3>Knee pain with a normal X-ray</h3>
        <p>
          "Normal X-ray but knee still hurts" is a common and understandable search. The result means the images did
          not show the bony changes the radiologist was looking for. It does not mean the pain is imaginary, and it
          does not clear every soft-tissue structure. Meniscus, ligament, tendon, cartilage, bone-marrow, nerve, hip,
          and referred-pain patterns may require a different evaluation.
        </p>
        <p>
          The next step is not always MRI. A focused tendon problem may be suitable for ultrasound. A movement-related
          pattern may begin with rehabilitation. Numbness or weakness may point toward a nerve assessment. The guide to{" "}
          <Link to="/guides/knee-weakness-without-pain" className={linkClass}>
            knees that feel weak or unstable
          </Link>{" "}
          explains why fatigue, true buckling, and neurological weakness should not be grouped together.
        </p>

        <h2>Can a Scan Tell Exactly Why Your Knee Hurts?</h2>
        <p>
          A scan can identify structure, but pain is a clinical experience rather than a brightness level on an
          image. Researchers have found cartilage defects, meniscal tears, bone-marrow lesions, and osteophytes on MRI
          in people who report no knee symptoms. Incidental meniscal damage becomes more common with age and often
          appears alongside osteoarthritis. This does not make MRI inaccurate. It means the report may describe
          several true findings while only one, or none, explains the current complaint.
        </p>
        <p>
          X-ray findings have the same need for context. Radiographic osteoarthritis and knee pain are related at a
          population level, but the relationship is not precise enough to predict one person&apos;s pain from an image.
          Sleep, strength, activity, inflammation, previous injury, sensitivity of the nervous system, and general
          health can influence symptoms. A severe-looking X-ray does not decide that exercise is unsafe, and a
          mild-looking X-ray does not dismiss meaningful pain.
        </p>
        <p>
          The radiology report should therefore be matched with the painful location, the timing of swelling, the
          injury mechanism, locking, stability, movement, and examination. A finding is not automatically a treatment
          instruction. It becomes useful when the treating clinician can explain how it fits the symptoms and what
          decision follows from it.
        </p>
        <p>
          A normal scan also has limits. Some pain patterns fluctuate, occur only under load, or arise from structures
          outside the scanned field. If symptoms change or function declines, reassessment is more useful than
          repeatedly reading the same report in isolation.
        </p>

        <h2>Radiation, Contrast, Metal, Comfort, and Cost</h2>
        <h3>Which knee test uses radiation?</h3>
        <p>
          X-rays use ionizing radiation. A routine bone X-ray uses a small diagnostic dose, and imaging teams follow
          the principle of using the lowest exposure that produces an adequate image. Actual dose varies with the
          equipment, views, patient, and protocol, so a universal comparison with a fixed number of days of background
          radiation can be misleading. MRI and ultrasound do not use ionizing radiation.
        </p>
        <p>
          Tell the clinician and technologist if you are or may be pregnant. The clinical need and the part of the
          body being imaged affect the decision and precautions. Do not cancel a medically important test without
          discussing the situation with the care team.
        </p>

        <h3>MRI safety screening and metal</h3>
        <p>
          The MRI environment contains a powerful magnet. Every implant, device, metal fragment, previous operation,
          medication patch, and external device should be disclosed during screening. Many orthopedic implants can be
          scanned under specified conditions, but "I have metal" and "MRI is impossible" are not interchangeable
          conclusions. The exact device and its verified safety conditions matter. A device with unknown status
          should not be assumed safe.
        </p>
        <p>
          MRI is also noisy and requires the knee to remain still. Anxiety, claustrophobia, pain, shaking, or an
          inability to straighten the knee can affect comfort and image quality. Tell the facility in advance rather
          than trying to endure a problem silently. Open MRI or other accommodations may be possible for some people,
          but not every system can perform every examination with the same protocol.
        </p>

        <h3>What about gadolinium contrast?</h3>
        <p>
          Gadolinium-based contrast agents can improve selected MRI questions, but they also add considerations such
          as allergic reactions, kidney function, pregnancy, and retention of small amounts of gadolinium in the body.
          The FDA states that the benefits of an indicated contrast examination should be weighed against the risks
          for the individual. For common internal knee injuries, the important practical point is that a routine MRI
          often does not require intravenous contrast.
        </p>

        <h3>Which test costs more?</h3>
        <p>
          X-ray equipment is widely available and relatively inexpensive. Ultrasound is often less costly than MRI,
          while MRI commonly takes longer and costs more than other imaging examinations. Those are broad comparisons,
          not price quotes. Actual out-of-pocket cost depends on the country, facility, insurance network, deductible,
          number of views, use of contrast, and whether ultrasound includes a guided procedure.
        </p>
        <p>
          Before a nonurgent study, ask the ordering office which protocol was requested, ask the imaging center for
          its estimate, and check whether authorization or an in-network facility is required. Choosing a cheaper test
          that cannot answer the clinical question may create another appointment rather than a real saving.
        </p>

        <h2>Questions to Ask Before and After Knee Imaging</h2>
        <p>
          You do not need to argue for a particular machine. A few practical questions can reveal whether the test has
          a clear purpose:
        </p>
        <ul>
          <li>What specific problem are we trying to confirm or exclude?</li>
          <li>How could the result change treatment, activity advice, or referral?</li>
          <li>Why is this test more useful than the alternatives for my symptom pattern?</li>
          <li>If MRI is planned, will it use contrast and what would contrast add?</li>
          <li>Do my implants, prior surgery, pregnancy status, or kidney history change preparation?</li>
          <li>What should I do if the scan is normal but the knee still limits me?</li>
        </ul>
        <p>
          After the report returns, ask which finding best matches the symptoms and which findings may be incidental.
          Also ask what happens next. A report that names a meniscus tear, cartilage wear, or fluid collection does
          not by itself determine whether care should involve monitoring, rehabilitation, medication, aspiration, or
          surgery.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Seek prompt medical assessment if you cannot move the knee or bear weight, the knee is deformed or
            physically locked, swelling is major or rapid, or severe pain followed substantial trauma. A hot, red,
            swollen knee with fever or feeling unwell can signal infection and needs urgent care. New calf swelling
            with chest pain or breathing difficulty also requires urgent medical help. Do not delay these symptoms
            while trying to arrange a preferred scan.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          A knee X-ray, MRI, and ultrasound are complementary rather than competing tests. X-ray is the practical
          starting point for many bone, alignment, fracture, and arthritis questions. MRI provides a broader view of
          the structures inside the joint when the examination and earlier information justify that detail.
          Ultrasound adds a focused, dynamic view of superficial tendons, fluid, bursae, cysts, and procedures.
        </p>
        <p>
          More imaging is not always more certainty. The safest and most useful pathway begins with the symptom story
          and examination, uses a test to answer a defined question, and interprets the result in context. If a scan
          has been recommended, ask what it is meant to change. If a scan is normal but symptoms persist, return to
          the clinical question rather than assuming either that nothing is wrong or that the most expensive test must
          be next.
        </p>
      </>
    ),
    sources: [
      {
        title: "ACR Appropriateness Criteria: Chronic Knee Pain",
        publisher: "American College of Radiology",
        url: "https://acsearch.acr.org/docs/69432/Narrative/"
      },
      {
        title: "ACR Appropriateness Criteria: Acute Trauma to the Knee",
        publisher: "American College of Radiology",
        url: "https://acsearch.acr.org/docs/69419/narrative/"
      },
      {
        title: "Bone X-ray",
        publisher: "RadiologyInfo.org, ACR and RSNA",
        url: "https://www.radiologyinfo.org/en/info/bonerad"
      },
      {
        title: "Knee MRI",
        publisher: "RadiologyInfo.org, ACR and RSNA",
        url: "https://www.radiologyinfo.org/en/info/kneemr"
      },
      {
        title: "Musculoskeletal Ultrasound",
        publisher: "RadiologyInfo.org, ACR and RSNA",
        url: "https://www.radiologyinfo.org/en/info/musculous"
      },
      {
        title: "MRI Benefits and Risks",
        publisher: "U.S. Food and Drug Administration",
        url: "https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/benefits-and-risks"
      },
      {
        title: "Meniscus Tears",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/meniscus-tears/"
      },
      {
        title: "Prevalence of Knee Osteoarthritis Features on MRI in Asymptomatic Uninjured Adults",
        publisher: "British Journal of Sports Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/29886437/"
      }
    ]
  }
};
