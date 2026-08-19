import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Gift, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  NEWSLETTER_DISCOUNT_CODE,
  NEWSLETTER_DISCOUNT_PCT,
} from "@/lib/newsletter-config";

interface DiscountCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Bülten kaydından sonra açılan kutlama modalı:
 * büyük kupon kodu + kopyala butonu + mağazaya yönlendirme.
 */
export const DiscountCodeModal = ({ open, onOpenChange }: DiscountCodeModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(NEWSLETTER_DISCOUNT_CODE);
      setCopied(true);
      toast.success("Code copied!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy. Please select the code manually.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl border-slate-200 bg-white p-0 text-center">
        <div className="rounded-t-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.18),transparent_65%)] px-6 pb-2 pt-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Gift className="h-7 w-7 text-white" />
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            Welcome to the list!
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">
            Here is your {NEWSLETTER_DISCOUNT_PCT}% welcome code. We also sent it to your inbox for safekeeping.
          </p>
        </div>

        <div className="px-6 pb-8">
          <button
            type="button"
            onClick={handleCopy}
            className="group mx-auto mt-2 flex items-center gap-3 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 px-6 py-3.5 transition hover:border-blue-500"
            aria-label="Copy discount code"
          >
            <span className="text-xl font-black tracking-[0.2em] text-blue-700">
              {NEWSLETTER_DISCOUNT_CODE}
            </span>
            {copied ? (
              <Check className="h-5 w-5 text-emerald-600" />
            ) : (
              <Copy className="h-5 w-5 text-blue-400 transition group-hover:text-blue-600" />
            )}
          </button>
          <p className="mt-2 text-xs text-slate-400">Tap to copy, then add it in your cart or at checkout.</p>

          <Link
            to="/shop"
            onClick={() => onOpenChange(false)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Shop with {NEWSLETTER_DISCOUNT_PCT}% off
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
