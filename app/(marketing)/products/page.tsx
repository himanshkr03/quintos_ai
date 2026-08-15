// File: E:\quintos_ai\app\(marketing)\products\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Products from "@/components/marketing/products/Products";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "AI Products & Platforms | Quintos AI",
  description: "Explore the Quintos AI product ecosystem for enterprise automation, multimodal visual intelligence, and secure private AI infrastructure.",
};

const architectureLayers = [
  {
    layer: "Layer 01",
    title: "Application & Agent Orchestration",
    description:
      "Context-aware copilot interfaces, multi-turn memory buffers, deterministic tool execution, and role-based client applications.",
  },
  {
    layer: "Layer 02",
    title: "Foundational Model & Vision Engines",
    description:
      "Domain-tuned LLMs, fine-grained visual segmentation kernels, and multimodal alignment encoders.",
  },
  {
    layer: "Layer 03",
    title: "Vector & Knowledge Retrieval Matrix",
    description:
      "Sub-millisecond semantic search, hybrid sparse/dense retrieval, and continuous document embeddings.",
  },
  {
    layer: "Layer 04",
    title: "Sovereign Compute & Security Runtime",
    description:
      "Encrypted parameter storage, air-gapped on-premise execution, and zero external telemetry isolation.",
  },
];

const platformStandards = [
  "Zero-Telemetry Private VPC / On-Prem Deployments",
  "Standardized OpenAPI, gRPC, and Python SDK Interfaces",
  "Granular Role-Based Access Control & Key Management",
  "Sub-100ms Optimized TensorRT Inference Pipelines",
  "Automated Drift & Hallucination Guardrails",
  "Comprehensive Audit Logs & Latency Telemetry",
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Platform Architectures
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Intelligent Systems &{" "}
              <span className="gradient-ai">Modular AI Platforms</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Modular, high-throughput software architectures designed for
              sovereign enterprise deployment, precision biomedical imaging,
              and autonomous process automation.
            </p>
          </div>
        </Container>
      </section>

      {/* Products Component */}
      <Products />

      {/* System Architecture Layers */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            badge="Stack Architecture"
            title="Layered Intelligence Infrastructure"
            description="Our platforms follow a strict four-layer architecture ensuring security, speed, and modularity."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {architectureLayers.map((layer) => (
              <div
                key={layer.layer}
                className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-white hover:shadow-md"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                  {layer.layer}
                </span>

                <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                  {layer.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Platform Engineering Standards */}
      <section className="bg-slate-50/70 py-20 border-t border-slate-200/60">
        <Container>
          <SectionTitle
            badge="Engineering Standards"
            title="Enterprise Guarantees Built Into Every System"
            description="Production-grade foundations designed to satisfy strict compliance and high reliability."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformStandards.map((std) => (
              <div
                key={std}
                className="rounded-xl border border-slate-200/80 bg-white p-4.5 text-xs sm:text-sm font-medium text-slate-700 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                  <span>{std}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}