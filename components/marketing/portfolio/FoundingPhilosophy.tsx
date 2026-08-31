// File: E:\quintos_ai\components\marketing\portfolio\FoundingPhilosophy.tsx

import { Brain, Code2, Workflow } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { PHILOSOPHY_PILLARS } from "@/data/portfolio";

export default function FoundingPhilosophy() {
  return (
    <section className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background tech grid and dark glow */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-300 shadow-2xs backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>FOUNDING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Research. Engineering. Execution.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Quintos AI brings together research-driven exploration, technical AI development, and executive operational leadership under one unified founding vision.
          </p>
        </div>

        {/* Three Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {PHILOSOPHY_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.pillar}
                className="rounded-3xl border border-slate-800 bg-slate-850/80 p-6 sm:p-8 space-y-5 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg shadow-black/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-blue-400">
                      {item.pillar}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      {item.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{item.leader}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
