import { Shield, Eye, Scale, CheckCircle2 } from "lucide-react";

export interface EngineeringPrinciple {
  icon: typeof Shield;
  title: string;
  category: string;
  description: string;
}

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    icon: Scale,
    category: "Methodology",
    title: "Scientific Rigor & Reproducibility",
    description:
      "Every architecture and algorithmic approach is validated through peer-reviewed benchmarks, statistical significance testing, and transparent evaluation criteria.",
  },
  {
    icon: Shield,
    category: "Architecture",
    title: "Zero-Trust Data Sovereignty",
    description:
      "Enterprise systems operate with air-gapped guarantees, zero telemetry data leakage, and cryptographic safeguards ensuring proprietary knowledge stays private.",
  },
  {
    icon: Eye,
    category: "Interpretability",
    title: "Mechanistic Explainability",
    description:
      "We build inspection layers and attention maps into deep neural models so decision-makers can audit exact reasoning chains rather than trusting black boxes.",
  },
  {
    icon: CheckCircle2,
    category: "Reliability",
    title: "Deterministic Alignment & Verification",
    description:
      "Autonomous agents and generative pipelines enforce structured schema outputs, deterministic fallback loops, and safety boundary constraints.",
  },
];

// Deprecated alias maintained for backward compatibility
export const testimonials = [];