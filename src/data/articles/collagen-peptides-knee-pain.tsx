import { Link } from "react-router-dom";
import PremiumCTA from "@/components/PremiumCTA";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/thumb-knee-supplements.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const collagenPeptidesKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "collagen-peptides-knee-pain",
    title: "Collagen for Knee Pain: Do Collagen Peptides Actually Work?",
    subtitle: "Hydrolyzed collagen, collagen peptides, and type II collagen compared without the cartilage-repair hype",
    intro:
      "Collagen supplements are marketed as if the powder travels directly to a worn knee and rebuilds cartilage. Human biology is not that simple. Oral collagen is digested, different collagen products work through different proposed mechanisms, and the clinical evidence is encouraging in places but inconsistent overall. This guide explains collagen peptides, hydrolyzed collagen, marine collagen, and undenatured type II collagen; compares the doses used in trials; and shows how to run a fair test without confusing a supplement with treatment for the underlying cause of knee pain.",
    metaTitle: "Collagen for Knee Pain: Peptides, Type II & Evidence (2026)",
    metaDescription:
      "Do collagen peptides help knee pain? Compare hydrolyzed collagen, marine collagen and type II collagen, trial doses, safety, evidence and product quality.",
    heroImage,
    publishedDate: "July 28, 2026",
    lastUpdated: "July 28, 2026",
    nextSlug: "turmeric-curcumin-knee-pain",
    nextTitle: "Turmeric for Knee Pain: Curcumin Evidence, Dose, and Safety",
    seoTags:
      "collagen for knee pain, collagen peptides knee pain, collagen supplements, best collagen, collagen for joints, hydrolyzed collagen, type ii collagen, collagen type 2, marine collagen, collagen for knee repair, knee pain supplements, osteoarthritis knee, collagen powder, collagen tablets",
    faqs: [
      {
        question: "Do collagen peptides actually help knee pain?",
        answer:
          "Some randomized trials and pooled analyses report modest improvements in knee osteoarthritis pain and function, but results vary substantially between products and studies. Collagen peptides are not proven to rebuild lost cartilage, and a trial should be judged by a meaningful change in symptoms after eight to twelve weeks rather than by marketing claims."
      },
      {
        question: "What type of collagen is best for knee joints?",
        answer:
          "Hydrolyzed collagen peptides and undenatured type II collagen are the two forms most often studied for knee symptoms. They are not interchangeable. Peptides are usually taken in gram doses as a protein-derived powder, while undenatured type II collagen is commonly supplied in a much smaller standardized dose intended to act through oral immune tolerance."
      },
      {
        question: "How much collagen should I take for knee pain?",
        answer:
          "There is no universal dose. Studies of hydrolyzed collagen commonly use several grams per day, often around 5 to 10 grams, while many studies of undenatured type II collagen use about 40 mg daily. The label should identify the exact form and active amount rather than only listing a proprietary blend."
      },
      {
        question: "How long does collagen take to work for joints?",
        answer:
          "Most useful trials last at least eight to twelve weeks, and some continue for three to six months. A few days is too short to judge. Track one or two repeatable activities, such as stairs or a ten-minute walk, and stop if there is no worthwhile change after a consistent trial."
      },
      {
        question: "Can collagen rebuild knee cartilage?",
        answer:
          "No oral collagen supplement has been shown to reliably regrow clinically meaningful amounts of lost knee cartilage. Some products may modestly affect symptoms, but symptom improvement is not the same as structural repair. Exercise, weight management, and medical treatment remain more important."
      },
      {
        question: "Is marine collagen better than bovine collagen for knees?",
        answer:
          "Marine collagen is usually rich in type I collagen and is often chosen for dietary or sourcing preferences. It has not been established as superior for knee pain. Product form, dose, testing, trial quality, and consistency matter more than whether the raw material came from fish or cattle."
      },
      {
        question: "Can I take collagen with glucosamine or turmeric?",
        answer:
          "Many people combine them, but starting several supplements together makes it impossible to know which one helped or caused a side effect. Test one product at a time, review allergies and medications, and ask a clinician or pharmacist if you have health conditions or take regular medication."
      },
      {
        question: "Who should avoid collagen supplements?",
        answer:
          "People with allergies to the source material, such as fish, shellfish, chicken, or bovine products, should avoid matching products. Those who are pregnant, have significant kidney disease, follow medically restricted protein intake, or take multiple medicines should ask a clinician before use."
      }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick answer</p>
          <p className="mb-0 text-slate-700">
            <strong>Collagen may modestly reduce knee osteoarthritis symptoms for some people, but it is not a cartilage-rebuilding cure.</strong> The strongest signal comes from studies of hydrolyzed collagen peptides and undenatured type II collagen, yet products, doses, trial quality, and results differ. Choose one clearly labeled form, use the researched dose consistently for eight to twelve weeks, and judge it against a written baseline. Movement, strength, body-weight management, and appropriate medical care still do far more of the work.
          </p>
        </div>

        <p>
          Search interest for <strong>best collagen</strong>, <strong>collagen peptides</strong>, <strong>type II collagen</strong>, and <strong>collagen for knee repair</strong> has grown because the promise is unusually easy to understand: cartilage contains collagen, so eating collagen should replace what the knee has lost. That idea contains a small piece of truth and a much larger leap. Collagen is important to cartilage, tendons, bone, skin, and many other tissues, but a scoop of powder does not travel intact from the stomach to one painful joint.
        </p>
        <p>
          This distinction matters because people often buy the first tub labeled “joint collagen” without realizing that hydrolyzed collagen peptides, gelatin, marine collagen, and undenatured type II collagen are different materials used at dramatically different doses. The broader guide to the <Link to="/guides/best-supplements-for-knee-pain" className={linkClass}>best supplements for knee pain</Link> places collagen in the mixed-but-promising group. This deeper guide explains why the evidence looks positive in pooled analyses while individual trials can still be disappointing.
        </p>

        <h2>What Is Collagen, and What Happens When You Swallow It?</h2>
        <p>
          Collagen is a structural protein built from long chains of amino acids. Different tissues contain different mixtures of collagen types. Type I is abundant in skin, tendon, and bone. Type II is a major structural component of articular cartilage. Type III often appears alongside type I in skin and connective tissues. A product can therefore be “collagen” without being specifically designed around cartilage biology.
        </p>
        <p>
          Ordinary dietary protein and hydrolyzed collagen are broken down during digestion into amino acids and smaller peptides. Those building blocks enter the circulation and can be used wherever the body needs them. Some collagen-derived peptides may also act as biological signals in laboratory and animal models, but the human relevance and the amount reaching joint tissues remain areas of active study. The safe conclusion is that collagen supplies particular amino acids and may have signaling effects; the unsafe conclusion is that it directly patches cartilage.
        </p>
        <p>
          Undenatured type II collagen is different. It is processed to preserve parts of its three-dimensional structure and is used in tiny milligram doses. Its proposed mechanism is oral tolerance: immune tissue in the gut encounters type II collagen and may reduce inflammatory responses directed toward similar joint proteins. That theory is not the same as supplying grams of building material. It also explains why a 40 mg capsule cannot be compared gram for gram with a 10 g peptide powder.
        </p>

        <h2>Collagen Peptides vs. Type II Collagen vs. Marine Collagen</h2>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Product form</th>
                <th className="px-5 py-4 font-semibold">What it contains</th>
                <th className="px-5 py-4 font-semibold">Typical studied amount</th>
                <th className="px-5 py-4 font-semibold">Proposed role</th>
                <th className="px-5 py-4 font-semibold">Main limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Hydrolyzed collagen peptides</td>
                <td className="px-5 py-4 text-slate-600">Short collagen fragments, usually from bovine, porcine, fish, or chicken sources</td>
                <td className="px-5 py-4 text-slate-600">Often 5–10 g daily, depending on the product and trial</td>
                <td className="px-5 py-4 text-slate-600">Amino-acid supply plus possible peptide signaling</td>
                <td className="px-5 py-4 text-slate-600">Products are not standardized and trials use different preparations</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Undenatured type II collagen</td>
                <td className="px-5 py-4 text-slate-600">Structurally preserved type II collagen, commonly sourced from chicken cartilage</td>
                <td className="px-5 py-4 text-slate-600">Frequently about 40 mg daily</td>
                <td className="px-5 py-4 text-slate-600">Proposed oral immune tolerance rather than protein replacement</td>
                <td className="px-5 py-4 text-slate-600">Evidence base is smaller and several studies have industry involvement</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Marine collagen</td>
                <td className="px-5 py-4 text-slate-600">Usually hydrolyzed type I-rich collagen from fish skin or scales</td>
                <td className="px-5 py-4 text-slate-600">Often sold in gram doses</td>
                <td className="px-5 py-4 text-slate-600">Similar peptide and amino-acid rationale to other hydrolyzed collagen</td>
                <td className="px-5 py-4 text-slate-600">Not proven superior for knees; fish allergy and sourcing matter</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Gelatin</td>
                <td className="px-5 py-4 text-slate-600">Partially broken-down collagen that gels in liquid</td>
                <td className="px-5 py-4 text-slate-600">Variable and less often studied as a knee supplement</td>
                <td className="px-5 py-4 text-slate-600">Protein and amino-acid source</td>
                <td className="px-5 py-4 text-slate-600">Less convenient and not equivalent to a standardized clinical product</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The phrase <strong>collagen type 2</strong> on a label is not enough. A manufacturer should state whether the material is undenatured or hydrolyzed, how much active collagen is present, what species it came from, and whether the dose refers to the whole ingredient or only its active fraction. “Proprietary joint matrix, 500 mg” tells you almost nothing.
        </p>

        <h2>What Does the Research Actually Show?</h2>
        <p>
          An updated systematic review and meta-analysis published in 2024 pooled 11 randomized controlled trials involving 870 participants with knee osteoarthritis. Across the combined studies, collagen-based supplements were associated with improvements in pain and function compared with placebo. That is the encouraging part. The caution is that statistical heterogeneity was high, meaning the study results differed substantially from one another. Different collagen types, doses, durations, populations, outcome scales, and commercial products were grouped under one broad label.
        </p>
        <p>
          Reviews focused on undenatured type II collagen also report improvements in WOMAC pain and function scores in several trials, often over three to six months. A frequently cited multicenter trial used 40 mg daily for 180 days and found better symptom scores than placebo and a glucosamine–chondroitin combination. Other randomized trials have reported similar directions of benefit.
        </p>
        <p>
          However, positive evidence should be read beside negative evidence. A 2025 double-blind placebo-controlled trial of a combined hydrolyzed and undenatured collagen product found that both collagen and placebo groups improved, with no significant advantage for collagen after twelve weeks. The study was relatively small, but it is a useful reminder that pooled benefit does not guarantee a noticeable result for an individual person or a particular product.
        </p>
        <p>
          Funding and product specificity also matter. A meaningful share of supplement research is sponsored by ingredient manufacturers, and a trial of one branded extract does not automatically validate every powder or tablet sold online. The fairest conclusion is therefore neither “collagen works” nor “collagen is useless.” It is that certain preparations may produce a modest symptom benefit for some people, while the certainty and generalizability remain limited.
        </p>

        <PremiumCTA
          headline="Testing a supplement? Keep your daily routine separate and measurable"
          text="Collagen can take weeks to judge. A short FlexiKnee warmth, red-light, and vibration routine gives you a separate day-to-day comfort tool while you track whether the supplement itself changes stairs, walking, or morning stiffness."
        />

        <h2>Can Collagen Repair or Regrow Knee Cartilage?</h2>
        <p>
          The search term <strong>collagen for knee repair</strong> invites the most misleading promise in the category. Symptom studies measure pain, stiffness, walking ability, or questionnaires such as WOMAC. They do not show that a person has regenerated a meaningful layer of cartilage. Even when a blood or urine marker changes, that is not the same as restoring joint structure on imaging or reversing established osteoarthritis.
        </p>
        <p>
          Knee osteoarthritis affects the whole joint: cartilage, bone, synovium, ligaments, muscles, and pain-processing systems. The detailed <Link to="/guides/knee-arthritis-pain-guide" className={linkClass}>knee arthritis guide</Link> explains why reducing symptoms and changing joint structure are different goals. A supplement may make activity more tolerable, and that can be useful, but it should never delay strength work, weight management, or assessment of persistent swelling and instability.
        </p>
        <p>
          This also explains why a person with <Link to="/guides/knee-pain-after-exercise" className={linkClass}>knee pain after exercise</Link> should not assume they need cartilage powder. Delayed discomfort can come from workload, tendon sensitivity, muscle fatigue, kneecap tracking, or an abrupt training increase. The cause determines the useful response.
        </p>

        <h2>Who Is Most Reasonable to Consider a Trial?</h2>
        <p>
          The evidence is most relevant to adults with diagnosed or likely knee osteoarthritis and persistent but stable symptoms. A trial is more reasonable when the basics are already being addressed, the product cost is acceptable, there is no source allergy, and the person is willing to stop if no meaningful benefit appears.
        </p>
        <p>
          Collagen is less logical as a first response to a new injury, a locked knee, major swelling, fever, a hot red joint, or sudden inability to bear weight. Those situations need assessment rather than a supplement experiment. It is also not a substitute for a progressive plan to <Link to="/guides/how-to-strengthen-knees" className={linkClass}>strengthen the knees and hips</Link>, which has a much stronger role in improving function.
        </p>
        <p>
          Active adults may be drawn to collagen because of joint discomfort after running or gym work. Before spending money, review training load and choose tolerable conditioning from the comparison of <Link to="/guides/best-low-impact-cardio-knee-pain" className={linkClass}>walking, cycling, and swimming for knee pain</Link>. A lower-impact week can answer more about load sensitivity than a new powder can.
        </p>

        <h2>Dose, Timing, and How Long to Test It</h2>
        <p>
          There is no single “collagen dose” because the forms are different. Hydrolyzed collagen peptide trials commonly use gram quantities, often in the range of 5 to 10 grams per day. Undenatured type II collagen trials commonly use approximately 40 mg per day. More is not automatically better, and copying a dose from one form to another makes no biological sense.
        </p>
        <p>
          Timing appears less important than consistency. Collagen can be taken with or without food if the label permits. Vitamin C is needed for normal collagen synthesis, but most people with an adequate diet do not need a high-dose vitamin C add-on. Taking collagen before exercise is sometimes promoted, yet knee osteoarthritis evidence does not establish a special pre-workout window.
        </p>
        <p>
          Use an eight-to-twelve-week minimum trial unless the product or clinician gives a different evidence-based plan. Choose two repeatable measures: morning stiffness in minutes, discomfort on a standard flight of stairs, or the same ten-minute walk. Record baseline values for a week, keep other new interventions stable, and reassess. If the change is too small to matter in daily life, stopping is a successful decision because it prevents indefinite spending.
        </p>

        <h2>How to Choose a Collagen Supplement Without Buying Marketing</h2>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Label question</th>
                <th className="px-5 py-4 font-semibold">Useful answer</th>
                <th className="px-5 py-4 font-semibold">Red flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="px-5 py-4 font-semibold text-slate-950">Which collagen form?</td><td className="px-5 py-4 text-slate-600">Hydrolyzed peptides or clearly identified undenatured type II collagen</td><td className="px-5 py-4 text-slate-600">Only “joint collagen complex”</td></tr>
              <tr><td className="px-5 py-4 font-semibold text-slate-950">How much active ingredient?</td><td className="px-5 py-4 text-slate-600">Exact grams or milligrams per daily serving</td><td className="px-5 py-4 text-slate-600">Proprietary blend with no active dose</td></tr>
              <tr><td className="px-5 py-4 font-semibold text-slate-950">What is the animal source?</td><td className="px-5 py-4 text-slate-600">Fish, bovine, porcine, or chicken stated clearly</td><td className="px-5 py-4 text-slate-600">Source omitted despite allergy risk</td></tr>
              <tr><td className="px-5 py-4 font-semibold text-slate-950">Is quality independently checked?</td><td className="px-5 py-4 text-slate-600">Recognized third-party testing and batch traceability</td><td className="px-5 py-4 text-slate-600">Only influencer testimonials</td></tr>
              <tr><td className="px-5 py-4 font-semibold text-slate-950">What does it promise?</td><td className="px-5 py-4 text-slate-600">Possible support for symptoms over weeks</td><td className="px-5 py-4 text-slate-600">Regrows cartilage, cures arthritis, or works in days</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Powder versus tablets is mostly a dose and convenience question. Several grams of peptides fit easily into a scoop but may require many tablets. Undenatured type II collagen fits in a small capsule because the dose is much lower. Flavored powders can add sweeteners or calories; tablets can add binders. Neither format is inherently more effective.
        </p>
        <p>
          Marine collagen is not automatically cleaner or better absorbed, and bovine collagen is not automatically better for joints. Choose based on the studied preparation, verified dose, allergies, dietary preferences, and price per daily serving rather than an attractive source story.
        </p>

        <h2>Safety, Allergies, and Medication Questions</h2>
        <p>
          Collagen products are usually well tolerated, with possible fullness, unpleasant taste, nausea, or digestive upset. Source allergies are the clearest concern. Fish-derived collagen is inappropriate for someone with a relevant fish allergy; chicken-derived type II collagen may be unsuitable for someone with a chicken allergy. Cross-contact information matters when allergies are severe.
        </p>
        <p>
          People with significant kidney disease or a medically prescribed protein restriction should ask their clinician whether gram-dose protein supplements fit their plan. Pregnancy and breastfeeding data for specialized joint products are limited. Anyone taking multiple medicines should review the full ingredient list because collagen blends often include herbs, minerals, glucosamine, or high-dose vitamins that create the real interaction risk.
        </p>
        <p>
          If you are also considering <Link to="/guides/glucosamine-chondroitin-knee-pain" className={linkClass}>glucosamine and chondroitin</Link>, do not start both on the same day. Their evidence and safety questions differ. Test one variable at a time so the result means something.
        </p>

        <h2>Collagen Compared With Other Knee Supplements</h2>
        <p>
          Collagen sits in a similar practical category to glucosamine: plausible mechanisms, mixed trials, generally modest expectations, and a need for a time-limited test. Curcumin has a more direct anti-inflammatory rationale and a reasonably consistent symptom signal in meta-analyses, but formulation and medication interactions are more complicated. Our detailed <Link to="/guides/turmeric-curcumin-knee-pain" className={linkClass}>turmeric and curcumin guide</Link> separates culinary turmeric from standardized extracts.
        </p>
        <p>
          Hyaluronic acid is another frequently searched option, but oral products and joint injections are completely different interventions. Do not infer evidence for an injection from a capsule label. The same rule applies to “collagen plus hyaluronic acid” beauty blends: combining popular ingredients does not prove the blend was tested.
        </p>
        <p>
          The largest improvements usually come from the unmarketable basics. Footwear and load distribution can matter, especially when overpronation changes the line of force through the leg; the guide to <Link to="/guides/best-insoles-for-knee-pain-2026" className={linkClass}>insoles for knee pain</Link> explains when support is worth testing. Body weight also changes joint load with every step, as discussed in <Link to="/guides/weight-affects-knee-pain" className={linkClass}>how weight affects knee pain</Link>.
        </p>


        <h2>Does Eating More Protein Do the Same Thing?</h2>
        <p>
          Collagen is an incomplete protein because it is low in several essential amino acids and contains no meaningful tryptophan. It should not replace the high-quality dietary protein needed to maintain quadriceps, hip, and calf muscle. For many adults with knee pain, improving total protein intake and progressive strength training is more likely to change function than switching between collagen brands.
        </p>
        <p>
          That does not mean collagen and ordinary protein are interchangeable in research. Collagen peptides have a distinctive amino-acid profile rich in glycine, proline, and hydroxyproline, and some studies investigate peptide signaling rather than only total protein. The practical hierarchy remains clear: meet overall nutrition needs first, then consider collagen as an optional targeted trial. A powder added to an otherwise low-protein diet should not create confidence that muscle support has been solved.
        </p>
        <p>
          Older adults should be especially careful with this distinction because maintaining muscle is central to balance, stair control, and joint loading. A collagen serving can count toward daily protein, but it should sit beside complete protein sources rather than displacing them. Anyone with a medically restricted diet should ask a dietitian or clinician how the supplement fits their individual target.
        </p>
        <h2>A Practical Twelve-Week Collagen Trial</h2>
        <ol>
          <li><strong>Week 0:</strong> Choose one clearly labeled form and write down two symptom measures.</li>
          <li><strong>Weeks 1–4:</strong> Take the researched daily amount consistently and note side effects without expecting an immediate result.</li>
          <li><strong>Weeks 5–8:</strong> Compare the same stairs, walk, or morning-stiffness measure with baseline.</li>
          <li><strong>Weeks 9–12:</strong> Decide whether the change is large enough to notice and worth the ongoing cost.</li>
          <li><strong>After week 12:</strong> Stop if there is no meaningful benefit. If there is a clear benefit, periodically reassess rather than assuming lifelong use.</li>
        </ol>
        <p>
          Keep everyday symptom tools stable during the test. If warmth helps stiffness, follow the safety distinctions in <Link to="/guides/heat-vs-ice-for-knees" className={linkClass}>heat versus ice for knees</Link>. A repeatable <Link to="/guides/daily-knee-care-routine" className={linkClass}>daily knee care routine</Link> also makes it easier to distinguish a supplement effect from random good and bad days.
        </p>

        <h2>The Bottom Line</h2>
        <p>
          Collagen peptides and undenatured type II collagen are not nonsense, but they are not the direct cartilage repair products advertisements imply. Pooled research suggests a possible modest improvement in knee osteoarthritis pain and function, while individual trials remain inconsistent and product-specific. Hydrolyzed peptides and undenatured type II collagen are different interventions with different doses and proposed mechanisms. Marine collagen is a source choice, not a proven superior knee treatment.
        </p>
        <p>
          A sensible decision is simple: choose a transparent product, avoid miracle claims, test one form at the studied dose for eight to twelve weeks, and measure a real activity. Continue only if the improvement is meaningful to you. Collagen belongs at the small top of a knee plan whose foundation remains strength, tolerable movement, healthy load management, and appropriate diagnosis.
        </p>
      </>
    ),
    sources: [
      {
        title: "Effect of collagen supplementation on knee osteoarthritis: an updated systematic review and meta-analysis of randomised controlled trials",
        publisher: "Clinical and Experimental Rheumatology via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/39212129/"
      },
      {
        title: "Efficacy of combined undenatured type II collagen and hydrolysed collagen supplementation in knee osteoarthritis: a randomised controlled trial",
        publisher: "Scientific Reports via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/40897777/"
      },
      {
        title: "Efficacy of undenatured collagen in knee osteoarthritis: review of the literature with limited meta-analysis",
        publisher: "American Journal of Translational Research via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/37854210/"
      },
      {
        title: "Efficacy and tolerability of an undenatured type II collagen supplement in modulating knee osteoarthritis symptoms",
        publisher: "Nutrition Journal via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/26822714/"
      },
      {
        title: "Efficacy and safety of native type II collagen in modulating knee osteoarthritis symptoms",
        publisher: "Journal of Experimental Orthopaedics via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/36562843/"
      },
      {
        title: "Osteoarthritis Symptoms, Causes, and Risk Factors",
        publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
        url: "https://www.niams.nih.gov/health-topics/osteoarthritis"
      },
      {
        title: "2019 Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee",
        publisher: "American College of Rheumatology and Arthritis Foundation",
        url: "https://rheumatology.org/osteoarthritis-guideline"
      }
    ]
  }
};
