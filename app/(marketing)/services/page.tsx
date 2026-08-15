// File: E:\quintos_ai\app\(marketing)\services\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Services from "@/components/marketing/services/Services";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "AI Services & Solutions | Quintos AI",
  description: "Enterprise AI engineering & consultation: custom LLM adaptation, computer vision, autonomous agents, and high-performance ML inference.",
};

const process = [
  {
    step: "01",
    title: "Algorithmic Architecture & Audit",
    description:
      "We analyze technical feasibility, evaluate appropriate model families, and design data flow architectures with strict privacy boundaries.",
  },
  {
    step: "02",
    title: "Model Adaptation & Fine-Tuning",
    description:
      "Domain adaptation using parameter-efficient fine-tuning (PEFT), curated vector retrieval graphs, and deterministic output schema validation.",
  },
  {
    step: "03",
    title: "Sovereign Private Deployment",
    description:
      "Deployment into private enterprise clouds or air-gapped clusters with low-latency GPU acceleration and rigorous telemetry safeguards.",
  },
  {
    step: "04",
    title: "Continuous Observability & Alignment",
    description:
      "Automated drift detection, latency monitoring, continuous evaluation against gold standard test sets, and regression prevention.",
  },
];

const technologies = [
  { name: "PyTorch", category: "Core Framework" },
  { name: "CUDA & TensorRT", category: "GPU Acceleration" },
  { name: "Llama & Mistral", category: "Open Foundation Models" },
  { name: "Qdrant & FAISS", category: "Vector Retrieval" },
  { name: "FastAPI & gRPC", category: "High-Throughput APIs" },
  { name: "Docker & Kubernetes", category: "Orchestration" },
  { name: "LangChain / LlamaIndex", category: "Agentic Tooling" },
  { name: "vLLM & HuggingFace", category: "Serving Engine" },
];

const industries = [
  {
    title: "Biomedical & Healthcare",
    desc: "Diagnostic image segmentation, clinical document extraction, and pathology assistance.",
  },
  {
    title: "High-Tech Manufacturing",
    desc: "Automated optical defect inspection, edge telemetry, and predictive maintenance.",
  },
  {
    title: "Quantitative Finance",
    desc: "Algorithmic risk evaluation, structured financial text mining, and fraud pattern recognition.",
  },
  {
    title: "Scientific Research",
    desc: "Accelerated molecular simulation, literature synthesis, and complex data modeling.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Applied Intelligence Services
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Enterprise AI Engineering &{" "}
              <span className="gradient-ai">Custom Systems</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              We translate state-of-the-art machine learning breakthroughs into
              scalable, sovereign, and secure software platforms for forward-thinking
              enterprises and laboratories.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Component */}
      <Services />

      {/* Process */}
      <section className="bg-slate-50/70 py-20 border-y border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Engineering Methodology"
            title="A Rigorous Lifecycle from Hypothesis to Production"
            description="Our structured engineering methodology emphasizes predictable execution, verifiable evaluation, and complete data sovereignty."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-md"
              >
                <span className="font-mono text-xl font-bold text-blue-600">
                  {item.step}
                </span>

                <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology Stack Taxonomy */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            badge="Technical Taxonomy"
            title="Accelerated Frameworks & Model Architecture"
            description="We build on open-source, highly optimized computational frameworks designed for scale."
          />

          <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center hover:border-blue-300 transition-colors"
              >
                <span className="block font-semibold text-sm text-slate-900">
                  {tech.name}
                </span>
                <span className="mt-1 block font-mono text-[10px] text-slate-500">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Domain Impact */}
      <section className="bg-slate-50/70 py-20 border-t border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Applied Domains"
            title="High-Impact Technical Verticals"
            description="Focusing on technical domains where low latency, precision, and privacy boundaries are critical requirements."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:border-blue-400/60 transition-colors"
              >
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {industry.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {industry.desc}
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