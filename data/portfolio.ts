// File: E:\quintos_ai\data\portfolio.ts

import {
  Brain,
  Atom,
  Sparkles,
  Microscope,
  Cpu,
  Layers,
  Code2,
  Activity,
  Network,
  Binary,
  LucideIcon,
} from "lucide-react";

/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: EXTERNAL PERSONAL PORTFOLIO URL
 * ============================================================================
 * If you have a custom domain/URL (e.g., https://himanshurajak.com),
 * update this constant or set NEXT_PUBLIC_PERSONAL_PORTFOLIO_URL in .env.local.
 */
export const PERSONAL_PORTFOLIO_URL =
  process.env.NEXT_PUBLIC_PERSONAL_PORTFOLIO_URL ||
  "https://github.com/himanshkr03";

export interface FounderProfile {
  name: string;
  role: string;
  eyebrow: string;
  positioning: string;
  location: string;
  headline: string;
  bio: string[];
}

export interface ResearchInterest {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface ResearchDomain {
  category: string;
  focus: string;
  description: string;
  topics: string[];
}

export interface SelectedWorkItem {
  id: string;
  title: string;
  category: "Research Note" | "AI System" | "Algorithmic Model" | "Framework";
  description: string;
  domain: string;
  link?: string;
  isExternal?: boolean;
}

export interface ProfessionalLink {
  name: string;
  label: string;
  url: string;
  isPrimary?: boolean;
  category: "Portfolio" | "Code" | "Network" | "Research";
}

export const FOUNDER_DATA: FounderProfile = {
  name: "HIMANSHU RAJAK",
  role: "Founder & AI Researcher",
  eyebrow: "FOUNDER & RESEARCHER",
  positioning: "Founder • AI Researcher • Technology Innovator",
  location: "Mohali, Punjab, India",
  headline:
    "Building at the intersection of Artificial Intelligence, Emerging Computing, and Intelligent Systems.",
  bio: [
    "Himanshu Rajak is the founder and lead researcher behind Quintos AI, driving foundational exploration into machine learning architectures, automated reasoning systems, and high-precision perception.",
    "His work focuses on bridging theoretical computational mathematics with practical sovereign intelligence systems—investigating how latent-space reasoning, variational quantum algorithms, and multimodal vision models can be engineered for high-reliability real-world applications.",
    "Through Quintos AI, Himanshu is dedicated to building an open, mathematically verifiable, and privacy-first research ecosystem that advances the next generation of artificial intelligence.",
  ],
};

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    number: "01",
    title: "Artificial Intelligence",
    description:
      "Deep neural networks, transformer dynamics, multi-step symbolic reasoning, and latent representation learning with mathematical verification bounds.",
    icon: Brain,
    tags: ["LLM Reasoning", "Latent Dynamics", "Neural Verification"],
  },
  {
    number: "02",
    title: "Quantum Machine Learning",
    description:
      "Formulating hybrid quantum-classical heuristics, variational quantum eigensolvers (VQE), and quantum kernel methods for high-dimensional state spaces.",
    icon: Atom,
    tags: ["Variational Circuits", "Quantum Kernels", "NISQ Algorithms"],
  },
  {
    number: "03",
    title: "Artificial General Intelligence",
    description:
      "Investigating foundational cognitive architectures, test-time compute search, recursive error correction, and cross-domain generalization paradigms.",
    icon: Sparkles,
    tags: ["AGI Architectures", "Search & Planning", "Autonomous Cognition"],
  },
  {
    number: "04",
    title: "Healthcare AI",
    description:
      "Volumetric 3D computer vision, multi-organ anomaly segmentation, self-supervised biomedical representation learning, and clinical decision support.",
    icon: Microscope,
    tags: ["3D MRI/CT Vision", "Pathology AI", "Uncertainty Estimation"],
  },
  {
    number: "05",
    title: "Intelligent Systems",
    description:
      "Autonomous multi-agent orchestration, dynamic tool synthesis, goal decomposition, and deterministic safety guardrails for mission-critical deployments.",
    icon: Network,
    tags: ["Agent Swarms", "Tool Synthesis", "Execution Guardrails"],
  },
  {
    number: "06",
    title: "Emerging Computing",
    description:
      "Low-latency tensor kernel engineering, extreme integer quantization (INT4/FP8), and hardware-aware neural acceleration across sovereign clusters.",
    icon: Cpu,
    tags: ["Edge Inference", "Quantization", "Sovereign Compute"],
  },
];

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    category: "AI Research",
    focus: "Latent Reasoning & Neural Convergence",
    description:
      "Exploration of internal hidden-state trajectories in transformer architectures to evaluate monotonic convergence during multi-step deductive problem solving.",
    topics: [
      "Latent Chain-of-Thought",
      "Dynamic Memory Routing",
      "Mechanistic Interpretability",
    ],
  },
  {
    category: "Quantum Computing",
    focus: "Hybrid Quantum Algorithms",
    description:
      "Investigation of parameterized quantum circuits and error-mitigated variational ansatzes for molecular simulation and complex combinatorial graph problems.",
    topics: [
      "Variational Eigensolvers",
      "Parameterized Circuits",
      "Quantum State Tomography",
    ],
  },
  {
    category: "Intelligent Systems",
    focus: "Autonomous Agent Swarms",
    description:
      "Designing decentralized agent topologies with hierarchical task allocation, runtime observation loops, and deterministic constraint validation.",
    topics: [
      "Hierarchical Swarms",
      "Goal Decomposition",
      "Runtime Safety Verifiers",
    ],
  },
  {
    category: "Healthcare Technology",
    focus: "Volumetric Coordinate Perception",
    description:
      "Self-supervised 3D vision models engineered for sub-millimeter lesion localization, multi-planar reconstruction, and organ boundary demarcation.",
    topics: [
      "3D Volumetric Segmentation",
      "Multi-Modal Alignment",
      "Zero-Shot Anomaly Detection",
    ],
  },
  {
    category: "Experimental AI Systems",
    focus: "Test-Time Compute & Optimization",
    description:
      "Benchmarking adaptive test-time compute allocation and algorithmic verification gates to enhance reasoning reliability without proportional parameter scaling.",
    topics: [
      "Test-Time Search",
      "Algorithmic Verification",
      "Resource-Constrained Serving",
    ],
  },
];

