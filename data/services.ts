import { Brain, Bot, Cpu, Eye, Database, Sparkles } from "lucide-react";
import { AIService } from "@/types";

export const services: AIService[] = [
  {
    icon: Brain,
    title: "Foundational & Generative AI",
    description:
      "Design, fine-tune, and deploy customized Large Language Models, specialized reasoning agents, and enterprise RAG systems.",
    tags: ["LLMs", "RAG", "Prompt Tuning", "LangChain"],
    href: "/services",
  },
  {
    icon: Eye,
    title: "Computer Vision & Medical AI",
    description:
      "High-precision visual computing for diagnostic imaging, automated defect inspection, OCR, and real-time spatial intelligence.",
    tags: ["Medical Imaging", "PyTorch", "Segmentation", "OCR"],
    href: "/services",
  },
  {
    icon: Cpu,
    title: "Machine Learning Engineering",
    description:
      "Scalable predictive modeling, reinforcement learning algorithms, distributed model training, and continuous automated retraining.",
    tags: ["MLOps", "Distributed Training", "CUDA", "TensorFlow"],
    href: "/services",
  },
  {
    icon: Bot,
    title: "Autonomous Agent Orchestration",
    description:
      "Multistep autonomous agents equipped with tool execution, memory systems, verification checkpoints, and API integration.",
    tags: ["Agentic AI", "Tool Calling", "Workflow Engine", "Multi-Agent"],
    href: "/services",
  },
  {
    icon: Database,
    title: "High-Throughput Data & Vector Infra",
    description:
      "Enterprise data ingestion pipelines, real-time vector embeddings, hybrid indexing, and sub-millisecond retrieval layers.",
    tags: ["Vector DB", "Qdrant", "ETL Pipelines", "PostgreSQL"],
    href: "/services",
  },
  {
    icon: Sparkles,
    title: "Enterprise AI Strategy & Architecture",
    description:
      "Translational AI roadmapping, algorithmic audits, sovereign infrastructure setup, and responsible governance frameworks.",
    tags: ["Architecture", "Sovereign AI", "Security", "Audits"],
    href: "/services",
  },
];