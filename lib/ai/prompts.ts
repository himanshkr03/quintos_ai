// File: E:\quintos_ai\lib\ai\prompts.ts

import {
  ModelDefinition,
  WorkspaceContext,
  PromptCategory,
  ConversationSession,
} from "./types";

export const RESEARCH_MODELS: ModelDefinition[] = [
  {
    id: "quintos-reasoning-v1",
    name: "Quintos Reasoning v1",
    badge: "Reasoning & Deduction",
    domain: "Mathematical Logic & Algorithmic Search",
    description:
      "Specialized in step-by-step deductive chains, test-time compute search, and symbolic formulation.",
    architecture: "Latent Tree Search Transformer",
    defaultContext: "general-research",
  },
  {
    id: "quintos-bio-vision-3d",
    name: "Quintos Bio-Vision 3D",
    badge: "Medical Perception",
    domain: "3D Volumetric MRI & CT Segmentation",
    description:
      "Perception architecture for continuous multi-slice volumetric tensor isolation and anomaly bounding.",
    architecture: "Volumetric Coordinate Vision Transformer",
    defaultContext: "biomedical-vision",
  },
  {
    id: "quintos-quantum-vqe",
    name: "Quintos Quantum VQE",
    badge: "NISQ Simulation",
    domain: "Variational Quantum Eigensolvers",
    description:
      "Formulates parameterized quantum circuits, Pauli Hamiltonian groupings, and ansatz optimizations.",
    architecture: "Hybrid Classical-Quantum Tensor Network",
    defaultContext: "quantum-ml",
  },
];

