import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { trackEvent } from "@/hooks/use-google-analytics";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 route rendered in the client:", location.pathname);

    let referrerType = "direct";
    let referrerPath = "";
    if (document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.origin === window.location.origin) {
          referrerType = "internal";
          referrerPath = referrer.pathname;
        } else {
          referrerType = "external";
        }
      } catch {
        referrerType = "unknown";
      }
    }

    trackEvent("site_404_view", {
      missing_path: location.pathname,
      referrer_type: referrerType,
      referrer_path: referrerPath || undefined,
      interaction_type: "not_found",
    });
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | FlexiKnee</title>
        <meta
          name="description"
          content="The requested FlexiKnee page could not be found. Browse our knee comfort guides or return to the homepage."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex min-h-[68vh] items-center justify-center bg-slate-50 px-4 py-16">
        <section className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Error 404
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            This page could not be found
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            The address may be outdated or the page may have moved. Use one of the links below to continue.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Return to Home
            </Link>
            <Link
              to="/guides"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
            >
              Browse Knee Guides
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;
