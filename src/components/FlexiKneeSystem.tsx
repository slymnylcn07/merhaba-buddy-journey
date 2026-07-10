import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productSystem } from "@/data/product-system";

export const FlexiKneeSystem = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {productSystem.map((item, index) => (
        <Link
          key={item.name}
          to={item.href}
          className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70"
        >
          <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${item.accent}`}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-slate-200 bg-white/80 text-4xl font-semibold text-slate-300 shadow-sm">
                {index === 1 ? "S" : index === 2 ? "C" : "H"}
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600 shadow-sm">
              {item.status}
            </span>
          </div>

          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{item.label}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{item.name}</h3>
            <p className="mt-2 min-h-[52px] text-sm leading-6 text-slate-500">{item.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-950">{item.price}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:bg-blue-600">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
