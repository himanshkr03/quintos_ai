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

const capabilities = [
  {
    icon: Brain,
    tag: "Foundational Reasoning",
    title: "Large-Scale Language & Reasoning",
    description:
      "Domain-adapted LLMs, Retrieval-Augmented Generation (RAG) architectures, and structured context reasoning for high-stakes enterprise decisions.",
  },
  {
    icon: Layers,
    tag: "Visual Intelligence",
    title: "Multimodal Perception & Computer Vision",
    description:
      "High-precision diagnostic imaging, object detection, zero-shot visual classification, and real-time visual inspection pipelines.",
  },
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
    title: "Enterprise Security & Privacy Architecture",
    description:
      "On-premise deployments, fine-grained role-based access control, cryptographic data isolation, and strictly zero data retention compliance.",
  },
  {
    icon: Cpu,
    tag: "Distributed Compute",
    title: "High-Performance ML Inference",
    description:
      "Low-latency model serving, quantization, kernel optimization, and autoscaling GPU/TPU cluster management.",
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
    <section className="bg-slate-50/70 py-24 border-b border-slate-200/60">
      <Container>
        <SectionTitle
          badge="Core Architectural Strengths"
          title="Engineered for Rigorous Scientific & Enterprise Demands"
          description="We combine algorithmic research, mathematically grounded architectures, and distributed systems engineering to build trustworthy AI systems."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;

            return (
              <div
                key={cap.title}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {cap.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
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