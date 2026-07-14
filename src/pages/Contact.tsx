import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Package, RotateCcw, HelpCircle, Send, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/support-config";

const TOPICS = [
  "Order & shipping",
  "Returns & refunds",
  "Product question",
  "Wholesale / partnership",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    topic: TOPICS[0],
    message: "",
    website: "", // honeypot, gerçek kullanıcılar görmez/doldurmaz
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name.trim() || !emailOk || form.message.trim().length < 10) {
      toast.error("Please fill in your name, a valid email, and a message of at least 10 characters.");
      return;
    }
    setIsSending(true);
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        toast.error(body.message || `Something went wrong. Please email us at ${SUPPORT_EMAIL}.`);
        return;
      }
      setSent(true);
    } catch {
      toast.error(`Could not send right now. Please email us directly at ${SUPPORT_EMAIL}.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | FlexiKnee</title>
        <meta
          name="description"
          content="Questions about your FlexiKnee order, shipping, returns, or products? Send us a message, we reply within one business day."
        />
        <link rel="canonical" href="https://flexi-knee.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/contact" />
        <meta property="og:title" content="Contact Us | FlexiKnee" />
        <meta property="og:description" content="Questions about your order, shipping, returns, or products? We reply within one business day." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "FlexiKnee Contact",
          url: "https://flexi-knee.com/contact",
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="bg-white py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Contact</p>
              <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                How can we help?
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                Send us a message and we'll get back to you within one business day. For order questions, including your order number speeds things up.
              </p>

              <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  {sent ? (
                    <div className="py-10 text-center">
                      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                        Message sent
                      </h2>
                      <p className="mx-auto mt-2 max-w-md text-slate-600">
                        Thanks, {form.name.split(" ")[0]}, we've received your message and will reply to {form.email} within one business day.
                      </p>
                      <Link
                        to="/"
                        className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
                      >
                        Back to home
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid gap-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-slate-800">
                            Your name
                          </label>
                          <input
                            id="c-name"
                            type="text"
                            value={form.name}
                            onChange={update("name")}
                            placeholder="Jane Smith"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-slate-800">
                            Email address
                          </label>
                          <input
                            id="c-email"
                            type="email"
                            value={form.email}
                            onChange={update("email")}
                            placeholder="jane@example.com"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="c-order" className="mb-1.5 block text-sm font-medium text-slate-800">
                            Order number <span className="font-normal text-slate-400">(optional)</span>
                          </label>
                          <input
                            id="c-order"
                            type="text"
                            value={form.orderNumber}
                            onChange={update("orderNumber")}
                            placeholder="#1234"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="c-topic" className="mb-1.5 block text-sm font-medium text-slate-800">
                            Topic
                          </label>
                          <select
                            id="c-topic"
                            value={form.topic}
                            onChange={update("topic")}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                          >
                            {TOPICS.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-slate-800">
                          Message
                        </label>
                        <textarea
                          id="c-message"
                          value={form.message}
                          onChange={update("message")}
                          rows={6}
                          placeholder="Tell us how we can help..."
                          className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                        />
                      </div>

                      <input
                        type="text"
                        value={form.website}
                        onChange={update("website")}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: "absolute", left: "-9999px", height: 0, width: 0 }}
                      />

                      <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
                      >
                        {isSending ? "Sending..." : "Send message"}
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>

                <div className="grid content-start gap-4">
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Mail className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-950">Email us directly</p>
                    <p className="mt-1 break-all text-sm text-slate-600">{SUPPORT_EMAIL}</p>
                  </a>

                  <Link
                    to="/track-order"
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Package className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-950">Where's my order?</p>
                    <p className="mt-1 text-sm text-slate-600">Track your shipment in real time.</p>
                  </Link>

                  <Link
                    to="/account#returns"
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <RotateCcw className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-950">Start a return</p>
                    <p className="mt-1 text-sm text-slate-600">30-day returns from delivery.</p>
                  </Link>

                  <Link
                    to="/why-flexiknee"
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-950">Common questions</p>
                    <p className="mt-1 text-sm text-slate-600">Shipping, devices, and daily use.</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
