import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { products } from "@/data/products";

export default function Products() {
  const getStageBadge = (stage?: string) => {
    switch (stage) {
      case "Enterprise Platform":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Platform Infrastructure":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Research Engine":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Applied Framework":
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <section className="bg-slate-50/60 py-20 border-b border-slate-200/60">
      <Container>
        <SectionTitle
          badge="Product & Platform Architectures"
          title="Engineered Intelligent Systems"
          description="Quintos AI develops modular, high-performance platforms designed for sovereign enterprise deployment, biomedical imaging, and autonomous automation."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    {product.stage && (
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider ${getStageBadge(
                          product.stage
                        )}`}
                      >
                        {product.stage}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono font-semibold text-blue-600 uppercase tracking-wide block mb-1">
                    {product.category}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {product.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    {product.description}
                  </p>

                  {/* Capabilities List */}
                  {product.capabilities && (
                    <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5">
                      {product.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2 text-xs text-slate-600"
                        >
                          <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={product.href || "/products"}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}