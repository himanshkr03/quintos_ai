// File: E:\quintos_ai\components\marketing\portfolio\PortfolioHero.tsx

import Link from "next/link";
import { ExternalLink, ArrowRight, Sparkles, Brain, Code2 } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import { FOUNDER_DATA, PERSONAL_PORTFOLIO_URL } from "@/data/portfolio";

export default function PortfolioHero() {
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
            <span>{FOUNDER_DATA.eyebrow}</span>
          </div>

          {/* Founder Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            {FOUNDER_DATA.name}
          </h1>

          {/* Positioning & Statement */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-base sm:text-xl font-medium text-slate-800 leading-snug">
              {FOUNDER_DATA.headline}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {FOUNDER_DATA.positioning}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
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
                Explore My Portfolio
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
              Quantum Machine Learning
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              Biomedical Vision
            </span>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              Autonomous Systems
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
