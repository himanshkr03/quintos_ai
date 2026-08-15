"use client";

import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Trash2,
  Clock,
  Check,
  ChevronRight,
  Brain,
  Eye,
  Atom,
} from "lucide-react";
import { ConversationSession, ModelId } from "@/lib/ai/types";

interface ConversationHistoryProps {
  sessions: ConversationSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  onClearAll: () => void;
}

export default function ConversationHistory({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onClearAll,
}: ConversationHistoryProps) {
  const todaySessions = sessions.filter((s) => s.group === "Today");
  const previousSessions = sessions.filter((s) => s.group === "Previous");

  const getModelBadgeColor = (modelId: ModelId) => {
    switch (modelId) {
      case "quintos-bio-vision-3d":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "quintos-quantum-vqe":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "quintos-reasoning-v1":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="flex h-full flex-col justify-between border-r border-slate-200/80 bg-slate-50/50 p-4 text-xs">
      <div>
        {/* Header & New Chat Action */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">
              Research Sessions
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Demo History</span>
          </div>

          <button
            type="button"
            onClick={onNewSession}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition"
            title="Start new research conversation"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="mt-3 space-y-4 max-h-[460px] overflow-y-auto pr-1">
          {/* Today Group */}
          {todaySessions.length > 0 && (
            <div>
              <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                Today
              </span>
              <div className="space-y-1">
                {todaySessions.map((s) => {
                  const isActive = s.id === activeSessionId;
                  return (
                    <div
                      key={s.id}
                      className={`group relative flex items-center justify-between rounded-xl p-2 transition ${
                        isActive
                          ? "bg-white border border-blue-200 shadow-2xs text-slate-900 font-semibold"
                          : "hover:bg-white/80 text-slate-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectSession(s.id)}
                        className="flex-1 text-left truncate mr-2"
                      >
                        <span className="block truncate text-xs font-medium">
                          {s.title}
                        </span>
                        <span
                          className={`inline-block mt-0.5 rounded border px-1.5 py-0.2 font-mono text-[9px] font-bold ${getModelBadgeColor(
                            s.modelId
                          )}`}
                        >
                          {s.modelId.replace("quintos-", "")}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(s.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition"
                        title="Delete demo session"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Previous Group */}
          {previousSessions.length > 0 && (
            <div>
              <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                Previous
              </span>
              <div className="space-y-1">
                {previousSessions.map((s) => {
                  const isActive = s.id === activeSessionId;
                  return (
                    <div
                      key={s.id}
                      className={`group relative flex items-center justify-between rounded-xl p-2 transition ${
                        isActive
                          ? "bg-white border border-blue-200 shadow-2xs text-slate-900 font-semibold"
                          : "hover:bg-white/80 text-slate-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectSession(s.id)}
                        className="flex-1 text-left truncate mr-2"
                      >
                        <span className="block truncate text-xs font-medium">
                          {s.title}
                        </span>
                        <span
                          className={`inline-block mt-0.5 rounded border px-1.5 py-0.2 font-mono text-[9px] font-bold ${getModelBadgeColor(
                            s.modelId
                          )}`}
                        >
                          {s.modelId.replace("quintos-", "")}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(s.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition"
                        title="Delete demo session"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sessions.length === 0 && (
            <div className="p-4 text-center text-slate-400 font-mono text-[11px]">
              No demonstration sessions active.
            </div>
          )}
        </div>
      </div>

      {/* History Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">
          Local State Only
        </span>

        {sessions.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[10px] font-semibold text-slate-500 hover:text-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
