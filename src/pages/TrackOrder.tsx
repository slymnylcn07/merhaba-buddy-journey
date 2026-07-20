import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink, PackageSearch, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Kargo takibi: ParcelWILL'in (eski adiyla ParcelPanel) takip sayfasina,
 * vercel.json'daki rewrite tuneli uzerinden kendi domainimizde ulasiriz.
 * (Embed widget'i ParcelPanel sunucusunda 404 verdigi, sayfa da
 * frame-ancestors CSP'si nedeniyle iframe'e izin vermedigi icin
 * en saglam yol: markali form + ayni domainde tam sayfa takip.)
 */

const TRACKING_PATH = "/apps/parcelpanel";

const TrackOrder = () => {
  const [trackingInput, setTrackingInput] = useState("");

  // Eski linklerle gelen ?nums= parametresini dogrudan takip sayfasina tasi
  useEffect(() => {
    const nums = new URLSearchParams(window.location.search).get("nums");
    if (nums) {
      window.location.replace(`${TRACKING_PATH}?nums=${encodeURIComponent(nums)}`);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = trackingInput.trim();
    if (!value) return;
    window.location.href = `${TRACKING_PATH}?nums=${encodeURIComponent(value)}`;
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | FlexiKnee</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Track your FlexiKnee order shipment. Enter your tracking number to see real-time delivery updates and shipping information." />
        <link rel="canonical" href="https://flexi-knee.com/track-order" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/track-order" />
        <meta property="og:title" content="Track Your Order | FlexiKnee" />
        <meta property="og:description" content="Track your FlexiKnee order shipment with real-time delivery updates." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
      </Helmet>

      <div className="min-h-screen bg-white text-slate-950">
        <Header />

        <main>
          <section className="bg-white py-14 md:py-20">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Order tracking</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">
                Where's my order?
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Enter the tracking number from your shipping confirmation email. You can also look up your order with your order number and email on the tracking page.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <label htmlFor="tracking-input" className="mb-2 block text-sm font-medium text-slate-800">
                  Tracking number
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="tracking-input"
                      type="text"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      placeholder="e.g. YT2519921272086330"
                      className="w-full rounded-full border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
                    />
                  </div>
                  <Button type="submit" disabled={!trackingInput.trim()} className="h-11 shrink-0 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700">
                    <Search className="mr-1.5 h-4 w-4" />
                    Track
                  </Button>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Tip: your tracking number is in the shipping confirmation email we sent when your order left the warehouse.
                </p>
              </form>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                <p className="font-medium text-slate-900">Don't have your tracking number handy?</p>
                <p className="mt-1">
                  Open the full tracking page and search with your order number and email instead.
                </p>
                <a
                  href={TRACKING_PATH}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open tracking page
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-8 text-sm leading-7 text-slate-500">
                Delivery typically takes 6-7 business days to the US, UK, Europe, Australia and New Zealand, 7-8 business days to Canada, 5-6 business days to Singapore, and 10-18 business days to other supported regions. If tracking is outside the expected window, contact us with your order number and we'll investigate.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TrackOrder;
