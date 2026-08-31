// File: E:\quintos_ai\components\marketing\portfolio\FounderHero.tsx

import Link from "next/link";
import { ArrowRight, Sparkles, Brain, Code2, Users, Compass } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import { FOUNDERS } from "@/data/portfolio";

export default function FounderHero() {
  const himanshu = FOUNDERS[0];
  const shabnam = FOUNDERS[1];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-28 border-b border-slate-100">
      {/* Background scientific grids and subtle ambient glows */}
      <div className="absolute inset-0 tech-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 shadow-2xs backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>FOUNDERS &amp; LEADERSHIP</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Building Quintos AI
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl font-medium text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Two founders combining research, artificial intelligence, engineering, and executive operations to build the next generation of intelligent systems.
          </p>

          {/* Quick Anchor Shortcuts to Founders */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#himanshu-rajak"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100/80 transition-colors shadow-2xs"
            >
              <Brain className="h-3.5 w-3.5 text-blue-600" />
              <span>Himanshu Rajak &bull; Research &amp; Operations</span>
            </a>

            <a
              href="#shabnam"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/60 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100/80 transition-colors shadow-2xs"
            >
              <Code2 className="h-3.5 w-3.5 text-indigo-600" />
              <span>Shabnam &bull; AI Development &amp; Operations</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a href="#founding-team" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full sm:w-auto shadow-md shadow-blue-600/15"
              >
                Meet the Founders
              </Button>
            </a>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              >
                Explore Quintos AI
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
