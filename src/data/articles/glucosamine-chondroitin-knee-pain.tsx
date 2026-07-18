import { ArticleExport } from "./types";
import { Link } from "react-router-dom";
import heroImage from "@/assets/article-hero-glucosamine-chondroitin.svg";
import evidenceMap from "@/assets/diagram-glucosamine-evidence-map.svg";
import trialPlan from "@/assets/diagram-glucosamine-trial-plan.svg";

export const glucosamineChondroitinKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "glucosamine-chondroitin-knee-pain",
    title: "Glucosamine & Chondroitin for Knee Pain: Do They Work?",
    subtitle: "A balanced look at forms, doses, evidence, safety, and when to stop",
    intro: "Glucosamine and chondroitin are among the best-known supplements for knee osteoarthritis, yet major trials and clinical guidelines do not all reach the same conclusion. This guide explains what each ingredient is, why product form matters, what the strongest studies found, who should be cautious, and how to run a structured trial without letting a supplement replace the treatments that have better evidence.",
    metaTitle: "Glucosamine & Chondroitin for Knee Pain: Do They Work?",
    metaDescription: "Do glucosamine and chondroitin help knee pain? Compare forms, research, doses, safety, interactions, product quality, and a practical trial plan.",
    heroImage,
    publishedDate: "July 18, 2026",
    lastUpdated: "July 18, 2026",
    nextSlug: "best-supplements-for-knee-pain",
    nextTitle: "Best Supplements for Knee Pain",
    seoTags: "glucosamine for knee pain, chondroitin for knee pain, glucosamine chondroitin osteoarthritis, do joint supplements work, glucosamine sulfate vs hydrochloride, chondroitin sulfate, knee arthritis supplements, glucosamine dosage, joint supplement safety",
    faqs: [
      {
        question: "Do glucosamine and chondroitin work for knee osteoarthritis?",
        answer: "On average, the best evidence shows little or no meaningful improvement for many people, and several major guidelines recommend against routine use. Some studies and some individuals report benefit, especially with particular formulations, but the overall evidence is inconsistent. A supplement trial should be time-limited, tracked, and discussed with a clinician when medicines or health conditions create interaction risks."
      },
      {
        question: "Which is better: glucosamine sulfate or glucosamine hydrochloride?",
        answer: "The two forms are not interchangeable in the research. Some positive European studies used prescription crystalline glucosamine sulfate, while the large U.S. GAIT trial used glucosamine hydrochloride and did not find a significant overall benefit. Retail labels should therefore be read carefully rather than treating every product called glucosamine as equivalent."
      },
      {
        question: "How long does glucosamine take to work?",
        answer: "It is not an immediate pain reliever. People who choose to try it commonly assess response over roughly 8 to 12 weeks. Set measurable goals before starting, such as easier stairs, longer walking, less morning stiffness, or reduced use of rescue pain medicine. Stop if there is no meaningful change, side effects occur, or a clinician advises against it."
      },
      {
        question: "Can glucosamine rebuild knee cartilage?",
        answer: "No supplement has been proven to reliably regrow worn knee cartilage in people. Some studies have examined joint-space narrowing or other structural outcomes, but results are mixed and do not support advertising claims that glucosamine rebuilds a damaged joint."
      },
      {
        question: "Can I take glucosamine and chondroitin with warfarin?",
        answer: "Do not start the combination without speaking to the clinician who manages your anticoagulant. Reports and safety reviews have raised concern about increased anticoagulant effect and bleeding with warfarin, particularly with glucosamine-chondroitin combinations."
      },
      {
        question: "Does glucosamine affect blood sugar?",
        answer: "Most people do not appear to have major glucose changes, but uncertainty remains for some products and individuals. If you have diabetes, prediabetes, or use glucose-lowering medicine, discuss the supplement first and monitor according to your clinician's advice."
      },
      {
        question: "Can someone with a shellfish allergy take glucosamine?",
        answer: "Many products are made from shellfish shells, while others use non-shellfish fermentation sources. Allergy risk depends on manufacturing and contamination, so someone with a severe shellfish allergy should verify the source and discuss it with an allergist or clinician instead of relying on the front label alone."
      },
      {
        question: "What dose was used in major studies?",
        answer: "Frequently studied daily amounts include 1,500 mg of glucosamine and 1,200 mg of chondroitin. That does not make those doses appropriate for everyone, prove that a retail product contains the tested form, or guarantee benefit. Follow the product label and clinical advice rather than increasing the dose."
      },
      {
        question: "Should I take glucosamine with exercise?",
        answer: "Exercise should remain the foundation rather than being replaced by a supplement. Therapeutic strengthening, regular movement, weight management when relevant, sleep, and appropriate medical treatment have stronger support for knee osteoarthritis. If a supplement is tried, it should sit alongside that plan."
      }
    ],
    sources: [
      { title: "Glucosamine and Chondroitin for Osteoarthritis: What You Need To Know", publisher: "National Center for Complementary and Integrative Health", url: "https://www.nccih.nih.gov/health/glucosamine-and-chondroitin-for-osteoarthritis-what-you-need-to-know" },
      { title: "Osteoarthritis in over 16s: diagnosis and management - Recommendations", publisher: "National Institute for Health and Care Excellence", url: "https://www.nice.org.uk/guidance/NG226/chapter/recommendations" },
      { title: "2019 ACR/Arthritis Foundation Guideline for Osteoarthritis", publisher: "American College of Rheumatology", url: "https://rheumatology.org/osteoarthritis-guideline" },
      { title: "Glucosamine, chondroitin sulfate, and the two in combination for painful knee osteoarthritis", publisher: "New England Journal of Medicine / PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/16495392/" },
      { title: "The effect of glucosamine and/or chondroitin sulfate on progression of knee osteoarthritis: GAIT", publisher: "Arthritis & Rheumatism / PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/20525840/" },
      { title: "Combined glucosamine and chondroitin shows no superiority over placebo", publisher: "Arthritis & Rheumatology / PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/27477804/" },
      { title: "Chondroitin for osteoarthritis", publisher: "Cochrane", url: "https://www.cochrane.org/evidence/CD005614_chondroitin-osteoarthritis" },
      { title: "Questions and Answers on Dietary Supplements", publisher: "U.S. Food and Drug Administration", url: "https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements" },
      { title: "Dietary Supplements: What You Need to Know", publisher: "NIH Office of Dietary Supplements", url: "https://ods.od.nih.gov/factsheets/WYNTK-Consumer/" }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick Answer</p>
          <p className="mb-0 text-slate-700">
            <strong>Glucosamine and chondroitin do not reliably relieve knee osteoarthritis pain for everyone.</strong> Large, well-designed trials have often found no meaningful overall advantage over placebo, and NICE and the American College of Rheumatology advise against routine glucosamine use. Some studies of specific formulations report modest benefit, which helps explain why recommendations differ. If you still want to try one, confirm safety first, choose a clearly labeled product, track a few real-life outcomes for 8–12 weeks, and stop if the change is not meaningful.
          </p>
        </div>

        <p>
          Walk down the supplement aisle and the message looks simple: cartilage is made from compounds related to glucosamine and chondroitin, so taking those compounds should feed or rebuild the joint. The biological story is appealing, the bottles are familiar, and millions of people have tried them. The research story is much less tidy. Some trials suggest a small improvement, some find a response in a subgroup, and others show no important difference from placebo. Major professional organizations also disagree about whether particular formulations deserve a place in care.
        </p>
        <p>
          That uncertainty does not mean the science is useless. It means the right question is not merely, “Does glucosamine work?” A better set of questions is: <strong>Which form, at what quality, for which person, for what outcome, and compared with what?</strong> This guide answers those questions without turning a mixed evidence base into either a miracle claim or a blanket dismissal.
        </p>

        <h2>What Are Glucosamine and Chondroitin?</h2>
        <p>
          Glucosamine is an amino sugar found naturally in the body and involved in the building blocks used in cartilage and other connective tissues. Commercial glucosamine is commonly produced from shellfish shells or through fermentation. Chondroitin sulfate is a large molecule that is also present in cartilage and helps the tissue interact with water. Commercial chondroitin may come from bovine, porcine, marine, or other animal sources.
        </p>
        <p>
          In the United States these products are generally sold as dietary supplements, not as drugs approved to treat osteoarthritis. That distinction matters. A supplement can be legally marketed without the same premarket proof of effectiveness required for a prescription medicine. Manufacturing quality, ingredient identity, dose accuracy, and contamination control can vary among brands. In parts of Europe, particular pharmaceutical-grade preparations are regulated more like medicines, so a positive trial using a standardized product may not automatically apply to an inexpensive retail combination with the same words on the front.
        </p>
        <p>
          They are usually purchased separately or together. Combination products often add methylsulfonylmethane (MSM), turmeric, manganese, collagen, boswellia, or vitamins. More ingredients do not necessarily mean stronger evidence. They make it harder to know what caused a benefit or side effect, and they can increase the number of interactions to consider.
        </p>

        <h2>Why the Evidence Looks So Confusing</h2>
        <figure>
          <img src={evidenceMap} alt="Four reasons glucosamine studies disagree: formulation, participants, outcomes, and study quality" loading="lazy" />
          <figcaption>Trials do not always study the same product, the same patients, or the same definition of success.</figcaption>
        </figure>
        <p>
          The word <em>glucosamine</em> hides several different interventions. Glucosamine sulfate and glucosamine hydrochloride are chemically related but not identical. Some positive trials used prescription crystalline glucosamine sulfate supplied under tightly controlled conditions. The large U.S. Glucosamine/Chondroitin Arthritis Intervention Trial, known as GAIT, used glucosamine hydrochloride. When a review pools every form together, the average can conceal formulation differences; when a guideline separates products, its recommendation may sound different.
        </p>
        <p>
          Chondroitin has the same problem. Molecular weight, purity, animal source, dose, and manufacturing can differ. Trials may use pharmaceutical-grade chondroitin, while shoppers encounter a broad retail category. Studies also enroll different patients: some have mild pain, others moderate-to-severe pain; some have X-ray-confirmed osteoarthritis, while others rely mainly on symptoms; some exclude common health conditions that are routine in real life.
        </p>
        <p>
          Outcomes differ too. One trial may ask whether average pain falls by a few points. Another counts how many people achieve at least a 20% improvement. Others focus on function, stiffness, use of rescue medicine, joint-space width, or MRI measurements. A statistically significant change can still be too small for a person to notice when climbing stairs. Conversely, a subgroup signal can be interesting without proving that the supplement works for everyone in that subgroup.
        </p>
        <p>
          Finally, osteoarthritis trials have a substantial placebo response. Enrolling in a study can change behavior, expectations, activity, medication use, and attention to symptoms. Pain naturally fluctuates, so people often start a new product during a bad period and improve as the flare settles. That is why an uncontrolled personal impression can feel convincing even when a randomized trial finds little average difference.
        </p>

        <h2>What Did the GAIT Trial Find?</h2>
        <p>
          GAIT remains the best-known U.S. trial. It enrolled 1,583 people with symptomatic knee osteoarthritis and compared glucosamine hydrochloride, chondroitin sulfate, the combination, celecoxib, and placebo for six months. The primary outcome was a 20% reduction in knee pain. In the full group, glucosamine, chondroitin, and their combination did not significantly outperform placebo. Celecoxib did, which helped show that the trial could detect an active treatment effect.
        </p>
        <p>
          A pre-specified subgroup with moderate-to-severe baseline pain appeared to respond better to the combination. That result is frequently quoted in supplement marketing, but it needs context: the subgroup was much smaller, the finding was not the main overall result, and later research did not consistently reproduce a large benefit. It is better viewed as a hypothesis-generating signal than as proof that everyone with more severe pain should take the combination.
        </p>
        <p>
          GAIT follow-up also examined structural progression over two years. It did not establish a clear disease-modifying effect. A later six-month randomized trial of 1,500 mg glucosamine sulfate plus 1,200 mg chondroitin sulfate in people with moderate-to-severe knee pain found no superiority over placebo and was stopped early for futility. Those negative findings are a major reason U.S. and U.K. guidelines remain skeptical.
        </p>

        <h2>Why Do Some Reviews Still Find a Benefit?</h2>
        <p>
          Meta-analyses can produce different conclusions depending on which trials they include and how they handle formulation, risk of bias, sponsorship, and small studies. Chondroitin reviews have sometimes found modest pain or function improvements, especially in short-term studies, while also rating much of the evidence as low quality. Analyses limited to specific prescription preparations can look more favorable than analyses of the entire supplement category.
        </p>
        <p>
          This is not necessarily a contradiction. It may mean that a standardized product has a small effect while many retail products do not, or that publication bias and study quality inflate the estimate. It may also mean the true average effect is small and individual responses vary. From a consumer perspective, a small uncertain average benefit should be weighed against cost, pill burden, interaction risk, and what might be displaced from the care plan.
        </p>

        <h2>What Major Guidelines Say</h2>
        <p>
          The National Institute for Health and Care Excellence in the United Kingdom says not to offer glucosamine for osteoarthritis and to explain that there is no strong evidence of benefit. The American College of Rheumatology/Arthritis Foundation guideline strongly recommends against glucosamine for knee, hip, or hand osteoarthritis and recommends against chondroitin for knee or hip osteoarthritis. These recommendations place considerable weight on the lack of consistent, clinically meaningful benefit from higher-quality studies.
        </p>
        <p>
          Other organizations have been less absolute, particularly when discussing certain pharmaceutical-grade formulations or patient preference. That difference is often portrayed as experts being confused. In reality, guideline panels can review overlapping evidence but make different judgments about product standardization, effect size, cost, availability, and how much uncertainty is acceptable. A recommendation for a prescription crystalline product in one health system should not be converted into a claim that every warehouse-club joint formula works.
        </p>
        <p>
          The practical conclusion is straightforward: glucosamine and chondroitin are not first-line, must-have therapies. They are optional, uncertain adjuncts at most. Exercise, education, weight management when relevant, topical or oral medicines selected with a clinician, and appropriate physical therapy have a stronger place in most evidence-based plans. Our broader <Link to="/guides/best-supplements-for-knee-pain">supplements for knee pain guide</Link> compares these ingredients with curcumin, omega-3s, vitamin D, collagen, and other popular options.
        </p>

        <h2>Glucosamine Sulfate vs. Hydrochloride</h2>
        <p>
          This distinction deserves its own section because many labels blur it. Glucosamine sulfate includes a sulfate salt and is commonly sold as stabilized glucosamine sulfate. Glucosamine hydrochloride uses hydrochloride instead. The amount of elemental glucosamine and the way the compound is formulated differ. Research findings from one should not be casually assigned to the other.
        </p>
        <p>
          Some favorable long-term European studies used a specific prescription crystalline glucosamine sulfate preparation at 1,500 mg once daily. GAIT used 500 mg glucosamine hydrochloride three times daily, totaling 1,500 mg. The different results could reflect formulation, but they could also reflect trial design, populations, bias, or chance. We cannot conclude that sulfate is universally effective simply because hydrochloride performed poorly.
        </p>
        <p>
          If you are discussing a trial with a clinician, bring the actual bottle or a clear label photo. Record the full ingredient name, daily dose, other active ingredients, manufacturer, lot number, and any independent quality certification. “I take glucosamine” is not enough information to compare your product with a study.
        </p>

        <h2>Can They Rebuild Cartilage or Reverse Bone-on-Bone Arthritis?</h2>
        <p>
          No credible evidence supports the common claim that these supplements rebuild a worn knee. Cartilage is a living tissue, but advanced osteoarthritis is a whole-joint condition involving cartilage, bone, synovium, meniscus, ligaments, muscles, and pain processing. Swallowing a cartilage-related molecule does not deliver it like a patch to a damaged surface.
        </p>
        <p>
          Researchers have studied joint-space narrowing and imaging markers because slowing structural change would be valuable. Results have been inconsistent, effects-when reported-are small, and imaging changes do not always track with symptoms. A person should not delay effective care or a surgical evaluation because a bottle promises “cartilage regeneration.” If you have been told your knee is severely narrowed, use our <Link to="/guides/knee-arthritis-pain-guide">knee arthritis guide</Link> to understand the broader treatment pathway rather than looking for a supplement to reverse the X-ray.
        </p>

        <h2>Who Might Still Consider a Time-Limited Trial?</h2>
        <p>
          A reasonable candidate is someone with a clinician-supported diagnosis of knee osteoarthritis who understands the uncertainty, has reviewed interactions, is already using core treatments, and prefers to test a relatively low-risk option. The goal should be symptom or function improvement-not cartilage regrowth. Someone with unexplained knee pain should first clarify the cause because meniscus injury, gout, inflammatory arthritis, infection, referred pain, and other conditions need different care.
        </p>
        <p>
          A trial is less reasonable when the product is being used instead of strengthening or medical assessment, when the price creates financial strain, when the label hides ingredient forms, or when the person takes warfarin or has another important interaction risk. It is also unhelpful to start three supplements, change shoes, begin a workout, and add a device on the same day. If symptoms improve, you will not know what helped.
        </p>

        <h2>Doses Commonly Studied</h2>
        <p>
          Frequently studied daily amounts are 1,500 mg glucosamine and 1,200 mg chondroitin. These numbers describe common research protocols; they are not a personalized prescription. Tablets may divide the amount across two or three doses, and combination labels can list a “proprietary blend” whose individual quantities are unclear. More is not proven to be better.
        </p>
        <p>
          Check whether the listed amount refers to the compound or an equivalent amount, how many capsules make one serving, and whether sodium or potassium is included in a stabilized salt. People limiting sodium, managing kidney disease, or taking multiple medicines should have the full label reviewed. Powders and gummies may add sugar or other ingredients that matter more than expected.
        </p>

        <h2>Safety, Side Effects, and Interactions</h2>
        <p>
          Commonly reported side effects include nausea, heartburn, diarrhea, constipation, headache, and skin reactions. Most trial participants tolerate the products, but “natural” does not mean interaction-free. Stop and seek advice for hives, facial swelling, trouble breathing, unusual bruising or bleeding, severe gastrointestinal symptoms, or a new reaction after starting.
        </p>
        <h3>Warfarin and bleeding risk</h3>
        <p>
          The most important interaction is warfarin. Safety reports have described increased international normalized ratio (INR) and bleeding in people taking glucosamine, often with chondroitin. Do not start, stop, or change the product without the clinician managing anticoagulation. The same caution is sensible if you have a bleeding disorder, take multiple medicines that affect clotting, or have surgery planned.
        </p>
        <h3>Blood glucose</h3>
        <p>
          Laboratory concerns about glucosamine and insulin resistance have not translated into a consistent major glucose effect in most human studies, but products and individuals differ. People with diabetes or prediabetes should tell their clinician, avoid assuming safety from a friend’s experience, and follow the monitoring plan they are given.
        </p>
        <h3>Shellfish source and allergy</h3>
        <p>
          Many glucosamine products are manufactured from crustacean shells, where the allergenic proteins are usually not the desired ingredient. That does not justify a universal “safe for shellfish allergy” promise. Severe allergy requires careful source verification, manufacturing information, and clinical advice. Vegan or fermentation-derived glucosamine is available, but cross-contact and label reliability still matter.
        </p>
        <h3>Pregnancy, breastfeeding, liver or kidney disease</h3>
        <p>
          Safety data are insufficient for pregnancy and breastfeeding. People with liver disease, kidney disease, asthma, glaucoma, or multiple chronic conditions should review the product before use. Supplements can also complicate preoperative medication lists, so disclose them well before a procedure.
        </p>

        <h2>How to Choose a Better-Quality Product</h2>
        <p>
          No certification proves that a supplement treats knee pain, but independent quality testing can reduce uncertainty about identity, contamination, and dose. Look for transparent ingredient forms and quantities rather than a proprietary blend. Third-party seals from recognized testing organizations can be useful, while remembering that the seal evaluates quality standards-not clinical effectiveness.
        </p>
        <ul>
          <li>Choose one or two active ingredients rather than a crowded “joint complex.”</li>
          <li>Confirm whether glucosamine is sulfate or hydrochloride and whether chondroitin is clearly quantified.</li>
          <li>Check the full daily serving, not only the amount per capsule.</li>
          <li>Avoid labels promising cartilage regrowth, cure, or reversal of arthritis.</li>
          <li>Prefer a manufacturer that provides lot testing, contact information, and an adverse-event process.</li>
          <li>Buy from a reliable retailer and inspect the seal, expiration date, and storage instructions.</li>
        </ul>

        <h2>How to Run an 8–12 Week Personal Trial</h2>
        <figure>
          <img src={trialPlan} alt="Four-step plan to check safety, choose one product, track outcomes for eight to twelve weeks, and decide whether to continue" loading="lazy" />
          <figcaption>A planned trial is more informative than taking a supplement indefinitely because it might be helping.</figcaption>
        </figure>
        <p>
          First, decide what success would look like before opening the bottle. “My knee feels better” is vulnerable to expectation and day-to-day fluctuation. Choose two or three outcomes tied to your life: pain during a standard walk, number of stairs tolerated, time needed to loosen up in the morning, sleep interruption, ability to stand from a chair, or use of an agreed rescue medicine. Rate them once or twice weekly under similar conditions.
        </p>
        <p>
          Second, keep the rest of the plan reasonably stable. Continue prescribed care and exercise, but avoid adding multiple optional interventions at once. Take the labeled dose consistently. Do not compensate for missed doses, and do not increase the amount to chase a quicker response.
        </p>
        <p>
          Third, review tolerance early and benefit later. Side effects or interactions can justify stopping immediately. A symptom benefit, if it occurs, is expected to be gradual rather than within hours. At 8–12 weeks, compare your tracked outcomes with baseline. A tiny change that does not alter function may not justify cost and pill burden.
        </p>
        <p>
          Finally, avoid the “maybe it is preventing worse pain” trap. That belief can keep someone taking an ineffective product for years because it cannot be tested. If there is no clear, repeatable improvement, stop and redirect attention to interventions with better evidence. If there is a worthwhile improvement, periodically reassess whether it persists and whether the product remains safe with any new medicines.
        </p>

        <h2>What Should Remain the Foundation of Knee Care?</h2>
        <p>
          Therapeutic exercise is not merely a lifestyle suggestion; it is a core osteoarthritis treatment. Progressive quadriceps, hip, calf, and balance work can improve function and confidence. Regular aerobic activity supports health and helps maintain the capacity to walk, climb, and participate in life. Weight loss can reduce symptoms for people with overweight or obesity, but should be approached without blame and paired with strength so the goal is function, not only a number on a scale.
        </p>
        <p>
          Topical anti-inflammatory medicine, oral medicine, injections, braces, walking aids, physical therapy, and surgery each have a place for selected people. Their risks and benefits depend on age, kidney and cardiovascular health, other medicines, severity, goals, and diagnosis. A supplement should never delay assessment of a hot swollen joint, locking, instability, inability to bear weight, major trauma, fever, or rapidly worsening pain.
        </p>

        <h2>How Glucosamine Fits With Heat, Massage, and Home Devices</h2>
        <p>
          Supplements and comfort devices answer different questions. Glucosamine is taken with the hope of a gradual systemic effect; heat and gentle massage can offer short-term sensory comfort or help someone prepare for movement. Neither should be described as rebuilding cartilage. A home routine can be useful when it supports exercise, sleep, and daily activity rather than replacing them.
        </p>
        <p>
          If a knee is newly swollen, red, unusually hot, or injured, do not cover the warning signs with prolonged heat or massage. Use our <Link to="/guides/heat-vs-ice-for-knees">heat versus ice guide</Link> for timing and safety, and seek assessment when symptoms are severe or unexplained. People exploring a convenient warmth, red-light, and vibration routine can review the <Link to="/product/knee-massager-smart-red-light-and-massage-therapy">FlexiKnee knee massager</Link>, but the device should be presented as a comfort tool-not as proof that a supplement or device treats the underlying disease.
        </p>

        <h2>Bottom Line</h2>
        <p>
          Glucosamine and chondroitin occupy an unusual middle ground: biologically plausible, widely used, generally tolerated by many people, and supported by some positive studies-but not reliably effective in the strongest overall evidence. That is why a careful answer is more useful than “yes” or “no.” They are not essential osteoarthritis treatments and should not be sold as cartilage rebuilders. A well-informed person who has checked interactions may still choose a time-limited, measurable trial of a clearly identified product.
        </p>
        <p>
          The decision should be judged by meaningful function, not by hope, label language, or the fact that a bottle has already been purchased. Keep exercise and evidence-based care at the center, stop an unhelpful trial, and bring the exact product to your clinician whenever safety is uncertain.
        </p>
      </>
    )
  }
};
