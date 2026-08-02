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
    description:
      "Enterprise AI assistant powered by advanced language models.",
  },
  {
    icon: BrainCircuit,
    title: "Quintos Vision",
    description:
      "Computer vision platform for intelligent automation.",
  },
  {
    icon: ShieldCheck,
    title: "Quintos Secure AI",
    description:
      "Private AI infrastructure for secure enterprise deployments.",
  },
  {
    icon: Stethoscope,
    title: "Medical AI",
    description:
      "Healthcare AI platform supporting diagnosis and medical imaging.",
  },
  {
    icon: BookOpen,
    title: "AI Learning Platform",
    description:
      "Interactive learning ecosystem for AI, ML, and Generative AI.",
  },
];