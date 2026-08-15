"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Square,
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  Bot,
  User,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  Brain,
  Layers,
  MessageSquare,
  Trash2,
  Plus,
} from "lucide-react";

import {
  ModelId,
  WorkspaceContextId,
  ChatMessage,
  ConversationSession,
  InferenceStatus,
} from "@/lib/ai/types";
import {
  RESEARCH_MODELS,
  WORKSPACE_CONTEXTS,
  PROMPT_CATEGORIES,
  INITIAL_DEMO_SESSIONS,
} from "@/lib/ai/prompts";
import { demoInferenceService } from "@/lib/ai/inferenceService";
import MarkdownRenderer from "./MarkdownRenderer";
import ModelSelector from "./ModelSelector";
import ContextSelector from "./ContextSelector";
import ConversationHistory from "./ConversationHistory";

export default function ChatWidget() {
  const [sessions, setSessions] = useState<ConversationSession[]>(
    INITIAL_DEMO_SESSIONS
  );
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    INITIAL_DEMO_SESSIONS[0]?.id || null
  );

  const [selectedModelId, setSelectedModelId] = useState<ModelId>(
    INITIAL_DEMO_SESSIONS[0]?.modelId || "quintos-reasoning-v1"
  );
  const [selectedContextId, setSelectedContextId] = useState<WorkspaceContextId>(
    INITIAL_DEMO_SESSIONS[0]?.contextId || "general-research"
  );

  const [messages, setMessages] = useState<ChatMessage[]>(
    INITIAL_DEMO_SESSIONS[0]?.messages || []
  );
  const [inputValue, setInputValue] = useState("");
  const [inferenceStatus, setInferenceStatus] = useState<InferenceStatus>("idle");
  const [statusText, setStatusText] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("research");

  const abortStreamRef = useRef<(() => void) | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeModel =
    RESEARCH_MODELS.find((m) => m.id === selectedModelId) || RESEARCH_MODELS[0];

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, inferenceStatus]);

  // Sync active session selection
  const handleSelectSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    if (abortStreamRef.current) {
      abortStreamRef.current();
    }

    setActiveSessionId(session.id);
    setSelectedModelId(session.modelId);
    setSelectedContextId(session.contextId);
    setMessages(session.messages);
    setInferenceStatus("idle");
    setHistoryOpen(false);
  };

  const handleNewSession = () => {
    if (abortStreamRef.current) {
      abortStreamRef.current();
    }

    setActiveSessionId(null);
    setMessages([]);
    setInferenceStatus("idle");
    setInputValue("");
    setHistoryOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);

    if (activeSessionId === sessionId) {
      if (updated.length > 0) {
        handleSelectSession(updated[0].id);
      } else {
        handleNewSession();
      }
    }
  };

  const handleClearAllSessions = () => {
    setSessions([]);
    handleNewSession();
  };

  const handleClearCurrentChat = () => {
    if (abortStreamRef.current) {
      abortStreamRef.current();
    }
    setMessages([]);
    setInferenceStatus("idle");
  };

  const handleContextChange = (newContextId: WorkspaceContextId) => {
    setSelectedContextId(newContextId);
    const ctx = WORKSPACE_CONTEXTS.find((c) => c.id === newContextId);
    if (ctx && !selectedModelId) {
      setSelectedModelId(ctx.recommendedModelId);
    }
  };

  const executeInference = (promptContent: string) => {
    if (!promptContent.trim() || inferenceStatus === "streaming") return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: promptContent.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setInferenceStatus("preparing");
    setStatusText("Initializing simulated research runtime...");

    // Create assistant streaming placeholder
    const assistantMessageId = `ast-${Date.now()}`;
    const assistantMessagePlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      modelId: selectedModelId,
      modelName: activeModel.name,
      contextId: selectedContextId,
      content: "",
      isDemonstration: true,
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...updatedMessages, assistantMessagePlaceholder]);

    // Invoke DemoInferenceService
    const cancelFn = demoInferenceService.generateStream(
      promptContent,
      selectedModelId,
      selectedContextId,
      {
        onPreparing: () => {
          setInferenceStatus("preparing");
          setStatusText(`Formulating response with ${activeModel.name}...`);
        },
        onChunk: (accumulated) => {
          setInferenceStatus("streaming");
          setStatusText(`Streaming simulated output (${activeModel.name})...`);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: accumulated, isStreaming: true }
                : msg
            )
          );
        },
        onComplete: (finalText) => {
          setInferenceStatus("complete");
          setStatusText("");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: finalText, isStreaming: false }
                : msg
            )
          );

          // Update or create active session in local state
          const newSessionTitle =
            promptContent.length > 32
              ? `${promptContent.substring(0, 32)}...`
              : promptContent;

          if (!activeSessionId) {
            const newSession: ConversationSession = {
              id: `sess-${Date.now()}`,
              title: newSessionTitle,
              modelId: selectedModelId,
              contextId: selectedContextId,
              updatedAt: "Just now",
              group: "Today",
              messages: [
                ...updatedMessages,
                { ...assistantMessagePlaceholder, content: finalText, isStreaming: false },
              ],
            };
            setSessions((prev) => [newSession, ...prev]);
            setActiveSessionId(newSession.id);
          } else {
            setSessions((prev) =>
              prev.map((s) =>
                s.id === activeSessionId
                  ? {
                      ...s,
                      messages: [
                        ...updatedMessages,
                        { ...assistantMessagePlaceholder, content: finalText, isStreaming: false },
                      ],
                    }
                  : s
              )
            );
          }
        },
        onStopped: (partialText) => {
          setInferenceStatus("stopped");
          setStatusText("Simulated generation stopped by user.");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: partialText + "\n\n*(Generation stopped by user)*",
                    isStreaming: false,
                  }
                : msg
            )
          );
        },
        onError: (err) => {
          setInferenceStatus("error");
          setStatusText("Simulated generation error.");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      "An unexpected simulation error occurred. Please try regenerating the evaluation.",
                    isError: true,
                    isStreaming: false,
                  }
                : msg
            )
          );
        },
      }
    );

    abortStreamRef.current = cancelFn;
  };

  const handleStopGeneration = () => {
    if (abortStreamRef.current) {
      abortStreamRef.current();
      abortStreamRef.current = null;
    }
  };

  const handleRegenerate = () => {
    // Find last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      // Remove last assistant message
      setMessages((prev) => prev.slice(0, prev.length - 1));
      executeInference(lastUserMsg.content);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      executeInference(inputValue);
    }
  };

  const isGenerating =
    inferenceStatus === "preparing" || inferenceStatus === "streaming";

  const activeCategory =
    PROMPT_CATEGORIES.find((c) => c.id === selectedCategoryTab) ||
    PROMPT_CATEGORIES[0];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col h-[720px] max-h-[85vh]">
      {/* Demonstration Mode Notice Banner */}
      <div className="bg-amber-500/10 border-b border-amber-200/80 px-4 py-2 text-[11px] text-amber-900 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 font-medium">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span>
            <strong>Demonstration Mode:</strong> AI responses in this workspace are simulated for evaluation until a production inference runtime is attached.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-amber-700 font-bold hidden sm:inline">
          Local Mock Engine
        </span>
      </div>

      {/* Top Workspace Toolbar */}
      <div className="border-b border-slate-200/80 p-3 sm:p-4 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* History Sidebar Drawer Toggle (Mobile & Desktop) */}
          <button
            type="button"
            onClick={() => setHistoryOpen(!historyOpen)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition ${
              historyOpen
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
            title="Toggle Demonstration Session History"
            aria-label="Toggle Conversation History Drawer"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">History</span>
            <span className="rounded-full bg-slate-200 px-1.5 py-0.2 text-[10px] font-mono font-bold">
              {sessions.length}
            </span>
          </button>

          {/* Model Selector */}
          <ModelSelector
            selectedModelId={selectedModelId}
            onSelectModel={(id) => setSelectedModelId(id)}
            disabled={isGenerating}
          />

          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleNewSession}
            disabled={isGenerating}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
            title="Start New Conversation"
          >
            <Plus className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden sm:inline">New Session</span>
          </button>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClearCurrentChat}
              disabled={isGenerating}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition disabled:opacity-50"
              title="Clear current message history"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}

          {/* Context Selector */}
          <ContextSelector
            selectedContextId={selectedContextId}
            onSelectContext={handleContextChange}
            disabled={isGenerating}
          />
        </div>
      </div>

      {/* Main Workspace Body (History Drawer + Chat Stream) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Collapsible History Sidebar */}
        {historyOpen && (
          <div className="w-64 sm:w-72 shrink-0 z-20 h-full animate-in slide-in-from-left duration-200">
            <ConversationHistory
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={handleSelectSession}
              onNewSession={handleNewSession}
              onDeleteSession={handleDeleteSession}
              onClearAll={handleClearAllSessions}
            />
          </div>
        )}

        {/* Chat Messages Stream */}
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Empty State / Suggested Prompt Cards */}
            {messages.length === 0 && (
              <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-3 shadow-xs">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Quintos AI Research Workspace
                  </h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Select a conceptual research prompt or formulate an algorithmic deduction for simulated evaluation.
                  </p>
                </div>

                {/* Prompt Categories Tabs */}
                <div>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap pb-2 border-b border-slate-100">
                    {PROMPT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategoryTab(cat.id)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                          selectedCategoryTab === cat.id
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Prompts Grid */}
                  <div className="grid gap-3 sm:grid-cols-2 mt-4 text-left">
                    {activeCategory.prompts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedModelId(p.modelId);
                          setSelectedContextId(p.contextId);
                          executeInference(p.prompt);
                        }}
                        className="rounded-2xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50/30 transition group"
                      >
                        <span className="block font-mono text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                          {p.category} &bull; {p.modelId.replace("quintos-", "")}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition mt-1">
                          {p.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                          {p.prompt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Message History Stream */}
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              const isLastAssistant =
                !isUser &&
                index === messages.length - 1 &&
                inferenceStatus !== "streaming" &&
                inferenceStatus !== "preparing";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-4 sm:p-5 max-w-[90%] sm:max-w-[82%] leading-relaxed ${
                      isUser
                        ? "bg-blue-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-slate-50/50 text-slate-900 shadow-2xs"
                    }`}
                  >
                    {/* Header for Assistant Messages */}
                    {!isUser && (
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-700">
                            {msg.modelName || activeModel.name}
                          </span>
                          <span className="rounded bg-slate-200/80 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-slate-700">
                            Demonstration Output
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}

                    {/* Message Body */}
                    {isUser ? (
                      <p className="text-xs sm:text-sm whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    ) : (
                      <MarkdownRenderer
                        content={msg.content}
                        isStreaming={msg.isStreaming}
                      />
                    )}

                    {/* Footer Actions for Assistant Messages */}
                    {!isUser && !msg.isStreaming && (
                      <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200/60 transition"
                            title="Copy response text"
                          >
                            {copiedMessageId === msg.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Response</span>
                              </>
                            )}
                          </button>

                          {isLastAssistant && (
                            <button
                              type="button"
                              onClick={handleRegenerate}
                              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200/60 transition"
                              title="Regenerate simulated response"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>Regenerate</span>
                            </button>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-slate-400 italic">
                          Simulated Research Output
                        </span>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white shadow-xs mt-1">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Generation Status Bar (ARIA live) */}
          {isGenerating && (
            <div
              aria-live="polite"
              className="bg-blue-50 border-t border-blue-200 px-4 py-2 text-xs text-blue-900 flex items-center justify-between gap-3 shrink-0"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                <span className="font-mono text-xs">{statusText}</span>
              </div>

              <button
                type="button"
                onClick={handleStopGeneration}
                className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition"
                aria-label="Stop simulated generation"
              >
                <Square className="h-3 w-3 fill-current" />
                <span>Stop Generation</span>
              </button>
            </div>
          )}

          {/* Bottom Prompt Input Area */}
          <div className="p-3 sm:p-4 border-t border-slate-200/80 bg-slate-50/60 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeInference(inputValue);
              }}
              className="relative rounded-2xl border border-slate-300 bg-white p-2 shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition"
            >
              <textarea
                rows={2}
                placeholder={`Ask ${activeModel.name} regarding ${selectedContextId.replace("-", " ")}... (Shift+Enter for new line)`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
                className="w-full resize-none border-none bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              />

              <div className="flex items-center justify-between pt-1 px-2">
                <span className="text-[10px] font-mono text-slate-400">
                  {activeModel.name} &bull; Demonstration Mode
                </span>

                <div className="flex items-center gap-2">
                  {isGenerating ? (
                    <button
                      type="button"
                      onClick={handleStopGeneration}
                      className="inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition"
                      aria-label="Stop generation"
                    >
                      <Square className="h-3.5 w-3.5 fill-current" />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-40 transition"
                      aria-label="Transmit evaluation prompt"
                    >
                      <span>Transmit</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}