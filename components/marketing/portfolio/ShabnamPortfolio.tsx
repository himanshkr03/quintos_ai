// File: E:\quintos_ai\components\marketing\portfolio\ShabnamPortfolio.tsx

import {
  Code2,
  Cpu,
  Workflow,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Terminal,
  Settings,
  Layers,
  Zap,
} from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import { FOUNDERS } from "@/data/portfolio";

export default function ShabnamPortfolio() {
  const shabnam = FOUNDERS[1];

  return (
    <section id="shabnam" className="py-20 sm:py-24 bg-white border-b border-slate-100 scroll-mt-12">
      <Container>
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-700 mb-3 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>FOUNDER PROFILE 02</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {shabnam.name}
              </h2>
              <p className="text-sm sm:text-base font-mono text-indigo-600 font-semibold mt-1">
                {shabnam.displayTitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {shabnam.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-colors"
                  aria-label={`Open Shabnam's ${link.name} on GitHub (opens in new tab)`}
                >
                  <GitHubIcon className="h-4 w-4" />
                  <span>{link.name}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 1. About the AI Developer & Executive Operations Lead */}
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 sm:p-8 shadow-xs mb-10">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
            About &bull; AI Engineering &amp; Executive Operations
          </h3>
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
            {shabnam.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* 2. Three Dimensions of Operations & Technical Leadership */}
        <div className="mb-14">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
            Technical &amp; Operational Dimensions
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {shabnam.dimensions.map((dim) => (
              <div
                key={dim.title}
                className="rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/40 to-white p-5 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 font-mono">
                    {dim.title}
                  </span>
                  <span className="rounded bg-white border border-indigo-200/70 px-2 py-0.5 text-[10px] font-mono text-indigo-600">
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

        {/* 3. AI Development Cards Grid */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {shabnam.focusAreasTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {shabnam.focusAreasDescription}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shabnam.focusAreas.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/80">
                      {item.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Engineering
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
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
