import { Cookie, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { setCookieConsent, useAnalyticsConsent } from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  const { choice } = useAnalyticsConsent();
  if (choice !== null) return null;

  return (
    <section role="dialog" aria-label="Cookie choices" aria-live="polite" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 sm:flex"><Cookie className="h-5 w-5" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950"><ShieldCheck className="h-4 w-4 text-blue-600" /> Your privacy choices</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">We use essential storage to keep the shop working. With your permission, we also use analytics and marketing tools to understand visits and improve the site. Rejecting non-essential cookies does not affect shopping.</p>
          <Link to="/privacy-policy" className="mt-2 inline-flex text-sm font-semibold text-blue-600 hover:underline">Read our Privacy Policy</Link>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setCookieConsent("rejected")} className="h-11 rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">Reject non-essential</button>
            <button type="button" onClick={() => setCookieConsent("accepted")} className="h-11 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700">Accept optional cookies</button>
          </div>
        </div>
      </div>
    </section>
  );
}
