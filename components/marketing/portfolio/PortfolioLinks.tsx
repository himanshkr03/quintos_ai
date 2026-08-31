// File: E:\quintos_ai\components\marketing\portfolio\PortfolioLinks.tsx

import { ExternalLink, Globe, Code2, Users } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";
import { FOUNDERS } from "@/data/portfolio";

export default function PortfolioLinks() {
  const himanshu = FOUNDERS[0];
  const shabnam = FOUNDERS[1];

  const getIcon = (category: string) => {
    switch (category) {
      case "Portfolio":
        return Globe;
      case "Code":
        return GitHubIcon;
      case "Network":
        return LinkedInIcon;
      default:
        return ExternalLink;
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionTitle
          badge="Verified Profiles"
          title="Professional Profiles &amp; Networks"
          description="Direct access to verified code repositories, professional networks, and personal portfolios."
          align="center"
        />

        {/* Clean Two-Column Founder Links Section */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Column 1: Himanshu Rajak */}
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-sm shadow-blue-600/20">
                {himanshu.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {himanshu.name}
                </h3>
                <p className="text-xs font-mono text-blue-600 font-medium">
                  {himanshu.displayTitle}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {himanshu.links.map((link) => {
                const Icon = getIcon(link.category);
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-2xl border p-4 transition-all ${
                      link.isPrimary
                        ? "border-blue-200 bg-blue-50/40 hover:border-blue-300 hover:bg-blue-50/80 shadow-2xs"
                        : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
                    }`}
                    aria-label={`Open Himanshu's ${link.name} (opens in new tab)`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          link.isPrimary
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors block">
                          {link.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {link.label}
                        </span>
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Shabnam */}
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-600 text-white font-bold text-lg shadow-sm shadow-indigo-600/20">
                {shabnam.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {shabnam.name}
                </h3>
                <p className="text-xs font-mono text-indigo-600 font-medium">
                  {shabnam.displayTitle}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {shabnam.links.map((link) => {
                const Icon = getIcon(link.category);
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-indigo-200 bg-indigo-50/30 p-4 hover:border-indigo-300 hover:bg-indigo-50/70 transition-all shadow-2xs"
                    aria-label={`Open Shabnam's ${link.name} on GitHub (opens in new tab)`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors block">
                          {link.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {link.label}
                        </span>
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                );
              })}

              <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-center">
                <p className="text-[11px] font-mono text-slate-400">
                  Verified code repositories on GitHub
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
