// File: E:\quintos_ai\components\marketing\portfolio\PortfolioHero.tsx

import Link from "next/link";
import { ExternalLink, ArrowRight, Sparkles, Brain, Code2 } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import { FOUNDERS_DATA, PERSONAL_PORTFOLIO_URL } from "@/data/portfolio";

export default function PortfolioHero() {
  const himanshu = FOUNDERS_DATA[0];
  const shabnam = FOUNDERS_DATA[1];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-28 border-b border-slate-100">
      {/* Background scientific grids and subtle glow */}
      <div className="absolute inset-0 tech-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 shadow-2xs backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>FOUNDING TEAM & LEADERSHIP</span>
          </div>

          {/* Founders Names with Equal Visual Prominence */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            <span>{himanshu.name}</span>
            <span className="text-blue-600 mx-2 sm:mx-3 font-light">&amp;</span>
            <span>{shabnam.name}</span>
          </h1>

          {/* Positioning & Statement */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-base sm:text-xl font-medium text-slate-800 leading-snug">
              Building at the intersection of Artificial Intelligence, Emerging Computing, and Intelligent Systems.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Founders of Quintos AI &bull; AI Research &bull; Systems Architecture &bull; Deep-Tech Innovation
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={PERSONAL_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              aria-label="Explore external personal portfolio of Himanshu Rajak (opens in new tab)"
            >
              <Button
                variant="primary"
                size="md"
                rightIcon={<ExternalLink className="h-4 w-4" />}
                className="w-full sm:w-auto shadow-md shadow-blue-600/15"
              >
                Explore Himanshu&apos;s Portfolio
              </Button>
            </a>

            <a
              href={shabnam.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              aria-label="Explore Shabnam's verified GitHub profile (opens in new tab)"
            >
              <Button
                variant="secondary"
                size="md"
                leftIcon={<GitHubIcon className="h-4 w-4" />}
                rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
                className="w-full sm:w-auto border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-xs"
              >
                Shabnam on GitHub
              </Button>
            </a>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full sm:w-auto border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              >
                Explore Quintos AI
              </Button>
            </Link>
          </div>

          {/* Quick Domain Tags */}
          <div className="pt-8 border-t border-slate-100/80 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-500">
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              Artificial Intelligence
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              Systems Engineering
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              Quantum Machine Learning
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              Biomedical Perception
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
