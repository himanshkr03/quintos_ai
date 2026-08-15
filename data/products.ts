import {
  Bot,
  BrainCircuit,
  ShieldCheck,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { AIProduct } from "@/types";

export const products: AIProduct[] = [
  {
    icon: Bot,
    title: "Quintos Assistant",
    category: "Enterprise Reasoning & Copilot",
    stage: "Enterprise Platform",
    description:
      "Context-aware enterprise AI assistant integrating domain data, structured documentation, and real-time tool orchestration.",
    capabilities: [
      "Retrieval-Augmented Generation",
      "Multi-turn agentic memory",
      "Private VPC & On-Prem hosting",
    ],
    href: "/products",
  },
  {
    icon: BrainCircuit,
    title: "Quintos Vision",
    category: "Spatial & Defect Intelligence",
    stage: "Applied Framework",
    description:
      "Industrial-grade visual AI platform engineered for automated optical inspection, medical scan segmentation, and scene understanding.",
    capabilities: [
      "Sub-pixel edge detection",
      "Zero-shot visual classification",
      "Real-time edge device inference",
    ],
    href: "/products",
  },
  {
    icon: ShieldCheck,
    title: "Quintos Secure AI",
    category: "Sovereign AI Infrastructure",
    stage: "Platform Infrastructure",
    description:
      "Zero-trust private AI runtime preventing data leakage, enforcing role-based model governance, and auditing inference logs.",
    capabilities: [
      "End-to-end tensor encryption",
      "Air-gapped deployment mode",
      "PII/Sensitive data redaction",
    ],
    href: "/products",
  },
  {
    icon: Stethoscope,
    title: "Medical AI Diagnostics Platform",
    category: "Biomedical Clinical Decision Support",
    stage: "Research Engine",
    description:
      "Deep learning diagnostic engine assisting clinical workflows through pathology analysis, MRI/CT segmentation, and anomaly detection.",
    capabilities: [
      "DICOM standard integration",
      "Multi-modal clinical correlation",
      "Explainable heatmaps & attention",
    ],
    href: "/products",
  },
  {
    icon: BookOpen,
    title: "AI Knowledge & Simulation Hub",
    category: "Adaptive AI Education & Experimentation",
    stage: "Applied Framework",
    description:
      "Interactive computational sandbox designed for training teams, validating algorithmic hypotheses, and benchmarking model families.",
    capabilities: [
      "Browser-based GPU notebooks",
      "Interactive weight visualization",
      "Pre-configured model benchmarks",
    ],
    href: "/products",
  },
];