"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Network, Sparkles } from "lucide-react";

export default function HeroPreview() {
  const nodes = [
    { id: "input", x: 70, y: 70, label: "Multimodal Inputs", icon: Eye, color: "#2563eb" },
    { id: "rag", x: 70, y: 230, label: "Knowledge Graph", icon: Network, color: "#06b6d4" },
    { id: "core", x: 220, y: 150, label: "Quintos Neural Core", icon: Brain, color: "#7c3aed", isCore: true },
    { id: "agent", x: 370, y: 70, label: "Agent Reasoning", icon: Sparkles, color: "#9333ea" },
    { id: "quantum", x: 370, y: 230, label: "Quantum ML", icon: Cpu, color: "#2563eb" },
  ];

  const connections = [
    { from: { x: 70, y: 70 }, to: { x: 220, y: 150 } },
    { from: { x: 70, y: 230 }, to: { x: 220, y: 150 } },
    { from: { x: 220, y: 150 }, to: { x: 370, y: 70 } },
    { from: { x: 220, y: 150 }, to: { x: 370, y: 230 } },
    { from: { x: 70, y: 70 }, to: { x: 70, y: 230 } },
    { from: { x: 370, y: 70 }, to: { x: 370, y: 230 } },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 blur-lg opacity-60 pointer-events-none" />

      {/* Main Scientific Console Card */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 p-5 sm:p-7 shadow-xl backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            </div>
            <span className="ml-1.5 font-mono text-[11px] text-slate-500 font-semibold tracking-wider uppercase">
              Neural Topology Matrix
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-medium text-emerald-600">
              Operational
            </span>
          </div>
        </div>

        {/* Neural Network SVG Topology */}
        <div className="relative h-[240px] sm:h-[280px] w-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-4 overflow-hidden border border-slate-800">
          {/* Subtle Grid Background inside Console */}
          <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

          {/* SVG Connecting Vectors */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 440 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {connections.map((conn, idx) => (
              <g key={idx}>
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
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                style={{
                  position: "absolute",
                  left: `${(node.x / 440) * 100}%`,
                  top: `${(node.y / 300) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="group cursor-pointer z-10"
              >
                <div
                  className={`flex items-center justify-center rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                    node.isCore
                      ? "h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-blue-600 to-purple-700 border-purple-300/40 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] ring-2 sm:ring-4 ring-purple-500/20"
                      : "h-9 w-9 sm:h-11 sm:w-11 bg-slate-800/95 border-slate-700 text-blue-400 hover:border-blue-400 hover:text-white hover:bg-slate-700 shadow-sm"
                  }`}
                >
                  <Icon className={node.isCore ? "h-5 w-5 sm:h-6 sm:w-6" : "h-4 w-4 sm:h-5 sm:w-5"} />
                </div>

                {/* Node Label Tooltip */}
                <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] sm:text-[10px] font-mono font-medium text-slate-300 group-hover:text-blue-300 transition-colors">
                  {node.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Console Telemetry Footer */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 border-t border-slate-100 pt-3 text-center">
          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">
              Pipeline
            </span>
            <span className="mt-0.5 block font-semibold text-[11px] text-slate-800">
              Transformer + RAG
            </span>
          </div>

          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">
              Architecture
            </span>
            <span className="mt-0.5 block font-semibold text-xs text-slate-800">
              Graph Tensor
            </span>
          </div>

          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">
              Security
            </span>
            <span className="mt-0.5 block font-semibold text-[11px] text-emerald-600">
              Encrypted / Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}