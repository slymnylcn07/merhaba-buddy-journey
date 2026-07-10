import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productSystem } from "@/data/product-system";

export function FlexiKneeSystem({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
      {productSystem.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_90px_-50px_rgba(37,99,235,0.45)]"
        >
          <div className="relative overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-contain p-4 transition duration-500 group-hover:scale-105" loading="lazy" />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              {item.status}
            </span>
          </div>
          <div className="px-1 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{item.label}</p>
            <h3 className="mt-1 text-base font-semibold tracking-tight text-slate-950">{item.name}</h3>
            {!compact && <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>}
            <div className="mt-4 flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-950">{item.price}</span>
              <span className="inline-flex items-center gap-1 text-blue-600">
                Shop <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
