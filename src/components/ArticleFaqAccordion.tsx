type ArticleFaq = {
  question: string;
  answer: string;
};

type ArticleFaqAccordionProps = {
  faqs: ArticleFaq[];
  headingId: string;
};

const ArticleFaqAccordion = ({ faqs, headingId }: ArticleFaqAccordionProps) => (
  <section aria-labelledby={headingId} className="my-10">
    <h2 id={headingId}>Frequently Asked Questions</h2>
    <div className="mt-5 space-y-2">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left">
            <span className="text-base font-semibold leading-6 text-slate-950">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className="text-xl font-light leading-none text-emerald-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-slate-100 px-4 pb-4 pt-3">
            <p className="!m-0 !text-base !leading-7">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  </section>
);

export default ArticleFaqAccordion;
