// File: E:\quintos_ai\components\marketing\portfolio\PortfolioAbout.tsx

import {
  Brain,
  ShieldCheck,
  MapPin,
  Sparkles,
  Terminal,
  Layers,
  Atom,
} from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { FOUNDER_DATA } from "@/data/portfolio";

export default function PortfolioAbout() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 to-white p-6 sm:p-8 shadow-sm overflow-hidden">
              {/* Subtle background tech grid */}
              <div className="absolute inset-0 tech-grid-dense opacity-40 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Researcher Monogram / Visual Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl tracking-wider shadow-md shadow-blue-600/20">
                      HR
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {FOUNDER_DATA.name}
                      </h2>
                      <p className="text-xs font-mono text-blue-600 font-medium">
                        {FOUNDER_DATA.role}
                      </p>
                    </div>
                  </div>

                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>

                {/* Profile Key Metadata */}
                <div className="space-y-3 text-xs">
                  <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3.5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                      Initiative & Laboratory
                    </span>
                    <strong className="text-slate-900 font-semibold block text-sm">
                      Quintos AI Labs
                    </strong>
                  </div>

                  <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3.5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                      Primary Focus Areas
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      AI Reasoning &bull; Quantum ML &bull; Medical 3D Vision &bull; Multi-Agent Swarms
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span>{FOUNDER_DATA.location}</span>
                    </div>
                    <span className="text-[10px] font-mono rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                      Active
                    </span>
                  </div>
                </div>

                {/* Cryptographic/Integrity Footer Note */}
                <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Sovereign Research & Deep-Tech Profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Biography & Research Focus */}
          <div className="lg:col-span-7 space-y-6">
            <SectionTitle
              badge="Researcher Biography"
              title="About the Researcher"
              description="Exploring foundational mathematical models, sovereign computational architectures, and intelligent systems."
              align="left"
              className="mb-6"
            />

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              {FOUNDER_DATA.bio.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <span>Foundational AI</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Investigating symbolic deductions, transformer dynamics, and mathematical verification gates.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Atom className="h-4 w-4 text-indigo-600" />
                  <span>Emerging Computing</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Exploring hybrid quantum-classical algorithms and low-power sovereign compute nodes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
