import { Brain, Bot, Cpu, Eye, Database, Sparkles } from "lucide-react";

import { AIService } from "@/types";

export const services: AIService[] = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Custom AI solutions that help businesses automate processes and make smarter decisions.",
  },
  {
    icon: Bot,
    title: "Generative AI",
    description:
      "Build intelligent chatbots, copilots, and content generation systems powered by LLMs.",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    description:
      "Develop predictive models using supervised, unsupervised, and reinforcement learning.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description:
      "Image classification, object detection, OCR, and medical image analysis solutions.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Scalable AI data pipelines, vector databases, and enterprise analytics.",
  },
  {
    icon: Sparkles,
    title: "AI Consulting",
    description:
      "Enterprise AI strategy, deployment, optimization, and digital transformation.",
  },
];