"use client";

import { useState } from "react";
import { Brain, ChevronDown, Check, Sparkles, Shield, Cpu, Eye, Atom } from "lucide-react";
import { ModelDefinition, ModelId } from "@/lib/ai/types";
import { RESEARCH_MODELS } from "@/lib/ai/prompts";

interface ModelSelectorProps {
  selectedModelId: ModelId;
  onSelectModel: (modelId: ModelId) => void;
  disabled?: boolean;
}

export default function ModelSelector({
  selectedModelId,
  onSelectModel,
  disabled = false,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedModel =
    RESEARCH_MODELS.find((m) => m.id === selectedModelId) || RESEARCH_MODELS[0];

  const getModelIcon = (id: ModelId) => {
    switch (id) {
      case "quintos-bio-vision-3d":
        return Eye;
      case "quintos-quantum-vqe":
        return Atom;
      case "quintos-reasoning-v1":
      default:
        return Brain;
    }
  };

  const SelectedIcon = getModelIcon(selectedModel.id);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs hover:border-slate-300 hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select AI Research Model"
      >
        <SelectedIcon className="h-4 w-4 text-blue-600 shrink-0" />
        <span className="font-bold">{selectedModel.name}</span>
        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-mono text-blue-700 font-bold hidden sm:inline">
          {selectedModel.badge}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            role="listbox"
            className="absolute left-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-40 animate-in fade-in zoom-in-95"
          >
            <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Sovereign Research Models (Demo)
              </span>
            </div>

            <div className="space-y-1">
              {RESEARCH_MODELS.map((model) => {
                const isSelected = model.id === selectedModelId;
                const Icon = getModelIcon(model.id);

                return (
                  <button
                    key={model.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectModel(model.id);
                      setOpen(false);
                    }}
                    className={`w-full rounded-xl p-2.5 text-left transition flex items-start justify-between gap-2 ${
                      isSelected
                        ? "bg-blue-50/80 border border-blue-200/80"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {model.name}
                          </span>
                        </div>
                        <span className="block text-[10px] text-slate-500 font-mono">
                          {model.domain}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {model.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-600 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 border-t border-slate-100 p-2 text-center bg-slate-50 rounded-xl">
              <span className="text-[10px] font-mono text-slate-500 block">
                Demonstration Mode &bull; No live GPU charges
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