export const WORKSPACE_CONTEXTS: WorkspaceContext[] = [
  {
    id: "general-research",
    title: "General AI Research",
    shortName: "Research",
    description:
      "Algorithmic formulation, mathematical derivation, and deductive analysis.",
    iconName: "Brain",
    recommendedModelId: "quintos-reasoning-v1",
  },
  {
    id: "biomedical-vision",
    title: "Biomedical Vision",
    shortName: "Bio-Vision",
    description:
      "Volumetric MRI/CT segmentation tensors, spatial coordinates, and imaging features.",
    iconName: "Eye",
    recommendedModelId: "quintos-bio-vision-3d",
  },
  {
    id: "quantum-ml",
    title: "Quantum ML & Simulation",
    shortName: "Quantum ML",
    description:
      "Variational quantum eigensolvers, Hamiltonian mapping, and state preparation circuits.",
    iconName: "Atom",
    recommendedModelId: "quintos-quantum-vqe",
  },
  {
    id: "agentic-systems",
    title: "Intelligent Agents & Topology",
    shortName: "Agents",
    description:
      "Decentralized agent orchestration, memory DAGs, and autonomous tool routing.",
    iconName: "Bot",
    recommendedModelId: "quintos-reasoning-v1",
  },
  {
    id: "systems-inference",
    title: "AI Systems & Inference Runtimes",
    shortName: "Systems",
    description:
      "INT4 quantization, KV-cache paging, and air-gapped private VPC runtimes.",
    iconName: "Cpu",
    recommendedModelId: "quintos-reasoning-v1",
  },
];

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: "research",
    name: "Research",
    badge: "Theory & Bounds",
    prompts: [
      {
        id: "p-res-1",
        category: "Research",
        title: "Latent Reasoning Bounds",
        prompt:
          "Formulate the theoretical bounds between test-time compute search depth and hallucination mitigation in transformer reasoning models.",
        modelId: "quintos-reasoning-v1",
        contextId: "general-research",
      },
      {
        id: "p-res-2",
        category: "Research",
        title: "Sub-quadratic Attention Trade-offs",
        prompt:
          "Analyze the mathematical trade-offs between state space models (SSMs) and linear attention mechanisms across million-token sequences.",
        modelId: "quintos-reasoning-v1",
        contextId: "general-research",
      },
    ],
  },
  {
    id: "engineering",
    name: "AI Engineering",
    badge: "Optimization",
    prompts: [
      {
        id: "p-eng-1",
        category: "AI Engineering",
        title: "INT4 Weight-Only Quantization",
        prompt:
          "Provide a modular Python implementation of INT4 weight-only quantization with per-channel outlier preservation.",
        modelId: "quintos-reasoning-v1",
        contextId: "systems-inference",
      },
      {
        id: "p-eng-2",
        category: "AI Engineering",
        title: "Paged KV-Cache Memory Management",
        prompt:
          "Explain how continuous batching and virtual memory block tables prevent GPU memory fragmentation during parallel inference.",
        modelId: "quintos-reasoning-v1",
        contextId: "systems-inference",
      },
    ],
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    badge: "Architectures",
    prompts: [
      {
        id: "p-gen-1",
        category: "Generative AI",
        title: "Hierarchical RAG Topology",
        prompt:
          "Design an architecture for dense vector retrieval combined with reciprocal rank fusion (RRF) and contextual reranking.",
        modelId: "quintos-reasoning-v1",
        contextId: "general-research",
      },
      {
        id: "p-gen-2",
        category: "Generative AI",
        title: "Constrained Speculative Decoding",
        prompt:
          "Formulate how a small draft model verifies output tokens in speculative decoding with deterministic grammar constraints.",
        modelId: "quintos-reasoning-v1",
        contextId: "systems-inference",
      },
    ],
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    badge: "3D Perception",
    prompts: [
      {
        id: "p-cv-1",
        category: "Computer Vision",
        title: "3D MRI Volumetric Segmentation",
        prompt:
          "Outline the tensor pipeline for 3D volumetric MRI segmentation across multi-slice DICOM series with coordinate attention.",
        modelId: "quintos-bio-vision-3d",
        contextId: "biomedical-vision",
      },
      {
        id: "p-cv-2",
        category: "Computer Vision",
        title: "Optical Anomaly Isolation",
        prompt:
          "Describe how self-supervised vision representations detect micro-defects in high-speed industrial optical inspection.",
        modelId: "quintos-bio-vision-3d",
        contextId: "biomedical-vision",
      },
    ],
  },
  {
    id: "quantum-ml",
    name: "Quantum ML",
    badge: "NISQ Algorithms",
    prompts: [
      {
        id: "p-qml-1",
        category: "Quantum ML",
        title: "Variational Eigensolver Ansatz",
        prompt:
          "Formulate a parameterized Hardware-Efficient Ansatz (HEA) for estimating the ground state energy of a molecular Hamiltonian.",
        modelId: "quintos-quantum-vqe",
        contextId: "quantum-ml",
      },
      {
        id: "p-qml-2",
        category: "Quantum ML",
        title: "Pauli Operator Grouping",
        prompt:
          "Explain how qubit-wise commutativity (QWC) reduces the measurement shot count required for evaluating expectation values.",
        modelId: "quintos-quantum-vqe",
        contextId: "quantum-ml",
      },
    ],
  },
  {
    id: "agents",
    name: "Intelligent Agents",
    badge: "Orchestration",
    prompts: [
      {
        id: "p-agt-1",
        category: "Intelligent Agents",
        title: "Multi-Agent Consensus DAG",
        prompt:
          "Design a directed acyclic graph (DAG) consensus protocol for verifying code generation across specialized verification agents.",
        modelId: "quintos-reasoning-v1",
        contextId: "agentic-systems",
      },
    ],
  },
  {
    id: "systems",
    name: "Systems & Inference",
    badge: "Runtimes",
    prompts: [
      {
        id: "p-sys-1",
        category: "Systems & Inference",
        title: "Air-Gapped Sovereign Deployment",
        prompt:
          "Detail the security topology and containerized runtime requirements for executing local neural inference without outbound internet access.",
        modelId: "quintos-reasoning-v1",
        contextId: "systems-inference",
      },
    ],
  },
];

