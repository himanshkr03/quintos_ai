// File: E:\quintos_ai\components\marketing\portfolio\PortfolioSelectedWork.tsx

import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Code2, ExternalLink } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { SELECTED_WORK } from "@/data/portfolio";

export default function PortfolioSelectedWork() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 border-b border-slate-100">
      <Container>
        <SectionTitle
          badge="Publications & Explorations"
          title="Selected Work"
          description="Technical research notes, architecture designs, and systems frameworks authored for Quintos AI."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {SELECTED_WORK.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Top Category & Domain */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
                    <FileText className="h-3 w-3" />
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.domain}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Link */}
              {item.link && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  {item.isExternal ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                    >
                      <span>Read Publication</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                    >
                      <span>Read Technical Note</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
