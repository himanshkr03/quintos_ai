import {
  Brain,
  Cpu,
  ShieldCheck,
  Workflow,
  Sparkles,
  Layers,
} from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

const primaryCapabilities = [
  {
    icon: Brain,
    tag: "Foundational Reasoning",
    title: "Large-Scale Language & Cognitive Reasoning",
    description:
      "Domain-adapted LLMs, Retrieval-Augmented Generation (RAG) architectures, and structured context reasoning for high-stakes enterprise decisions.",
    highlights: ["Latent chain-of-thought verification", "Sub-second hybrid search", "Zero hallucination guardrails"],
  },
  {
    icon: Layers,
    tag: "Visual Intelligence",
    title: "Multimodal Perception & Biomedical Vision",
    description:
      "High-precision diagnostic imaging, object detection, zero-shot visual classification, and real-time industrial inspection pipelines.",
    highlights: ["Sub-pixel edge segmentation", "DICOM clinical standard support", "Real-time edge device inference"],
  },
];

const secondaryCapabilities = [
  {
    icon: Workflow,
    tag: "Autonomous Systems",
    title: "Intelligent Agentic Workflows",
    description:
      "Self-directed AI agents capable of multistep tool interaction, automated planning, API orchestration, and deterministic self-correction.",
  },
  {
    icon: ShieldCheck,
    tag: "Data Sovereignty",
    title: "Zero-Trust Enterprise Security",
    description:
      "On-premise deployments, fine-grained role-based access control, cryptographic data isolation, and zero telemetry data retention.",
  },
  {
    icon: Cpu,
    tag: "Distributed Compute",
    title: "High-Performance ML Inference",
    description:
      "Low-latency model serving, FP4/INT8 quantization, custom CUDA kernel optimization, and autoscaling GPU/TPU cluster management.",
  },
  {
    icon: Sparkles,
    tag: "Emerging Paradigms",
    title: "Quantum-Classical Hybrid Computing",
    description:
      "Exploratory algorithms fusing quantum state optimization with classical deep learning for combinatorial and molecular simulations.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50/60 py-20 border-b border-slate-200/60">
      <Container>
        <SectionTitle
          badge="Core Architectural Strengths"
          title="Engineered for Rigorous Scientific & Enterprise Demands"
          description="We combine algorithmic research, mathematically grounded architectures, and distributed systems engineering to build trustworthy AI systems."
        />

        {/* Primary Flagship Capabilities (2 Columns) */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {primaryCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:border-blue-400/60 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2.5 py-0.5 rounded-md">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {cap.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {cap.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4 flex flex-wrap gap-2">
                  {cap.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Supporting Capabilities (4 Columns) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-slate-400">
                    {cap.tag}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {cap.title}
                </h4>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}