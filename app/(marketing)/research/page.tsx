// File: E:\quintos_ai\app\(marketing)\research\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Research from "@/components/marketing/research/Research";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "AI Research Laboratory | Quintos AI",
  description: "Pioneering research across large-scale language models, quantum machine learning, biomedical vision, and mechanistic interpretability.",
};

const methodologySteps = [
  {
    step: "01",
    title: "Theoretical & Mathematical Formulation",
    description:
      "Formulating hypotheses grounded in information theory, probability bounds, and computational complexity before scaling models.",
  },
  {
    step: "02",
    title: "Empirical Benchmarking & Ablation",
    description:
      "Stress-testing architectures against standardized gold-standard benchmarks across out-of-distribution robustness and edge conditions.",
  },
  {
    step: "03",
    title: "Mechanistic Interpretability Audits",
    description:
      "Deconstructing internal activation circuits to verify exact decision pathways and eliminate deceptive alignment artifacts.",
  },
  {
    step: "04",
    title: "Translational Deployment & Open Tools",
    description:
      "Packaging verified algorithms into hardened open-source libraries, reproducible notebooks, and enterprise SDK components.",
  },
];

const collaborationAreas = [
  "Large Language Model Reasoning Chains",
  "Variational Quantum Circuit Optimization",
  "Cellular Pathology & Histology Segmentation",
  "Autonomous Agent Tool Verification",
  "Low-Precision (FP4/INT8) Quantization Kernels",
  "Mechanistic Circuit Attribution in Deep Nets",
  "Algorithmic Fairness & Bias Mitigation",
  "Cross-Modal Representation Learning",
];

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-700">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse" />
              Scientific Inquiries & Discoveries
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Fundamental AI Research &{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Algorithmic Frontiers
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Our research team investigates foundational questions across
              neural reasoning, quantum-classical machine learning, biomedical
              imaging, and deterministic AI safety.
            </p>
          </div>
        </Container>
      </section>

      {/* Research Program Component */}
      <Research />

      {/* Research Methodology */}
      <section className="bg-slate-50/70 py-24 border-y border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Methodology"
            title="A Rigorous Scientific Framework"
            description="How our laboratory discovers, validates, and refines new artificial intelligence paradigms."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodologySteps.map((step) => (
              <div
                key={step.step}
                className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-md"
              >
                <span className="font-mono text-2xl font-bold text-purple-600">
                  {step.step}
                </span>

                <h3 className="mt-4 text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Collaborative Research Focus Areas */}
      <section className="py-24 bg-white">
        <Container>
          <SectionTitle
            badge="Open Topics"
            title="Active Research Directions & Inquiries"
            description="Domains where we actively explore partnerships with academic institutions, laboratories, and technology organizations."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {collaborationAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-slate-200 bg-slate-50/80 px-5 py-2.5 text-xs font-mono font-medium text-slate-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/40 transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}