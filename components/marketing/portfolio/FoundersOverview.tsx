// File: E:\quintos_ai\components\marketing\portfolio\FoundersOverview.tsx

import {
  Brain,
  Code2,
  ShieldCheck,
  MapPin,
  ExternalLink,
  ArrowRight,
  Workflow,
  Sparkles,
  Layers,
} from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import { FOUNDERS } from "@/data/portfolio";

export default function FoundersOverview() {
  return (
    <section id="founding-team" className="py-20 sm:py-24 bg-white border-b border-slate-100 scroll-mt-12">
      <Container>
        <SectionTitle
          badge="Founding Team"
          title="Founders &amp; Leadership"
          description="Two founders combining exploratory AI research, deep-tech systems engineering, and executive operational execution."
          align="center"
        />

        {/* Two Equal Large Founder Profile Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.id}
              className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle background tech pattern */}
              <div className="absolute inset-0 tech-grid-dense opacity-40 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Header: Monogram, Identity & Role Hierarchy */}
                <div className="flex items-start justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white font-extrabold text-2xl tracking-wider shadow-md ${
                        founder.accentColor === "blue"
                          ? "bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-600/20"
                          : "bg-gradient-to-tr from-indigo-600 to-cyan-600 shadow-indigo-600/20"
                      }`}
                    >
                      {founder.initials}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {founder.primaryRole}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                        {founder.name}
                      </h2>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {founder.leadershipRoles.map((role) => (
                          <span
                            key={role}
                            className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold ${
                              founder.accentColor === "blue"
                                ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                                : "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                            }`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="flex h-3 w-3 relative mt-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>

                {/* Professional Positioning */}
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {founder.positioning}
                </p>

                {/* Core Areas */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Core Specializations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.coreAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-md border border-slate-200/80 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow-2xs"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Leadership Dimensions Highlights */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Leadership Dimensions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {founder.dimensions.map((dim) => (
                      <div
                        key={dim.title}
                        className="rounded-xl border border-slate-200/70 bg-white p-2.5 space-y-1"
                      >
                        <span className="text-[10px] font-mono font-bold text-slate-900 block truncate">
                          {dim.title}
                        </span>
                        <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                          {dim.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Links & Dedicated Portfolio Jump Action */}
              <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {founder.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:border-blue-300 hover:text-blue-600 transition-colors"
                      aria-label={`Open ${founder.name}'s ${link.name} (opens in new tab)`}
                    >
                      {link.category === "Code" ? (
                        <GitHubIcon className="h-3.5 w-3.5" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>

                <a
                  href={`#${founder.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition group"
                >
                  <span>View Dedicated Portfolio</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
