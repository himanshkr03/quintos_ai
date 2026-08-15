// File: E:\quintos_ai\data\contact.ts

export interface InquiryCategory {
  id: "enterprise" | "research" | "biomedical" | "general";
  title: string;
  badge: string;
  description: string;
  defaultSubject: string;
  placeholderMessage: string;
}

export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  {
    id: "enterprise",
    title: "Enterprise & Sovereign AI",
    badge: "Architecture & Deployment",
    description:
      "For organizations exploring private VPC runtimes, on-premise clusters, custom LLM fine-tuning, or high-throughput vector infrastructure.",
    defaultSubject: "Enterprise AI Architecture & Sovereign Deployment Inquiry",
    placeholderMessage:
      "Describe your enterprise use case, target model scale, data privacy considerations (e.g. private VPC, on-premise), and estimated computational workload...",
  },
  {
    id: "research",
    title: "Research & Fellowships",
    badge: "Scientific Inquiry",
    description:
      "For academic institutions, scientists, and prospective fellows exploring joint research, algorithmic concepts, or prospective fellowships.",
    defaultSubject: "Research Collaboration & Fellowship Inquiry",
    placeholderMessage:
      "Detail your research focus area, theoretical background, prospective fellowship topic, or academic collaboration scope...",
  },
  {
    id: "biomedical",
    title: "Biomedical & Vision AI",
    badge: "Perception Systems",
    description:
      "For clinical imaging labs and technical teams evaluating 3D volumetric segmentation (MRI/CT), pathology workflows, or optical inspection.",
    defaultSubject: "Biomedical Computer Vision & Perception Scope",
    placeholderMessage:
      "Specify your imaging modality (e.g. DICOM, 3D MRI, histology), resolution requirements, edge hardware constraints, and validation criteria...",
  },
  {
    id: "general",
    title: "General Inquiries",
    badge: "Direct Contact",
    description:
      "For general questions regarding Quintos AI research directions, technical stack, or communication.",
    defaultSubject: "General Technical Inquiry",
    placeholderMessage:
      "Share your questions or project context with our research and systems team...",
  },
];

export const DEPLOYMENT_ENVIRONMENTS = [
  "Air-Gapped On-Premise Cluster",
  "Dedicated Private Cloud (AWS/Azure/GCP VPC)",
  "Hybrid Architecture",
  "Edge Workstation / Embedded Hardware",
  "Cloud Evaluation Tier",
] as const;

export const PROJECT_TIMELINES = [
  "Immediate / Active Quarter",
  "Next 3–6 Months",
  "Long-Term Research Roadmap",
  "Exploratory / Feasibility Study",
] as const;

export const COMMUNICATION_FAQS = [
  {
    question: "How are incoming research and technical inquiries processed?",
    answer:
      "Technical inquiries sent to contact.quintosresearch@gmail.com are reviewed by our engineering and research personnel. We aim to respond to prospective inquiries in a timely manner.",
  },
  {
    question: "Can prospective Non-Disclosure Agreements (NDAs) be discussed?",
    answer:
      "Yes. If your enterprise or institutional inquiry involves confidential architectural details, prospective bilateral NDAs can be reviewed prior to in-depth technical scoping.",
  },
  {
    question: "How is inquiry information handled?",
    answer:
      "Inquiry context and project descriptions provided via email are treated confidentially and utilized solely for evaluating technical feasibility and research collaboration.",
  },
  {
    question: "How are scoping discussions conducted?",
    answer:
      "Initial technical communications occur directly via email (contact.quintosresearch@gmail.com). Follow-up discussions can be coordinated via virtual meetings or collaborative technical notes.",
  },
];
