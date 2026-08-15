// File: E:\quintos_ai\components\dashboard\ai\RecentChats.tsx

import { INITIAL_DEMO_SESSIONS } from "@/lib/ai/prompts";
import { MessageSquare, Clock } from "lucide-react";

export default function RecentChats() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">
            Recent Research Sessions
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">
          Demo Sessions
        </span>
      </div>

      <div className="space-y-2">
        {INITIAL_DEMO_SESSIONS.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-xl border border-slate-200/70 p-3 text-xs text-slate-800 transition hover:border-blue-300 hover:bg-slate-50"
          >
            <div>
              <span className="font-semibold text-slate-900 block truncate max-w-[220px]">
                {session.title}
              </span>
              <span className="text-[10px] font-mono text-blue-600">
                {session.modelId.replace("quintos-", "")}
              </span>
            </div>

            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              {session.updatedAt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}