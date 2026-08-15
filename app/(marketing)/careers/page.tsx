// File: E:\quintos_ai\app\(marketing)\careers\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Careers & Research Fellowships | Quintos AI",
  description: "Join our artificial intelligence laboratory to work on foundational LLMs, quantum ML, and biomedical vision systems.",
};

const openings = [
  {
    title: "AI Research Scientist — LLMs & Reasoning",
    location: "Mohali, India / Hybrid",
    type: "Full-Time",
    team: "Foundational AI Lab",
    description:
      "Investigate multi-step reasoning, latent chain-of-thought verification, and parameter-efficient model adaptation algorithms.",
  },
  {
    title: "Machine Learning Systems Engineer",
    location: "Remote / Mohali, India",
    type: "Full-Time",
    team: "Systems & Infrastructure",
    description:
      "Optimize low-latency CUDA kernels, INT4/FP8 quantization runtimes, and distributed model serving across heterogeneous GPU clusters.",
  },
  {
    title: "Biomedical Computer Vision Engineer",
    location: "Mohali, India",
    type: "Full-Time",
    team: "Perception & Diagnostics",
    description:
      "Engineer self-supervised vision models for high-resolution histology, 3D anatomical volumetric reconstruction, and optical defect detection.",
  },
  {
    title: "AI Research Fellow / Graduate Intern",
    location: "Remote / Mohali, India",
    type: "Fellowship / Intern",
    team: "Quantum & Agentic AI",
    description:
      "Collaborate on cutting-edge experimental projects in variational quantum machine learning, autonomous agent swarms, and mechanistic interpretability.",
  },
];

const benefits = [
  {
    title: "Scientific Autonomy",
    desc: "Freedom to pursue high-impact exploratory research alongside commercial applications.",
  },
  {
    title: "High-Performance Compute",
    desc: "Direct access to GPU/TPU compute infrastructure for fast iteration and benchmarking.",
  },
  {
    title: "Open Dissemination",
    desc: "Encouragement to publish findings, contribute to open-source, and present at top venues.",
  },
  {
    title: "Collaborative Culture",
    desc: "Flat, multidisciplinary team of mathematicians, engineers, and domain researchers.",
  },
  {
    title: "Competitive Compensation",
    desc: "Industry-leading salary, equity incentives, and comprehensive healthcare coverage.",
  },
  {
    title: "Continuous Learning",
    desc: "Generous budget for academic conferences, books, papers, and hardware resources.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Join the Research Lab
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Build the Future of{" "}
              <span className="gradient-ai">Artificial Intelligence</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Work alongside scientists and systems engineers solving complex
              challenges across foundational intelligence, quantum algorithms,
              and sovereign enterprise computing.
            </p>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-white">
        <Container>
          <SectionTitle
            badge="Open Opportunities"
            title="Current Positions & Fellowships"
            description="Explore full-time and fellowship roles in our laboratory and systems engineering teams."
          />

          <div className="mt-12 space-y-5 max-w-4xl mx-auto">
            {openings.map((job) => (
              <div
                key={job.title}
                className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-md bg-blue-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-700">
                        {job.team}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-medium text-slate-600">
                        {job.location}
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-700">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600 max-w-2xl">
                      {job.description}
                    </p>
                  </div>

                  <Button
                    href="/contact"
                    variant="primary"
                    size="sm"
                    className="shrink-0"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50/70 py-24 border-t border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Laboratory Culture"
            title="Why Research at Quintos AI"
            description="We combine open academic inquiry with deep computational resources."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
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