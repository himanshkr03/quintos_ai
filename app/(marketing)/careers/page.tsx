// File: E:\quintos_ai\app\(marketing)\careers\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import CareersList from "@/components/marketing/careers/CareersList";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Prospective Research Roles & Areas of Interest | Quintos AI",
  description: "Explore prospective research areas, fellowship tracks, and engineering directions at the Quintos AI laboratory.",
};

const benefits = [
  {
    title: "Scientific Autonomy",
    desc: "Freedom to explore high-impact fundamental research alongside applied engineering architectures.",
  },
  {
    title: "High-Performance Compute",
    desc: "Access to GPU/TPU compute infrastructure for model evaluation, prototyping, and algorithmic analysis.",
  },
  {
    title: "Open Dissemination",
    desc: "Encouragement to document findings, contribute to open-source code, and engage with scientific communities.",
  },
  {
    title: "Collaborative Culture",
    desc: "Flat, multidisciplinary team of mathematicians, engineers, and domain researchers.",
  },
  {
    title: "Competitive Compensation",
    desc: "Fair compensation models, performance incentives, and comprehensive healthcare coverage.",
  },
  {
    title: "Continuous Learning",
    desc: "Dedicated support for academic literature, technical conferences, and hardware experimentation.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Future Opportunities & Research Areas
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Explore Future Directions in{" "}
              <span className="gradient-ai">Artificial Intelligence</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Explore prospective research focus areas and engineering domains
              at Quintos AI. We welcome inquiries from scientists and systems
              engineers passionate about advanced computing.
            </p>
          </div>
        </Container>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            badge="Prospective Areas"
            title="Areas of Technical Interest & Fellowships"
            description="Illustrative domains and prospective fellowship tracks in our laboratory and systems engineering teams."
          />

          <div className="mt-10">
            <CareersList />
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50/70 py-20 border-t border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Laboratory Values"
            title="Why Research at Quintos AI"
            description="We combine open inquiry with deep computational resources."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:border-blue-300 transition-colors"
              >
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}