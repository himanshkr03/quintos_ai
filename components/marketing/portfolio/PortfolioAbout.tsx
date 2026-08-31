// File: E:\quintos_ai\components\marketing\portfolio\PortfolioAbout.tsx

import {
  Brain,
  ShieldCheck,
  MapPin,
  Sparkles,
  Terminal,
  Layers,
  Atom,
  ExternalLink,
  Code2,
} from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import { FOUNDERS_DATA } from "@/data/portfolio";

export default function PortfolioAbout() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionTitle
          badge="Leadership & Research Foundations"
          title="About the Founding Team"
          description="Combining foundational mathematical inquiry with resilient AI systems engineering and sovereign architecture."
          align="center"
        />

        {/* Both Founders with Equal Visual Prominence */}
        <div className="grid gap-8 lg:grid-cols-2">
          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.id}
              className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 to-white p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle background tech grid */}
              <div className="absolute inset-0 tech-grid-dense opacity-40 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Founder Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white font-extrabold text-2xl tracking-wider shadow-md ${
                        founder.id === "himanshu-rajak"
                          ? "bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-600/20"
                          : "bg-gradient-to-tr from-indigo-600 to-cyan-600 shadow-indigo-600/20"
                      }`}
                    >
                      {founder.initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {founder.name}
                      </h3>
                      <p className="text-xs font-mono text-blue-600 font-medium mt-0.5">
                        {founder.role}
                      </p>
                    </div>
                  </div>

                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>

                {/* Key Focus & Location Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                      Role & Organization
                    </span>
                    <strong className="text-slate-900 font-semibold block">
                      Quintos AI Labs
                    </strong>
                  </div>

                  <div className="rounded-xl border border-slate-200/70 bg-white/80 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{founder.location}</span>
                    </div>
                    <span className="text-[10px] font-mono rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                      Active
                    </span>
                  </div>
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {founder.bio.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Verified Links & Actions */}
              <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {founder.portfolioUrl && (
                  <a
                    href={founder.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
                    aria-label={`Explore external portfolio of ${founder.name} (opens in new tab)`}
                  >
                    <span>Personal Portfolio</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                <a
                  href={founder.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-800 shadow-2xs hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  aria-label={`Open GitHub profile of ${founder.name} (opens in new tab)`}
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
