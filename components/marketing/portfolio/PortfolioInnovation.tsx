// File: E:\quintos_ai\components\marketing\portfolio\PortfolioInnovation.tsx

import { Layers, CheckCircle2, ChevronRight } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { RESEARCH_DOMAINS } from "@/data/portfolio";

export default function PortfolioInnovation() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionTitle
          badge="Technological Trajectories"
          title="Research & Innovation"
          description="Investigating foundational problem spaces connected with the Quintos AI roadmap."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_DOMAINS.map((domain, index) => (
            <div
              key={domain.category}
              className={`rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between ${
                index === 0 ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-50/40 via-white to-slate-50/60 border-blue-200/70" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                    {domain.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Domain 0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                    {domain.focus}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Active Explorations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {domain.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200/80 px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow-2xs"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-500" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
