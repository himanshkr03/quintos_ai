// File: E:\quintos_ai\components\marketing\portfolio\HimanshuPortfolio.tsx

import {
  Brain,
  Atom,
  Sparkles,
  Network,
  Cpu,
  Workflow,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Globe,
  Layers,
  Compass,
} from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";
import { FOUNDERS } from "@/data/portfolio";

export default function HimanshuPortfolio() {
  const himanshu = FOUNDERS[0];

  return (
    <section id="himanshu-rajak" className="py-20 sm:py-24 bg-slate-50/50 border-b border-slate-100 scroll-mt-12">
      <Container>
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 mb-3 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>FOUNDER PROFILE 01</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {himanshu.name}
              </h2>
              <p className="text-sm sm:text-base font-mono text-blue-600 font-semibold mt-1">
                {himanshu.displayTitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {himanshu.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold shadow-2xs transition-colors ${
                    link.isPrimary
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/15"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  aria-label={`Open Himanshu's ${link.name} (opens in new tab)`}
                >
                  {link.category === "Code" ? (
                    <GitHubIcon className="h-3.5 w-3.5" />
                  ) : link.category === "Network" ? (
                    <LinkedInIcon className="h-3.5 w-3.5" />
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5" />
                  )}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 1. About the Researcher & Strategic Head */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs mb-10">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
            About &bull; Research Direction &amp; Leadership
          </h3>
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
            {himanshu.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* 2. Three Dimensions of Leadership */}
        <div className="mb-14">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
            Leadership Dimensions
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {himanshu.dimensions.map((dim) => (
              <div
                key={dim.title}
                className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/40 to-white p-5 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 font-mono">
                    {dim.title}
                  </span>
                  <span className="rounded bg-white border border-blue-200/70 px-2 py-0.5 text-[10px] font-mono text-blue-600">
                    {dim.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Research Interests Grid */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {himanshu.focusAreasTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {himanshu.focusAreasDescription}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {himanshu.focusAreas.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/80">
                      {item.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Domain
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-50 border border-slate-200/60 px-2 py-0.5 text-[10px] font-mono text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
