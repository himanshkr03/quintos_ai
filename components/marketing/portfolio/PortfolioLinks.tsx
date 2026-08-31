// File: E:\quintos_ai\components\marketing\portfolio\PortfolioLinks.tsx

import { ExternalLink, Globe, Code2, Users } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";
import { PROFESSIONAL_LINKS } from "@/data/portfolio";

export default function PortfolioLinks() {
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
    <section className="py-20 sm:py-24 bg-slate-50/50 border-b border-slate-100">
      <Container>
        <SectionTitle
          badge="Verified Channels"
          title="Professional Profiles & Links"
          description="Direct access to verified code repositories, professional networks, and research portfolios."
          align="center"
        />

        <div className="mx-auto max-w-4xl grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROFESSIONAL_LINKS.filter((item) => !!item.url).map((item) => {
            const Icon = getIcon(item.category);
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                  item.isPrimary
                    ? "border-blue-300 bg-white shadow-sm ring-2 ring-blue-600/10 hover:border-blue-400 hover:shadow-md"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
                aria-label={`Open ${item.founder}'s ${item.name} (opens in a new tab)`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        item.isPrimary
                          ? "bg-blue-50 text-blue-600 border border-blue-100"
                          : "bg-slate-50 text-slate-700 border border-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                    {item.founder}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <p className="mt-4 text-xs text-slate-500 font-mono truncate">
                  {item.label}
                </p>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
