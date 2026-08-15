"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Network, ShieldCheck, Sparkles } from "lucide-react";

export default function HeroPreview() {
  const nodes = [
    { id: "input", x: 60, y: 70, label: "Multimodal Inputs", icon: Eye, color: "#2563eb" },
    { id: "rag", x: 60, y: 230, label: "Knowledge Graph", icon: Network, color: "#06b6d4" },
    { id: "core", x: 220, y: 150, label: "Quintos Neural Core", icon: Brain, color: "#7c3aed", isCore: true },
    { id: "agent", x: 380, y: 70, label: "Agent Reasoning", icon: Sparkles, color: "#9333ea" },
    { id: "quantum", x: 380, y: 230, label: "Quantum ML Optimizer", icon: Cpu, color: "#2563eb" },
  ];

  const connections = [
    { from: { x: 60, y: 70 }, to: { x: 220, y: 150 } },
    { from: { x: 60, y: 230 }, to: { x: 220, y: 150 } },
    { from: { x: 220, y: 150 }, to: { x: 380, y: 70 } },
    { from: { x: 220, y: 150 }, to: { x: 380, y: 230 } },
    { from: { x: 60, y: 70 }, to: { x: 60, y: 230 } },
    { from: { x: 380, y: 70 }, to: { x: 380, y: 230 } },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto flex items-center justify-center">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-60" />

      {/* Main Scientific Console Card */}
      <div className="relative w-full rounded-3xl border border-slate-200/80 bg-white/95 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            </div>
            <span className="ml-2 font-mono text-xs text-slate-500 font-semibold tracking-wider uppercase">
              Quintos Neural Topology
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-medium text-emerald-600">
              System Active
            </span>
          </div>
        </div>

        {/* Neural Network SVG Topology */}
        <div className="relative h-[300px] w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 overflow-hidden border border-slate-800">
          {/* Subtle Grid Background inside Console */}
          <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

          {/* SVG Connecting Vectors */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 440 300">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {connections.map((conn, idx) => (
              <g key={idx}>
                {/* Background static line */}
                <line
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </g>
            ))}
          </svg>

          {/* Active Interactive Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  position: "absolute",
                  left: `${(node.x / 440) * 100}%`,
                  top: `${(node.y / 300) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="group cursor-pointer z-10"
              >
                <div
                  className={`flex items-center justify-center rounded-2xl border transition-all duration-300 ${
                    node.isCore
                      ? "h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-700 border-purple-300/40 text-white shadow-[0_0_25px_rgba(124,58,237,0.5)] ring-4 ring-purple-500/20"
                      : "h-12 w-12 bg-slate-800/90 border-slate-700 text-blue-400 hover:border-blue-400 hover:text-white hover:bg-slate-700 shadow-md backdrop-blur-sm"
                  }`}
                >
                  <Icon className={node.isCore ? "h-7 w-7" : "h-5 w-5"} />
                </div>

                {/* Node Label Tooltip */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-medium text-slate-300 group-hover:text-blue-300 transition-colors">
                  {node.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Console Telemetry Footer */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-center">
          <div className="rounded-xl bg-slate-50 p-2.5">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Pipeline
            </span>
            <span className="mt-0.5 block font-semibold text-xs text-slate-800">
              Transformer + RAG
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Architecture
            </span>
            <span className="mt-0.5 block font-semibold text-xs text-slate-800">
              Graph Tensor
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Security
            </span>
            <span className="mt-0.5 block font-semibold text-xs text-emerald-600">
              Encrypted / Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}