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
  Shield,
  Workflow,
  Compass,
  Zap,
  Terminal,
  Settings,
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

export interface LeadershipDimension {
  title: string;
  badge: string;
  description: string;
}

export interface FocusArea {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProfessionalLink {
  name: string;
  label: string;
  url: string;
  isPrimary?: boolean;
  category: "Portfolio" | "Code" | "Network" | "Research";
}

export interface FounderData {
  id: string;
  name: string;
  primaryRole: string;
  leadershipRoles: string[];
  displayTitle: string;
  eyebrow: string;
  positioning: string;
  location: string;
  initials: string;
  accentColor: "blue" | "indigo";
  about: string[];
  coreAreas: string[];
  dimensions: LeadershipDimension[];
  focusAreasTitle: string;
  focusAreasDescription: string;
  focusAreas: FocusArea[];
  links: ProfessionalLink[];
}

export interface FoundingPhilosophyPillar {
  pillar: string;
  title: string;
  tagline: string;
  description: string;
  leader: string;
  icon: LucideIcon;
}

export interface SelectedWorkItem {
  id: string;
  title: string;
  category: "Research Note" | "AI System" | "Algorithmic Model" | "Framework";
  domain: string;
  description: string;
  attribution: {
    lead: string;
    role: "Research / Strategy" | "AI Development / Technical Execution" | "Collaborative Deep-Tech";
  };
  link?: string;
  isExternal?: boolean;
}

export const FOUNDERS: FounderData[] = [
  {
    id: "himanshu-rajak",
    name: "HIMANSHU RAJAK",
    primaryRole: "Founder",
    leadershipRoles: ["Research Lead", "AI Operational Head"],
    displayTitle: "Founder • Researcher • AI Operational Head",
    eyebrow: "FOUNDER & RESEARCH LEAD",
    positioning:
      "Himanshu Rajak is a founding leader of Quintos AI focused on AI research, research direction, intelligent systems, emerging technologies, and operational leadership of AI initiatives.",
    location: "Mohali, Punjab, India",
    initials: "HR",
    accentColor: "blue",
    about: [
      "Himanshu Rajak is a founding leader of Quintos AI, driving the foundational research agenda, mathematical verification methodologies, and strategic operational direction of AI initiatives.",
      "His work centers on exploratory machine learning paradigms, theoretical bounds for reasoning trajectories in transformer architectures, and formulating hybrid quantum-classical algorithmic approaches.",
      "At Quintos AI, Himanshu oversees research-to-system execution, aligning exploratory computational science with long-term technological roadmaps and operational frameworks.",
    ],
    coreAreas: [
      "Artificial Intelligence",
      "AI Research",
      "Quantum Machine Learning",
      "Artificial General Intelligence",
      "Intelligent Systems",
      "Emerging Computing",
      "AI Operations",
      "Research & Innovation Strategy",
    ],
    dimensions: [
      {
        title: "FOUNDATION",
        badge: "Venture Architecture",
        description:
          "Building, shaping, and establishing the foundational pillars and long-term vision of Quintos AI.",
      },
      {
        title: "RESEARCH",
        badge: "Theoretical Inquiry",
        description:
          "Driving rigorous exploration of advanced AI models, latent reasoning bounds, and emerging computational paradigms.",
      },
      {
        title: "AI OPERATIONS",
        badge: "Strategic Execution",
        description:
          "Coordinating the operational direction of AI initiatives and translating laboratory research into structured technical execution.",
      },
    ],
    focusAreasTitle: "Research Interests & Strategy",
    focusAreasDescription:
      "Core mathematical, algorithmic, and operational domains guiding foundational investigation.",
    focusAreas: [
      {
        number: "01",
        title: "Artificial Intelligence",
        description:
          "Deep neural networks, latent representation learning, transformer hidden-state dynamics, and verifiable reasoning bounds.",
        tags: ["Neural Dynamics", "Representation Learning", "Verification"],
      },
      {
        number: "02",
        title: "Quantum Machine Learning",
        description:
          "Formulating hybrid quantum-classical algorithms, variational circuits (VQE), and quantum state kernel optimizations.",
        tags: ["Variational Ansatz", "Quantum Kernels", "NISQ Algorithms"],
      },
      {
        number: "03",
        title: "Artificial General Intelligence",
        description:
          "Investigating foundational cognitive topologies, test-time compute search, and cross-domain generalization paradigms.",
        tags: ["Cognitive Architectures", "Search & Planning", "Autonomous Cognition"],
      },
      {
        number: "04",
        title: "Intelligent Systems",
        description:
          "Architecting autonomous multi-agent coordination, goal decomposition protocols, and deterministic safety verifiers.",
        tags: ["Agent Swarms", "Deterministic Verification", "System Alignment"],
      },
      {
        number: "05",
        title: "Emerging Computing",
        description:
          "Evaluating extreme integer quantization (INT4/FP8), low-power sovereign compute nodes, and specialized hardware acceleration.",
        tags: ["Sovereign Clusters", "Edge Acceleration", "Tensor Kernels"],
      },
      {
        number: "06",
        title: "AI Operations & Strategy",
        description:
          "Structuring end-to-end AI operational pipelines, research milestones, and institutional technological strategy.",
        tags: ["Operations Strategy", "Execution Pipelines", "Technology Roadmaps"],
      },
    ],
    links: [
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
    ],
  },
  {
    id: "shabnam",
    name: "SHABNAM",
    primaryRole: "Founder",
    leadershipRoles: ["AI Developer", "Executive Operations Lead"],
    displayTitle: "Founder • AI Developer • Executive Operations Lead",
    eyebrow: "FOUNDER & LEAD DEVELOPER",
    positioning:
      "Shabnam is a founding leader of Quintos AI focused on AI development, technical implementation, intelligent systems, and executive operational coordination.",
    location: "Mohali, Punjab, India",
    initials: "SH",
    accentColor: "indigo",
    about: [
      "Shabnam is a founding leader of Quintos AI, spearheading technical implementation, systems engineering, and executive operational coordination across deep-tech initiatives.",
      "Her work focuses on building robust AI systems, integrating foundational models with high-throughput backend infrastructure, and developing sovereign intelligent frameworks that deliver reliable, scalable performance.",
      "At Quintos AI, Shabnam manages technical execution, orchestrating complex model pipelines and aligning product engineering with institutional operations.",
    ],
    coreAreas: [
      "AI Development",
      "AI Engineering",
      "Applied AI",
      "Intelligent Systems",
      "AI Systems",
      "Technical Implementation",
      "Executive Operations",
      "Product & Technical Coordination",
    ],
    dimensions: [
      {
        title: "TECHNICAL EXECUTION",
        badge: "Systems Engineering",
        description:
          "Turning advanced AI concepts into reliable, high-performance working systems and production infrastructure.",
      },
      {
        title: "AI DEVELOPMENT",
        badge: "Architecture & Integration",
        description:
          "Building, fine-tuning, and integrating sovereign AI capabilities, inference pipelines, and autonomous workflows.",
      },
      {
        title: "EXECUTIVE OPERATIONS",
        badge: "Operational Coordination",
        description:
          "Leading operational coordination, execution timelines, and interdisciplinary technical workflows across Quintos AI initiatives.",
      },
    ],
    focusAreasTitle: "AI Development & Implementation",
    focusAreasDescription:
      "Core engineering, systems architecture, and operational domains guiding technical development.",
    focusAreas: [
      {
        number: "01",
        title: "AI Development",
        description:
          "Engineering full-stack artificial intelligence applications, streaming neural endpoints, and developer SDK interfaces.",
        tags: ["Full-Stack AI", "Streaming Endpoints", "Developer Tooling"],
      },
      {
        number: "02",
        title: "AI Engineering",
        description:
          "Optimizing inference pipelines, GPU memory utilization, model containerization, and low-latency API architectures.",
        tags: ["Inference Optimization", "Pipeline Architecture", "High Throughput"],
      },
      {
        number: "03",
        title: "Applied AI",
        description:
          "Translating complex algorithmic models into real-world applications across biomedical vision and enterprise automation.",
        tags: ["Real-World Deployment", "Vision Systems", "Domain Adaptation"],
      },
      {
        number: "04",
        title: "Intelligent Systems",
        description:
          "Implementing autonomous agent architectures, multi-tenant state isolation, and runtime safety telemetry.",
        tags: ["Agent Architectures", "Multi-Tenant Isolation", "Runtime Safety"],
      },
      {
        number: "05",
        title: "Technical Implementation",
        description:
          "Establishing robust database schemas, secure session management, and deterministic backend microservices.",
        tags: ["PostgreSQL / Supabase", "Security Architecture", "Reliability"],
      },
      {
        number: "06",
        title: "AI Systems & Operations",
        description:
          "Managing executive operational coordination, technical milestones, and cross-functional product execution.",
        tags: ["Technical Coordination", "Operations Management", "System Health"],
      },
    ],
    links: [
      {
        name: "GitHub",
        label: "github.com/Shabnam110",
        url: "https://github.com/Shabnam110",
        isPrimary: true,
        category: "Code",
      },
    ],
  },
];

export const PHILOSOPHY_PILLARS: FoundingPhilosophyPillar[] = [
  {
    pillar: "RESEARCH",
    title: "Theoretical Inquiry",
    tagline: "Exploring New Computational Frontiers",
    description:
      "Investigating foundational mathematics, reasoning convergence in latent spaces, and emerging quantum-classical algorithms.",
    leader: "Himanshu Rajak • Research Lead",
    icon: Brain,
  },
  {
    pillar: "ENGINEERING",
    title: "Technical Implementation",
    tagline: "Building Practical Intelligent Systems",
    description:
      "Designing resilient system architectures, sovereign inference pipelines, and scalable multi-agent developer frameworks.",
    leader: "Shabnam • AI Developer",
    icon: Code2,
  },
  {
    pillar: "EXECUTION",
    title: "Executive Operations",
    tagline: "Purposeful Institutional Delivery",
    description:
      "Coordinating research-to-system deployment, operational governance, and purposeful execution across all Quintos AI initiatives.",
    leader: "Founding Leadership",
    icon: Workflow,
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
    attribution: {
      lead: "Himanshu Rajak",
      role: "Research / Strategy",
    },
    link: "/blog/latent-chain-of-thought-reasoning-bounds",
    isExternal: false,
  },
  {
    id: "work-2",
    title: "Quintos Bio-Vision 3D Perception Framework",
    category: "AI System",
    domain: "Medical AI & Systems Engineering",
    description:
      "Volumetric coordinate perception model for sub-millimeter anomaly detection and anatomical segmentation across dense 3D MRI and CT imaging volumes.",
    attribution: {
      lead: "Collaborative Initiative",
      role: "Collaborative Deep-Tech",
    },
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
    attribution: {
      lead: "Himanshu Rajak",
      role: "Research / Strategy",
    },
    link: "/blog/variational-eigensolvers-nisq-quantum-hardware",
    isExternal: false,
  },
  {
    id: "work-4",
    title: "Autonomous Multi-Agent Swarm Orchestration",
    category: "Framework",
    domain: "Intelligent Systems & Applied AI",
    description:
      "A decentralized orchestration framework for multi-agent reasoning, hierarchical action execution, and dynamic environment self-correction.",
    attribution: {
      lead: "Shabnam",
      role: "AI Development / Technical Execution",
    },
    link: "/blog/autonomous-multi-agent-swarms",
    isExternal: false,
  },
];
