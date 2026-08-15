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
    stage: "In Development",
    description:
      "Context-aware enterprise AI assistant framework designed for integrating domain data, structured documentation, and tool orchestration.",
    capabilities: [
      "Retrieval-Augmented Generation",
      "Multi-turn agentic memory design",
      "Private VPC & On-Prem architecture",
    ],
    href: "/products",
  },
  {
    icon: BrainCircuit,
    title: "Quintos Vision",
    category: "Spatial & Defect Intelligence",
    stage: "Research Prototype",
    description:
      "Visual AI exploration engineered for automated optical inspection, medical scan segmentation, and spatial scene understanding.",
    capabilities: [
      "Sub-pixel edge detection algorithms",
      "Zero-shot visual classification",
      "Edge device inference optimization",
    ],
    href: "/products",
  },
  {
    icon: ShieldCheck,
    title: "Quintos Secure AI",
    category: "Sovereign AI Infrastructure",
    stage: "Architecture Concept",
    description:
      "Zero-trust private AI runtime specification designed to prevent data leakage, enforce model governance, and audit inference operations.",
    capabilities: [
      "End-to-end tensor encryption design",
      "Air-gapped deployment architecture",
      "PII/Sensitive data redaction layers",
    ],
    href: "/products",
  },
  {
    icon: Stethoscope,
    title: "Medical AI Diagnostics Platform",
    category: "Biomedical Clinical Decision Support",
    stage: "Research Direction",
    description:
      "Deep learning diagnostic research direction exploring pathology analysis, MRI/CT volumetric segmentation, and anomaly detection.",
    capabilities: [
      "DICOM standard integration",
      "Multi-modal clinical correlation",
      "Explainable attention map modeling",
    ],
    href: "/products",
  },
  {
    icon: BookOpen,
    title: "AI Knowledge & Simulation Hub",
    category: "Adaptive AI Education & Experimentation",
    stage: "Prototype Concept",
    description:
      "Interactive computational sandbox concept designed for training teams, validating algorithmic hypotheses, and exploring model families.",
    capabilities: [
      "Browser-based notebook concepts",
      "Interactive weight visualization",
      "Open model evaluation recipes",
    ],
    href: "/products",
  },
];