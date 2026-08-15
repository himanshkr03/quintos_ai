"use client";

import { WorkspaceContextId } from "@/lib/ai/types";
import { WORKSPACE_CONTEXTS } from "@/lib/ai/prompts";
import { Brain, Eye, Atom, Bot, Cpu } from "lucide-react";

interface ContextSelectorProps {
  selectedContextId: WorkspaceContextId;
  onSelectContext: (contextId: WorkspaceContextId) => void;
  disabled?: boolean;
}

export default function ContextSelector({
  selectedContextId,
  onSelectContext,
  disabled = false,
}: ContextSelectorProps) {
  const getContextIcon = (iconName: string) => {
    switch (iconName) {
      case "Eye":
        return Eye;
      case "Atom":
        return Atom;
      case "Bot":
        return Bot;
      case "Cpu":
        return Cpu;
      case "Brain":
      default:
        return Brain;
    }
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none" aria-label="Research Workspace Contexts">
      <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0 mr-1">
        Context:
      </span>
      {WORKSPACE_CONTEXTS.map((ctx) => {
        const isSelected = ctx.id === selectedContextId;
        const Icon = getContextIcon(ctx.iconName);

        return (
          <button
            key={ctx.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectContext(ctx.id)}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              isSelected
                ? "bg-blue-600 text-white shadow-2xs font-bold"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            } disabled:opacity-50`}
            title={ctx.description}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span>{ctx.shortName}</span>
          </button>
        );
      })}
    </div>
  );
}
