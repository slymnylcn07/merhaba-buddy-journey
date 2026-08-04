import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3-56-60/diclofenac-gel-knee-pain-hero.webp";
import applicationAvif from "@/assets/article-photos/wave-3-56-60/diclofenac-gel-knee-pain-apply.avif";
import applicationWebp from "@/assets/article-photos/wave-3-56-60/diclofenac-gel-knee-pain-apply.webp";
import safetyAvif from "@/assets/article-photos/wave-3-56-60/diclofenac-gel-knee-pain-safety.avif";
import safetyWebp from "@/assets/article-photos/wave-3-56-60/diclofenac-gel-knee-pain-safety.webp";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const diclofenacGelKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "diclofenac-gel-knee-pain",
    title: "Diclofenac Gel for Knee Pain: Voltaren Use, Safety, and Evidence",
    subtitle:
      "What topical diclofenac can and cannot do for knee osteoarthritis, how the US 1% label is used, and which health or medication risks need a pharmacist or clinician",
    intro:
      "A tube of diclofenac gel can look like the simple middle ground between doing nothing and taking an anti-inflammatory pill. For some adults with knee osteoarthritis, that is a useful role: the medicine is applied over the painful joint and has lower whole-body exposure than oral diclofenac. It is still an NSAID, though. The dose, application area, other medicines, pregnancy status, and medical history all matter. It is also not an instant sports rub and does not repair cartilage, a meniscus, or a tendon. The practical question is not simply whether Voltaren works. It is whether topical diclofenac fits the cause of your knee pain and can be used safely under the exact label on your product.",
    quickAnswer:
      "Diclofenac gel is a topical nonsteroidal anti-inflammatory drug with good guideline support for knee osteoarthritis when an NSAID is appropriate. For the current US over-the-counter 1% arthritis-pain label, adults measure 4 grams for one knee with the supplied dosing card and apply it four times daily, for up to 21 days unless a doctor directs otherwise. Relief is not immediate and may take up to 7 days. Do not use more, add oral ibuprofen or naproxen, apply heat, cover it tightly, or layer another product on the same area without professional guidance. Lower blood levels than oral diclofenac do not mean zero heart, stomach, kidney, pregnancy, allergy, or interaction risk.",
    metaTitle: "Diclofenac Gel for Knee Pain: Use, Safety and Evidence",
    metaDescription:
      "Learn how diclofenac and Voltaren gel are used for knee arthritis, label-specific dosing, time to relief, interactions, safety and evidence limits.",
    heroImage,
    publishedDate: "August 4, 2026",
    lastUpdated: "August 4, 2026",
    nextSlug: "capsaicin-cream-knee-pain",
    nextTitle: "Capsaicin Cream for Knee Pain",
    seoTags:
      "diclofenac gel for knee pain, Voltaren gel for knee pain, Voltaren gel for knee arthritis, diclofenac sodium topical gel knee, how to use Voltaren gel on knee, Voltaren gel dosage knee, how much Voltaren gel for knee, how often use diclofenac gel, how long does Voltaren gel take to work, diclofenac gel side effects, Voltaren gel with ibuprofen, diclofenac gel vs capsaicin, topical NSAID knee osteoarthritis",
    faqs: [
      {
        question: "Does diclofenac gel work for knee pain?",
        answer:
          "It can reduce pain and improve function for some adults with knee osteoarthritis, and major guidelines recommend a topical NSAID when it is appropriate. That evidence does not prove equal benefit for every cause of knee pain. The US over-the-counter 1% label is for arthritis pain in specified joints, not strains, sprains, bruises, sports injuries, or an undiagnosed swollen knee."
      },
      {
        question: "How much Voltaren gel should I put on my knee?",
        answer:
          "The current US over-the-counter 1% label directs adults to use the supplied dosing card to measure 4 grams for one affected knee and apply it four times daily. Directions can differ by country, concentration, prescription status, and product, so follow your own package rather than transferring this amount to another formulation. Do not exceed the label or treat more than two body areas at once."
      },
      {
        question: "How long does diclofenac gel take to work on a knee?",
        answer:
          "It is not designed for immediate relief. The US 1% arthritis-pain label says benefit may take up to 7 days. Stop and ask a doctor if pain is not better after 7 days, and do not continue beyond 21 days unless a doctor directs it. A painful knee that is rapidly worsening, hot, red, locked, or unable to bear weight should be assessed rather than given a longer trial."
      },
      {
        question: "Can I use Voltaren gel on both knees?",
        answer:
          "The US over-the-counter 1% directions allow use on up to two body areas at the same time, which can include both knees, while staying within every per-joint and total label limit. Do not improvise a larger total dose. Check with a pharmacist if you also need another joint treated or if your product has different directions."
      },
      {
        question: "Can I use diclofenac gel with ibuprofen, naproxen, or aspirin?",
        answer:
          "Do not combine topical diclofenac with another NSAID on your own. Ibuprofen, naproxen, aspirin used for pain, and oral diclofenac can add stomach, bleeding, kidney, and cardiovascular risk even though the gel produces lower blood exposure. Low-dose aspirin prescribed for heart or stroke prevention should not be stopped without the prescriber, but the combination still needs a pharmacist or clinician review."
      },
      {
        question: "Can I use a heating pad or knee brace over Voltaren gel?",
        answer:
          "The US label says not to apply external heat or a bandage to the treated area. A close, occlusive brace may also trap product against the skin, so do not assume it is compatible. Let the gel dry, follow clothing and washing intervals on the label, and ask a pharmacist about a specific non-occlusive support."
      },
      {
        question: "Is diclofenac gel safer than diclofenac tablets?",
        answer:
          "Topical gel generally creates much lower systemic exposure than oral diclofenac, which is one reason guidelines often prefer it before an oral NSAID for knee osteoarthritis. Safer is not the same as risk-free. The topical label still carries NSAID warnings involving the heart, stomach and intestines, kidneys, liver, allergy, pregnancy, bleeding, and drug interactions."
      },
      {
        question: "Can diclofenac gel heal arthritis or a meniscus injury?",
        answer:
          "No. It may reduce symptoms associated with knee osteoarthritis, but it does not regrow cartilage, reverse arthritis, or heal a meniscus, ligament, or tendon. Less pain is not proof that the knee can tolerate a sudden increase in running, lifting, or stairs. Diagnosis, progressive activity, and strengthening still matter."
      }
    ],
    sources: [
      {
        title: "Diclofenac Sodium Topical Gel 1% Drug Facts Label",
        publisher: "DailyMed, US National Library of Medicine",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13925cd5-e121-80d2-e063-6394a90af9a9"
      },
      {
        title: "Management of Osteoarthritis of the Knee (Non-Arthroplasty), Third Edition",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://www.aaos.org/globalassets/quality-and-practice-resources/osteoarthritis-of-the-knee/oak3cpg.pdf"
      },
      {
        title: "2019 ACR and Arthritis Foundation Guideline for Osteoarthritis Management",
        publisher: "Arthritis Care and Research via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/31908149/"
      },
      {
        title: "Osteoarthritis in Over 16s: Diagnosis and Management",
        publisher: "National Institute for Health and Care Excellence",
        url: "https://www.nice.org.uk/guidance/ng226/chapter/recommendations"
      },
      {
        title: "Efficacy and Safety of Diclofenac Sodium Gel in Knee Osteoarthritis",
        publisher: "Seminars in Arthritis and Rheumatism via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/19932833/"
      },
      {
        title: "Diclofenac Sodium 1% Gel in Patients With Primary Hand Osteoarthritis",
        publisher: "Current Medical Research and Opinion via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/19380203/"
      },
      {
        title: "Systemic Bioavailability of Topical Diclofenac Sodium Gel 1% Versus Oral Diclofenac",
        publisher: "Journal of Clinical Pharmacology via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/19841157/"
      },
      {
        title: "FDA Recommends Avoiding NSAIDs in Pregnancy at 20 Weeks or Later",
        publisher: "US Food and Drug Administration",
        url: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-recommends-avoiding-use-nsaids-pregnancy-20-weeks-or-later-because-they-can-result-low"
      }
    ],
    content: (
      <>
        <p>
          People searching for <strong>diclofenac gel for knee pain</strong> are often trying to solve two different problems at once. They want to know whether a topical anti-inflammatory is likely to help, and they want a clear answer about how much to use. Those questions cannot be separated from the diagnosis or the package. The best evidence is for knee osteoarthritis, while the familiar 4-gram direction belongs to a specific US 1% over-the-counter label.
        </p>
        <p>
          If you are not sure whether your pattern resembles osteoarthritis, start with the <Link to="/guides/knee-arthritis-pain-guide" className={linkClass}>knee arthritis pain guide</Link>. Sudden swelling after a twist, a locked knee, calf symptoms, fever, or an inability to bear weight needs a different decision than familiar arthritis discomfort.
        </p>

        <h2>What Is Diclofenac Gel?</h2>
        <p>
          Diclofenac is a nonsteroidal anti-inflammatory drug, usually shortened to NSAID. A topical gel delivers it through the skin over a painful joint. Voltaren Arthritis Pain is one well-known brand in the United States, but generic diclofenac sodium topical gel 1% can carry the same active ingredient. Brand recognition does not replace a label check because concentrations, applicators, prescription status, and approved directions vary between countries and products.
        </p>
        <p>
          The medicine reduces cyclooxygenase activity and prostaglandin production, part of the inflammatory pain pathway. That can reduce symptoms. It does not rebuild worn cartilage or reveal what structure is hurting. A quieter knee after application is a response to pain treatment, not a structural clearance test.
        </p>

        <h2>Which Knee Pain Is It Actually Meant For?</h2>
        <p>
          The current US over-the-counter 1% label is for temporary relief of arthritis pain in joints that respond to topical treatment, including the knee. Major osteoarthritis guidelines from AAOS, the American College of Rheumatology and Arthritis Foundation, and NICE support a topical NSAID for knee osteoarthritis when contraindications have been considered. NICE places it before an oral NSAID because topical treatment can limit systemic exposure.
        </p>
        <p>
          That does not turn it into a general answer for every sore knee. The US label specifically says it has not been shown to work for strains, sprains, bruises, or sports injuries. Pain from a fresh collision, suspected tendon injury, meniscus tear, infection, gout flare, blood clot, or referred pain needs the cause addressed. The <Link to="/guides/knee-osteoarthritis-vs-rheumatoid-arthritis" className={linkClass}>osteoarthritis versus rheumatoid arthritis guide</Link> also explains why one topical product cannot settle the difference between joint conditions.
        </p>

        <h2>What Does the Evidence Show?</h2>
        <p>
          In a 12-week randomized trial involving 492 adults with knee osteoarthritis, diclofenac sodium gel 1% improved pain, physical function, and overall disease assessment more than vehicle gel. Participants used 4 grams four times daily. Application-site reactions were somewhat more frequent with diclofenac, while gastrointestinal event rates were similar in that study. Other trials and systematic reviews underpin the guideline recommendations for topical NSAIDs.
        </p>
        <p>
          The limitations matter. Most evidence concerns diagnosed osteoarthritis, trials are commonly measured over weeks rather than years, and some studies were industry sponsored. Average improvement does not guarantee meaningful relief for one person. Research also does not show that the gel slows joint degeneration or makes high-load exercise safe. It is a symptom option within a wider plan, not a cure.
        </p>

        <h2>Voltaren Gel Dosage for a Knee</h2>
        <p>
          The table below summarizes the current US over-the-counter diclofenac sodium topical gel 1% arthritis label. It is not a universal prescription for every diclofenac product. If your package, pharmacist, or prescriber gives different directions, use those directions.
        </p>
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Label question</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">US OTC 1% direction</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Why it matters</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">How much for one knee?</td>
                <td className="border-b border-slate-200 px-4 py-3">Measure 4 grams with the enclosed dosing card.</td>
                <td className="border-b border-slate-200 px-4 py-3">A kitchen spoon or a guessed strip is not the label method.</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">How often?</td>
                <td className="border-b border-slate-200 px-4 py-3">Apply four times daily.</td>
                <td className="border-b border-slate-200 px-4 py-3">Extra applications can increase exposure without proving more benefit.</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">How many areas?</td>
                <td className="border-b border-slate-200 px-4 py-3">Do not use on more than two body areas at once.</td>
                <td className="border-b border-slate-200 px-4 py-3">Both knees use more total medicine than one knee.</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">How soon?</td>
                <td className="border-b border-slate-200 px-4 py-3">Relief may take up to 7 days.</td>
                <td className="border-b border-slate-200 px-4 py-3">It is not intended as an instant numbing rub.</td>
              </tr>
              <tr>
                <td className="px-4 py-3">How long?</td>
                <td className="px-4 py-3">Use for up to 21 days unless a doctor directs otherwise.</td>
                <td className="px-4 py-3">No improvement by day 7 or a need beyond day 21 calls for review.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How to Apply Diclofenac Gel to a Knee</h2>
        <figure className="my-8">
          <picture>
            <source srcSet={applicationAvif} type="image/avif" />
            <img
              src={applicationWebp}
              alt="Older adult preparing to measure unbranded topical gel with a plain dosing card beside a healthy knee"
              loading="lazy"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
            />
          </picture>
          <figcaption>
            The US 1% arthritis-pain label uses a supplied dosing card rather than an estimated squeeze. Always follow the applicator and directions packaged with your product.
          </figcaption>
        </figure>
        <ol>
          <li><strong>Check the skin.</strong> Use only on clean, dry, intact skin. Do not apply over cuts, open wounds, infection, eczema, or a rash.</li>
          <li><strong>Measure the label amount.</strong> For the US OTC 1% knee direction, spread gel within the 4-gram area on the supplied dosing card.</li>
          <li><strong>Cover the knee area gently.</strong> The label describes rubbing it over the front, back, and sides of the knee, including around the kneecap. Do not forcefully massage an acutely painful joint.</li>
          <li><strong>Handle the card as instructed.</strong> Rinse it after use, let it dry, and keep it for the next dose. Do not clean it in a dishwasher.</li>
          <li><strong>Respect drying and washing times.</strong> The label says to wait at least 10 minutes before covering the treated skin with clothing and at least one hour before bathing or showering.</li>
          <li><strong>Wash your hands.</strong> Avoid the eyes, nose, mouth, and other mucous membranes. If hands are the treated joint, follow that product's specific hand instructions.</li>
        </ol>
        <p>
          Avoid natural and artificial sunlight on the treated area. Do not assume that applying a thick layer at bedtime replaces the scheduled amount. A missed application is not a reason to double the next one; check the package or ask a pharmacist.
        </p>

        <h2>What If the Gel Rolls Up or Feels Sticky?</h2>
        <p>
          Pilling, residue, or stickiness is not a reason to add another dose. It can happen when too much product is used, the skin is damp, another lotion is present, or clothing touches the area before it dries. Start the next scheduled application on clean, dry skin and use the supplied measuring method. Do not scrub irritated skin, use solvent or alcohol to remove residue, or place moisturizer, sunscreen, insect repellent, or cosmetic lotion over the same area unless the label or a pharmacist confirms how to separate them. If the product repeatedly fails to dry or the skin becomes sore, stop and check the package storage instructions and expiration date, then ask a pharmacist whether the formulation is suitable.
        </p>

        <h2>How Long Does Voltaren Gel Take to Work?</h2>
        <p>
          The label answer is up to 7 days, which surprises people expecting the instant cooling sensation of a menthol rub. Improvement can be gradual. A simple response log can be more useful than repeatedly testing the knee: note pain during the same ordinary task, such as the first flight of stairs or a short walk, along with swelling, stiffness, and any skin reaction.
        </p>
        <p>
          Do not use a lower pain score to make a sudden jump in running or lifting. Pair symptom control with an appropriate <Link to="/guides/knee-pain-exercises-guide" className={linkClass}>knee pain exercise plan</Link> and gradual loading. If nothing is changing after 7 days, the label says to stop and ask a doctor rather than simply applying more.
        </p>

        <h2>Topical Does Not Mean Risk-Free</h2>
        <p>
          In a healthy-volunteer pharmacokinetic study, systemic exposure from diclofenac gel regimens was 5 to 17 times lower than oral diclofenac. That is a meaningful difference, but some medicine still reaches the bloodstream. The topical product therefore keeps important NSAID warnings about serious cardiovascular events, stomach or intestinal bleeding, kidney problems, liver injury, and allergic reactions.
        </p>
        <figure className="my-8">
          <picture>
            <source srcSet={safetyAvif} type="image/avif" />
            <img
              src={safetyWebp}
              alt="Older adult discussing an unbranded topical gel and a medication list with a pharmacist"
              loading="lazy"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
            />
          </picture>
          <figcaption>
            A pharmacist can check topical diclofenac against oral pain relievers, blood thinners, heart and kidney medicines, allergies, and pregnancy status before the first application.
          </figcaption>
        </figure>
        <p>
          Ask a clinician or pharmacist before use if you are 60 or older; have heart disease, high blood pressure, prior stroke, kidney or liver disease, asthma, ulcers, or a history of stomach bleeding; take a diuretic; or drink three or more alcoholic drinks daily. Do not use it if diclofenac, aspirin, or another NSAID has caused an allergic reaction or asthma-type response. It should not be used around coronary artery bypass graft surgery.
        </p>
        <p>
          Pregnancy needs special caution. FDA advises avoiding NSAIDs at 20 weeks of pregnancy or later unless specifically directed because they can cause fetal kidney problems and low amniotic fluid; use at about 30 weeks or later can also affect the fetal heart. Anyone pregnant, trying to conceive, or breastfeeding should ask a health professional rather than treating this as a routine cosmetic topical.
        </p>

        <h2>Medication and Product Combinations to Check</h2>
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Combination</th>
                <th className="border-b border-slate-200 px-4 py-3 font-semibold">Practical answer</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">Ibuprofen, naproxen, oral diclofenac, or pain-dose aspirin</td>
                <td className="border-b border-slate-200 px-4 py-3">Do not stack NSAIDs without professional direction. Risks can add even when one product is topical.</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">Low-dose aspirin, warfarin, antiplatelets, steroids, SSRI or SNRI medicines</td>
                <td className="border-b border-slate-200 px-4 py-3">Ask the prescriber or pharmacist because bleeding risk and treatment priorities need review. Do not stop a prescribed medicine on your own.</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">ACE inhibitors, ARBs, beta blockers, diuretics, lithium, methotrexate, or cyclosporine</td>
                <td className="border-b border-slate-200 px-4 py-3">A medication review is appropriate because NSAIDs can affect kidneys, blood pressure, or drug levels.</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 px-4 py-3">Capsaicin, menthol, lidocaine, or another topical</td>
                <td className="border-b border-slate-200 px-4 py-3">Do not layer products on the same treated area. The diclofenac label says not to apply another product there.</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Heating pad, hot water bottle, tight wrap, or occlusive brace</td>
                <td className="px-4 py-3">Do not use external heat or a bandage over the application. Ask about a particular brace instead of assuming that breathable fabric makes it safe.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Acetaminophen is not an NSAID, but that does not make it automatically appropriate for every person or every combination. Liver disease, alcohol use, dose from multiple cold or pain products, and the reason for pain all matter. A pharmacist can give an answer based on your full list rather than a one-drug search.
        </p>

        <h2>Can Diclofenac Gel Be Used for a Meniscus or Sports Injury?</h2>
        <p>
          The US over-the-counter arthritis label does not claim strains, sprains, bruises, or sports injuries. A clinician may make different recommendations in a specific case, but that is not the same as self-treating an undiagnosed injury from the label. A knee that swelled quickly after a pivot, catches or locks, repeatedly gives way, or cannot fully straighten deserves assessment.
        </p>
        <p>
          For an ordinary post-workout flare without red flags, the <Link to="/guides/knee-pain-after-exercise" className={linkClass}>knee pain after exercise guide</Link> helps separate load, recovery, and symptom patterns. The <Link to="/guides/heat-vs-ice-for-knees" className={linkClass}>ice or heat for knee pain guide</Link> explains why adding heat over medication is not a harmless shortcut. The diclofenac label specifically says no external heat on the treated area.
        </p>

        <h2>Diclofenac Gel vs Capsaicin Cream</h2>
        <p>
          Diclofenac is a topical NSAID and has stronger guideline support for knee osteoarthritis. Capsaicin activates the TRPV1 heat receptor and may gradually reduce pain signaling, but burning is common and guideline conclusions are less consistent. Neither repairs cartilage. Read the <Link to="/guides/capsaicin-cream-knee-pain" className={linkClass}>capsaicin cream for knee pain guide</Link> for its separate application and heat precautions.
        </p>
        <p>
          Do not combine them on the same knee simply because both are sold without a prescription. The diclofenac label prohibits other products on the treated area, and capsaicin can make skin sensation difficult to interpret. A pharmacist can help choose one trial, define what improvement would count, and review other medicines.
        </p>

        <h2>Build a Plan Around the Gel, Not Around the Tube</h2>
        <p>
          If topical diclofenac provides worthwhile relief without adverse effects, use that window to support ordinary movement, sleep, and a tolerable strengthening plan. The <Link to="/guides/how-to-strengthen-knees" className={linkClass}>knee strengthening guide</Link> explains how progression differs from pushing through escalating pain. Footwear, activity volume, body weight when relevant, and the cause of arthritis symptoms can matter more over time than switching between topical brands.
        </p>
        <p>
          Decide in advance what success means. A modest but repeatable improvement in walking, stairs, or sleep can be meaningful. No change after the label trial, recurring swelling, or a need to hide worsening pain is information that the plan needs reassessment.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Stop the gel and get medical advice for hives, wheezing, facial swelling, severe skin reaction, chest pain, weakness on one side, black stools, vomiting blood, unusual swelling, reduced urination, yellow skin or eyes, or pain that worsens or is not better after 7 days. Seek urgent assessment if the knee is hot, red, rapidly swollen, deformed, physically locked, or unable to bear weight, or if calf swelling occurs with chest pain or breathing difficulty.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          Diclofenac gel is a well-supported topical option for some adults with knee osteoarthritis, especially when limiting systemic NSAID exposure is desirable. The current US 1% label uses 4 grams per knee four times daily, may need up to 7 days to help, and limits unsupervised use to 21 days. Those numbers belong to that label, not every product. Check interactions and contraindications, use intact skin, avoid heat, bandaging, sunlight, and same-site topicals, and never treat lower exposure as zero risk. Relief can support a graded knee-care plan, but it cannot diagnose the pain or repair the joint.
        </p>
      </>
    )
  }
};
