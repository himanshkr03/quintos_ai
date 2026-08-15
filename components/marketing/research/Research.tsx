import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { researchAreas } from "@/data/research";

export default function Research() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          badge="Scientific Inquiry & Research"
          title="Pioneering Foundations for Next-Gen Intelligence"
          description="Our research laboratory explores fundamental algorithmic breakthroughs across reasoning systems, quantum algorithms, biomedical diagnostics, and mechanistic interpretability."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-lg"
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors duration-300 group-hover:bg-purple-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-normal">
                    {area.description}
                  </p>

                  {/* Focus Topics */}
                  {area.focusTopics && (
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Core Directions
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {area.focusTopics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-md bg-purple-50/70 border border-purple-100 px-2 py-0.5 font-mono text-[11px] font-medium text-purple-700"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={area.href || "/research"}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <span>Read Research Program</span>
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