export const INITIAL_DEMO_SESSIONS: ConversationSession[] = [
  {
    id: "sess-1",
    title: "Quantum ML VQE Optimization",
    modelId: "quintos-quantum-vqe",
    contextId: "quantum-ml",
    updatedAt: "15 mins ago",
    group: "Today",
    messages: [
      {
        id: "m-101",
        role: "user",
        content:
          "Formulate a parameterized Hardware-Efficient Ansatz (HEA) for estimating molecular ground state energy.",
        timestamp: "12:15 PM",
      },
      {
        id: "m-102",
        role: "assistant",
        modelId: "quintos-quantum-vqe",
        modelName: "Quintos Quantum VQE",
        contextId: "quantum-ml",
        isDemonstration: true,
        timestamp: "12:15 PM",
        content: `### Variational Quantum Eigensolver (VQE) Parameterization

In a **Hardware-Efficient Ansatz (HEA)**, single-qubit rotation gates and entangling CNOT layers are interleaved to parameterize the quantum state $|\psi(\vec{\theta})\rangle$:

$$\\mathcal{H} = \\sum_{i} c_i \\hat{P}_i, \\quad \\hat{P}_i \\in \\{I, X, Y, Z\\}^{\\otimes N}$$

#### Python Simulation Blueprint (NISQ Circuit)
\`\`\`python
import numpy as np

def hardware_efficient_layer(qubits, theta_layer):
    """
    Simulates single-qubit rotations followed by linear entangling gates.
    """
    circuit_ops = []
    # Single qubit Euler rotations: Rz(theta_1) * Rx(theta_2) * Rz(theta_3)
    for q_idx in range(len(qubits)):
        circuit_ops.append(f"Rz({theta_layer[q_idx, 0]:.3f}) on qubit {q_idx}")
        circuit_ops.append(f"Rx({theta_layer[q_idx, 1]:.3f}) on qubit {q_idx}")
    
    # Linear nearest-neighbor entanglement
    for q_idx in range(len(qubits) - 1):
        circuit_ops.append(f"CNOT(control={q_idx}, target={q_idx+1})")
    
    return circuit_ops
\`\`\`

#### Key Computational Considerations
- **Barren Plateau Mitigation:** Layer depth must scale logarithmically with qubit count $N$.
- **Pauli Grouping:** Qubit-wise commutativity reduces measurement variance by up to $60\\%$.`,
      },
    ],
  },
  {
    id: "sess-2",
    title: "3D MRI Volumetric Perception",
    modelId: "quintos-bio-vision-3d",
    contextId: "biomedical-vision",
    updatedAt: "2 hours ago",
    group: "Today",
    messages: [
      {
        id: "m-201",
        role: "user",
        content:
          "Outline the tensor pipeline for 3D volumetric MRI segmentation across multi-slice DICOM series.",
        timestamp: "10:30 AM",
      },
      {
        id: "m-202",
        role: "assistant",
        modelId: "quintos-bio-vision-3d",
        modelName: "Quintos Bio-Vision 3D",
        contextId: "biomedical-vision",
        isDemonstration: true,
        timestamp: "10:30 AM",
        content: `### 3D Volumetric Tensor Perception Pipeline

The volumetric perception engine processes isotropic $D \\times H \\times W$ voxel cubes using 3D coordinate-aware self-attention:

#### Pipeline Stages
1. **Preprocessing & Resampling:** Normalizes voxel spacing to $1.0\\text{mm} \\times 1.0\\text{mm} \\times 1.0\\text{mm}$ across slices.
2. **Patch Embedding:** Converts $16^3$ voxel sub-volumes into dimensional latent vectors.
3. **Continuous Bounding:** Predicts 3D bounding coordinates $(x, y, z, d, h, w)$ with spatial confidence masks.

\`\`\`python
# Conceptual 3D Voxel Segmentation Forward Pass
import torch
import torch.nn as nn

class VolumetricEmbedding(nn.Module):
    def __init__(self, in_channels=1, patch_size=16, embed_dim=768):
        super().__init__()
        self.proj = nn.Conv3d(
            in_channels, embed_dim, 
            kernel_size=patch_size, stride=patch_size
        )

    def forward(self, x):
        # x shape: [B, C, D, H, W] -> [B, embed_dim, D', H', W']
        return self.proj(x).flatten(2).transpose(1, 2)
\`\`\``,
      },
    ],
  },
  {
    id: "sess-3",
    title: "INT4 Weight Quantization",
    modelId: "quintos-reasoning-v1",
    contextId: "systems-inference",
    updatedAt: "Yesterday",
    group: "Previous",
    messages: [
      {
        id: "m-301",
        role: "user",
        content:
          "Explain how INT4 weight-only quantization preserves FP16 activations with minimal perplexity degradation.",
        timestamp: "Yesterday",
      },
      {
        id: "m-302",
        role: "assistant",
        modelId: "quintos-reasoning-v1",
        modelName: "Quintos Reasoning v1",
        contextId: "systems-inference",
        isDemonstration: true,
        timestamp: "Yesterday",
        content: `### INT4 Weight-Only Quantization (W4A16)

In W4A16 quantization, weights are stored as 4-bit integers while activations remain in native 16-bit floating point format (FP16/BF16):

$$W_{\\text{dequant}} = S \\cdot (W_{\\text{int4}} - Z)$$

- **S:** FP16 scale factor per channel or group.
- **Z:** Zero-point offset.
- **Memory Footprint:** Reduces model VRAM requirements by approximately $70\\%$ relative to FP16.`,
      },
    ],
  },
];
