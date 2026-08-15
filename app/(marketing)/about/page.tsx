// File: E:\quintos_ai\app\(marketing)\about\page.tsx

import { Atom, Brain, Shield, Sparkles } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "About Us | Quintos AI",
  description: "Learn about Quintos AI, our research laboratory, foundational pillars, and mission to advance next-generation artificial intelligence.",
};

const foundations = [
  {
    icon: Brain,
    title: "Scientific Rigor",
    description:
      "Every model architecture and algorithm is grounded in empirical verification, statistical benchmarks, and repeatable methodology.",
  },
  {
    icon: Shield,
    title: "Sovereign Architecture",
    description:
      "We design AI that respects data privacy, operates within private enterprise boundaries, and ensures zero unauthorized telemetry.",
  },
  {
    icon: Atom,
    title: "Algorithmic Innovation",
    description:
      "Bridging classical machine learning with emerging quantum computing paradigms to solve computational bottlenecks.",
  },
  {
    icon: Sparkles,
    title: "Translational Impact",
    description:
      "Transforming complex laboratory breakthroughs into secure, reliable, and high-impact enterprise applications.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              About Quintos AI
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Advancing the Frontiers of{" "}
              <span className="gradient-ai">Artificial Intelligence</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Quintos AI is an artificial intelligence research and technology
              company. We operate at the intersection of fundamental machine
              learning research, autonomous agent architectures, biomedical
              perception, and quantum computing.
            </p>
          </div>
        </Container>
      </section>

      {/* Laboratory Vision & Origin */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <SectionTitle
                badge="Laboratory Origins"
                title="Bridging Foundational Research & Enterprise Systems"
                description="We were founded with a singular conviction: advanced artificial intelligence must be mathematically grounded, explainable, and engineered for high-stakes real-world domains."
                align="left"
              />

              <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  Modern AI development often sacrifices interpretability and
                  rigorous verification for rapid iteration. At Quintos AI, we
                  combine the deep curiosity of an academic laboratory with the
                  robustness of enterprise systems engineering.
                </p>
                <p>
                  Our multidisciplinary teams investigate Large Language Models,
                  high-precision computer vision, autonomous agent swarms, and
                  hybrid quantum algorithms—delivering sovereign intelligence
                  platforms to forward-looking organizations.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-8">
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Our Mission
                  </span>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    Sovereign, Interpretable Intelligence
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    To pioneer transformative AI breakthroughs and construct
                    secure, domain-adapted systems that empower human discovery
                    and enterprise efficiency.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Our Vision
                  </span>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    Global Scientific & Technical Leadership
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    To become a premier artificial intelligence laboratory known
                    for research integrity, algorithmic innovation, and responsible
                    technology stewardship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Foundational Pillars */}
      <section className="bg-slate-50/70 py-20 border-t border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Pillars of Excellence"
            title="Core Principles That Define Our Work"
            description="The methodological standards governing our research papers, model architectures, and enterprise solutions."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foundations.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}