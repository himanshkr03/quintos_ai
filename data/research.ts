import {
  Atom,
  Brain,
  Microscope,
  Cpu,
  Sparkles,
} from "lucide-react";

import { ResearchArea } from "@/types";

export const researchAreas: ResearchArea[] = [
  {
    icon: Brain,
    title: "Machine Learning",
    description:
      "Developing intelligent learning systems capable of solving real-world challenges.",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    description:
      "Research in LLMs, multimodal AI, and content generation.",
  },
  {
    icon: Atom,
    title: "Quantum AI",
    description:
      "Hybrid quantum-classical algorithms for future computing.",
  },
  {
    icon: Microscope,
    title: "Medical AI",
    description:
      "Research in disease prediction, medical imaging, and healthcare AI.",
  },
  {
    icon: Cpu,
    title: "Edge AI",
    description:
      "Efficient AI models optimized for edge devices and IoT.",
  },
];