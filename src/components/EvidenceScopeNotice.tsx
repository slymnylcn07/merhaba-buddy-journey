import { ShieldCheck } from "lucide-react";

interface EvidenceScopeNoticeProps {
  productMention?: boolean;
}

export default function EvidenceScopeNotice({ productMention = true }: EvidenceScopeNoticeProps) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm leading-6 text-slate-700">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" aria-hidden="true" />
        <div>
          <p className="font-semibold text-slate-950">Evidence and scope</p>
          <p className="mt-1">
            This guide summarizes general research and practical product considerations. Results vary by person, device settings, dose, and the cause of symptoms. It is not a diagnosis or a promise of treatment results.
            {productMention ? " FlexiKnee is a consumer comfort device and is not a substitute for professional medical care." : ""}
          </p>
        </div>
      </div>
    </aside>
  );
}
