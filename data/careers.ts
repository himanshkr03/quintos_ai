// File: E:\quintos_ai\data\careers.ts

export interface CareerOpening {
  id: string;
  title: string;
  department: "Foundational AI" | "Systems & Infrastructure" | "Perception & Vision" | "Quantum & Emerging";
  location: string;
  status: "Prospective Role" | "Research Fellowship Interest" | "Engineering Area";
  workplaceType: "Hybrid" | "Remote" | "On-Site";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

export const careerOpenings: CareerOpening[] = [
  {
    id: "ai-research-scientist-llm",
    title: "AI Research Scientist — LLMs & Reasoning",
    department: "Foundational AI",
    location: "Mohali, India / Hybrid",
    status: "Prospective Role",
    workplaceType: "Hybrid",
    summary:
      "Theoretical research into multi-step reasoning, latent chain-of-thought verification, and parameter-efficient model adaptation algorithms for enterprise decision systems.",
    responsibilities: [
      "Formulate novel algorithmic architectures for multi-step reasoning and continuous latent state transitions.",
      "Conduct rigorous empirical evaluations against standardized NLP reasoning tasks.",
      "Collaborate with systems engineers to analyze low-latency model runtimes.",
      "Document theoretical insights and technical whitepapers detailing findings.",
    ],
    requirements: [
      "M.S. or Ph.D. (or equivalent research experience) in Computer Science, Applied Mathematics, or related fields.",
      "Strong foundation in deep learning fundamentals and transformer architectures.",
      "Proficiency with PyTorch and the Hugging Face ecosystem.",
      "Demonstrated analytical ability to dissect model failure modes and reasoning drift.",
    ],
    niceToHave: [
      "Experience with mechanistic interpretability tools and attention circuit extraction.",
      "Background in formal verification and automated theorem proving.",
    ],
  },
  {
    id: "ml-systems-engineer",
    title: "Machine Learning Systems Engineer",
    department: "Systems & Infrastructure",
    location: "Remote / Mohali, India",
    status: "Prospective Role",
    workplaceType: "Hybrid",
    summary:
      "Engineering exploration of low-latency CUDA kernels, INT4/FP8 quantization runtimes, and distributed model serving across GPU hardware.",
    responsibilities: [
      "Design and implement high-performance CUDA/C++ kernels for fused transformer attention and matrix multiplication.",
      "Explore sovereign model serving infrastructure with low time-to-first-token latency.",
      "Profile memory bandwidth bottlenecks, KV-cache management, and continuous batching engines.",
      "Maintain automated containerized build pipelines for experimental workloads.",
    ],
    requirements: [
      "B.S. or M.S. in Computer Science, Computer Engineering, or equivalent practical experience.",
      "Strong proficiency in C++, CUDA, Python, and Linux systems programming.",
      "Hands-on experience with modern LLM serving engines (vLLM, TensorRT-LLM, TGI).",
      "Deep understanding of GPU hardware architectures (Ampere, Hopper, Blackwell).",
    ],
    niceToHave: [
      "Experience with Triton kernel development or custom Triton passes.",
      "Familiarity with confidential computing architectures for sovereign AI.",
    ],
  },
  {
    id: "biomedical-cv-engineer",
    title: "Biomedical Computer Vision Engineer",
    department: "Perception & Vision",
    location: "Mohali, India",
    status: "Prospective Role",
    workplaceType: "On-Site",
    summary:
      "Research into self-supervised vision models for high-resolution histology, 3D anatomical volumetric reconstruction, and optical defect detection.",
    responsibilities: [
      "Develop 2D and 3D vision transformer architectures for volumetric scan segmentation (MRI, CT, DICOM).",
      "Build anomaly detection pipelines with calibrated uncertainty bounds.",
      "Collaborate with domain specialists on clinical evaluation standards.",
      "Optimize model inference for edge workstations and imaging hardware.",
    ],
    requirements: [
      "B.S., M.S., or Ph.D. in Computer Vision, Biomedical Engineering, or related technical discipline.",
      "Extensive experience with modern vision architectures (Vision Transformers, Swin, UNet3D).",
      "Proficiency with PyTorch, MONAI, OpenCV, and medical imaging formats (DICOM, NIfTI).",
      "Solid understanding of statistical validation metrics (Dice similarity, Hausdorff distance).",
    ],
    niceToHave: [
      "Experience with biomedical imaging compliance and safety standards.",
      "Background in multi-modal vision-language alignment for radiological report synthesis.",
    ],
  },
  {
    id: "ai-research-fellow-quantum",
    title: "AI Research Fellow / Graduate Intern",
    department: "Quantum & Emerging",
    location: "Remote / Mohali, India",
    status: "Research Fellowship Interest",
    workplaceType: "Remote",
    summary:
      "Exploratory fellowship inquiries into variational quantum machine learning, autonomous agent swarms, and mechanistic interpretability.",
    responsibilities: [
      "Implement and test quantum circuit simulations using Qiskit, Cirq, or Pennylane.",
      "Explore hybrid quantum-classical optimization routines for discrete parameter problems.",
      "Conduct experiments on agent tool-calling loop verification and formal state validation.",
      "Prepare code notebooks, documentation, and technical summary reports.",
    ],
    requirements: [
      "Enrolled in or recently graduated from a Bachelor's, Master's, or Ph.D. program in Physics, Mathematics, Computer Science, or Engineering.",
      "Solid foundation in linear algebra, quantum computing principles, or deep reinforcement learning.",
      "Proficiency in Python and standard scientific computing stacks (NumPy, SciPy, PyTorch).",
      "Passion for open scientific inquiry, exploratory prototyping, and rigorous documentation.",
    ],
    niceToHave: [
      "Prior exposure to variational quantum eigensolvers (VQE) or QAOA.",
      "Active contributions to open-source machine learning or scientific libraries.",
    ],
  },
];

export const departments = [
  "All Departments",
  "Foundational AI",
  "Systems & Infrastructure",
  "Perception & Vision",
  "Quantum & Emerging",
] as const;

export function getAllOpenings(): CareerOpening[] {
  return careerOpenings;
}

export function getOpeningById(id: string): CareerOpening | undefined {
  return careerOpenings.find((o) => o.id === id);
}
