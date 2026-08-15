// File: E:\quintos_ai\app\(marketing)\blog\page.tsx

import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Research Insights & Publications | Quintos AI",
  description: "Explore algorithmic deep-dives, research papers, tutorials, and engineering articles from the Quintos AI laboratory.",
};

const articles = [
  {
    category: "LLM Reasoning",
    title: "Latent Chain-of-Thought: Verifying Multi-Step Reasoning Bounds",
    description:
      "An analysis of internal hidden-state trajectories in transformer models during complex multi-step symbolic reasoning tasks.",
    date: "August 2026",
    readTime: "7 min read",
    author: "Quintos AI Lab",
  },
  {
    category: "Medical AI",
    title: "Sub-Millimeter Anomaly Detection in 3D Volumetric MRI",
    description:
      "How hierarchical vision transformers achieve high sensitivity in biomedical pathology without excessive false positive drift.",
    date: "July 2026",
    readTime: "9 min read",
    author: "Biomedical Perception Team",
  },
  {
    category: "Quantum ML",
    title: "Variational Eigensolvers on Noisy Intermediate-Scale Quantum Hardware",
    description:
      "A technical walkthrough of hybrid quantum-classical error mitigation techniques for molecular energy simulations.",
    date: "June 2026",
    readTime: "11 min read",
    author: "Quantum AI Research",
  },
  {
    category: "Systems & Inference",
    title: "Zero-Overhead INT4 Quantization for Sovereign Enterprise Deployments",
    description:
      "Benchmarking custom CUDA kernel optimizations and memory bandwidth throughput for air-gapped on-premise inference.",
    date: "May 2026",
    readTime: "6 min read",
    author: "Systems Engineering",
  },
  {
    category: "Autonomous Agents",
    title: "Deterministic Guardrails for Multi-Agent Tool-Calling Loops",
    description:
      "Preventing cascading failure modes in autonomous agents using formal schema verification and rollback checkpoints.",
    date: "April 2026",
    readTime: "8 min read",
    author: "Agent Architectures Team",
  },
  {
    category: "Interpretability",
    title: "Mechanistic Circuit Attribution in Modern Foundation Models",
    description:
      "Extracting interpretable neural circuits to audit and explain high-stakes decision pathways in automated scoring pipelines.",
    date: "March 2026",
    readTime: "10 min read",
    author: "Alignment & Safety Lab",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Technical Dissemination & Insights
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Research Insights &{" "}
              <span className="gradient-ai">Algorithmic Papers</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Deep-dives, scientific preprints, algorithmic tutorials, and
              infrastructure benchmarks published by the Quintos AI team.
            </p>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white">
        <Container>
          <SectionTitle
            badge="Published Insights"
            title="Explore the Knowledge Hub"
            description="Peer-reviewed methodologies, engineering postmortems, and technical explorations."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((art) => (
              <article
                key={art.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-blue-700">
                      {art.category}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {art.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {art.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{art.author}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{art.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}