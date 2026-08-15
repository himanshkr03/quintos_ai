// File: E:\quintos_ai\components\dashboard\ai\PromptHistory.tsx

import { PROMPT_CATEGORIES } from "@/lib/ai/prompts";
import { Sparkles, Terminal } from "lucide-react";

export default function PromptHistory() {
  const allPrompts = PROMPT_CATEGORIES.flatMap((cat) => cat.prompts).slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">
            Suggested Research Prompts
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">
          Demo Library
        </span>
      </div>

      <div className="space-y-2">
        {allPrompts.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-200/70 p-3 text-xs text-slate-800 transition hover:border-blue-300 hover:bg-blue-50/30"
          >
            <span className="block font-mono text-[10px] font-bold text-blue-600 mb-0.5">
              {p.category}
            </span>
            <p className="font-medium line-clamp-2 text-slate-700">{p.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}