export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    id: "work-1",
    title: "Latent Chain-of-Thought Reasoning Bounds",
    category: "Research Note",
    domain: "Theoretical AI & Reasoning",
    description:
      "Theoretical formulation and empirical analysis of internal hidden-state reasoning trajectories in transformer models during multi-step symbolic tasks.",
    link: "/blog/latent-chain-of-thought-reasoning-bounds",
    isExternal: false,
  },
  {
    id: "work-2",
    title: "Quintos Bio-Vision 3D Perception Framework",
    category: "AI System",
    domain: "Medical AI & Computer Vision",
    description:
      "Volumetric coordinate perception model for sub-millimeter anomaly detection and anatomical segmentation across dense 3D MRI and CT imaging volumes.",
    link: "/blog/sub-millimeter-anomaly-detection-3d-mri",
    isExternal: false,
  },
  {
    id: "work-3",
    title: "Variational Quantum Eigensolvers on NISQ Hardware",
    category: "Research Note",
    domain: "Quantum Machine Learning",
    description:
      "Exploring zero-noise extrapolation and hardware-efficient ansatz designs for molecular ground state estimation on noisy intermediate-scale quantum devices.",
    link: "/blog/variational-eigensolvers-nisq-quantum-hardware",
    isExternal: false,
  },
  {
    id: "work-4",
    title: "Autonomous Multi-Agent Swarm Orchestration",
    category: "Framework",
    domain: "Intelligent Systems",
    description:
      "A decentralized orchestration framework for multi-agent reasoning, hierarchical action execution, and dynamic environment self-correction.",
    link: "/blog/autonomous-multi-agent-swarms",
    isExternal: false,
  },
];

export const PROFESSIONAL_LINKS: ProfessionalLink[] = [
  {
    name: "Personal Portfolio",
    label: "Explore Personal Portfolio",
    url: PERSONAL_PORTFOLIO_URL,
    isPrimary: true,
    category: "Portfolio",
  },
  {
    name: "GitHub",
    label: "github.com/himanshkr03",
    url: "https://github.com/himanshkr03",
    isPrimary: false,
    category: "Code",
  },
  {
    name: "LinkedIn",
    label: "Quintos AI Network",
    url: "https://www.linkedin.com/company/quintos-ai/",
    isPrimary: false,
    category: "Network",
  },
];
