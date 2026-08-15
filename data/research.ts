import {
  Atom,
  Brain,
  Microscope,
  Cpu,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { ResearchArea } from "@/types";

export const researchAreas: ResearchArea[] = [
  {
    icon: Brain,
    title: "Large Language Models & Reasoning",
    description:
      "Investigating multi-step symbolic reasoning, recursive context verification, dynamic memory consolidation, and long-context transformer architectures.",
    focusTopics: [
      "Latent Chain-of-Thought",
      "Retrieval-Augmented Latents",
      "Model Quantization",
    ],
    href: "/research",
  },
  {
    icon: Atom,
    title: "Quantum Machine Learning",
    description:
      "Formulating hybrid quantum-classical algorithms, variational quantum circuits, and quantum tensor networks for complex combinatorial optimization.",
    focusTopics: [
      "Variational Eigensolvers",
      "Quantum Kernels",
      "Noise Mitigation in QML",
    ],
    href: "/research",
  },
  {
    icon: Microscope,
    title: "Biomedical & Multimodal Imaging",
    description:
      "Developing self-supervised vision models for high-resolution histology, 3D anatomical volumetric reconstruction, and zero-shot anomaly detection.",
    focusTopics: [
      "Pathology Segmentation",
      "Cross-Modal Diagnostics",
      "Uncertainty Estimation",
    ],
    href: "/research",
  },
  {
    icon: Sparkles,
    title: "Autonomous Agent Architectures",
    description:
      "Creating goal-oriented agent topologies featuring autonomous tool usage, recursive self-correction, environment feedback loops, and safety guardrails.",
    focusTopics: [
      "Multi-Agent Swarm Logic",
      "Symbolic Plan Verification",
      "Hierarchical Action Spaces",
    ],
    href: "/research",
  },
  {
    icon: Cpu,
    title: "Edge & Low-Power Neural Inference",
    description:
      "Researching weight pruning, post-training integer quantization, custom CUDA kernels, and neuromorphic edge hardware execution.",
    focusTopics: [
      "FP8 / INT4 Quantization",
      "On-Device Low Latency",
      "Resource-Constrained AI",
    ],
    href: "/research",
  },
  {
    icon: ShieldAlert,
    title: "Interpretable & Responsible AI",
    description:
      "Advancing mechanistic interpretability, feature attribution, algorithmic fairness guarantees, and cryptographic verification of neural outputs.",
    focusTopics: [
      "Mechanistic Circuit Analysis",
      "Adversarial Robustness",
      "Deterministic Alignment",
    ],
    href: "/research",
  },
];