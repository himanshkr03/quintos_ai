// File: E:\quintos_ai\components\dashboard\ai\ChatWidget.tsx

"use client";

import { Send } from "lucide-react";

export default function ChatWidget() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-xl font-bold text-gray-900">
          AI Assistant
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Ask Quintos AI anything.
        </p>
      </div>

      <div className="h-80 space-y-4 overflow-y-auto p-5">
        <div className="max-w-xs rounded-xl bg-slate-100 p-4">
          Hello! How can I help you today?
        </div>

        <div className="ml-auto max-w-xs rounded-xl bg-blue-600 p-4 text-white">
          Explain Retrieval-Augmented Generation.
        </div>

        <div className="max-w-md rounded-xl bg-slate-100 p-4">
          Retrieval-Augmented Generation (RAG) combines information retrieval
          with Large Language Models to produce more accurate responses using
          external knowledge.
        </div>
      </div>

      <div className="border-t p-5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}