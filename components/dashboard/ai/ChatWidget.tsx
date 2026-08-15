// File: E:\quintos_ai\components\dashboard\ai\ChatWidget.tsx

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
  const [isLiveStream, setIsLiveStream] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeModel =
    RESEARCH_MODELS.find((m) => m.id === selectedModelId) || RESEARCH_MODELS[0];

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, inferenceStatus]);

  // Load user conversations from API on mount
  useEffect(() => {
    async function loadConversations() {
      try {
        const res = await fetch("/api/ai/conversations");
        if (res.ok) {
          const data = await res.json();
          if (data.conversations && data.conversations.length > 0) {
            const mappedSessions: ConversationSession[] = data.conversations.map(
              (c: {
                id: string;
                title: string;
                model: string;
                context: string;
                updatedAt: string;
                messages?: {
                  id: string;
                  role: string;
                  content: string;
                  createdAt: string;
                  tokens?: number;
                }[];
              }) => ({
                id: c.id,
                title: c.title,
                modelId: (c.model as ModelId) || "quintos-reasoning-v1",
                contextId: (c.context as WorkspaceContextId) || "general-research",
                updatedAt: new Date(c.updatedAt).toLocaleDateString(),
                group: "Today",
                messages: (c.messages || []).map((m) => ({
                  id: m.id,
                  role: m.role.toLowerCase() as "user" | "assistant",
                  content: m.content,
                  timestamp: new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  tokens: m.tokens,
                })),
              })
            );
            setSessions(mappedSessions);
            if (mappedSessions[0]) {
              setActiveSessionId(mappedSessions[0].id);
              setMessages(mappedSessions[0].messages);
            }
          }
        }
      } catch {
        // Fallback to local demo sessions
      }
    }
    loadConversations();
  }, []);

  // Sync active session selection
  const handleSelectSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setActiveSessionId(session.id);
    setSelectedModelId(session.modelId);
    setSelectedContextId(session.contextId);
    setMessages(session.messages);
    setInferenceStatus("idle");
    setHistoryOpen(false);
  };

  const handleNewSession = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setActiveSessionId(null);
    setMessages([]);
    setInferenceStatus("idle");
    setInputValue("");
    setHistoryOpen(false);
  };

  const handleDeleteSession = async (sessionId: string) => {
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);

    if (activeSessionId === sessionId) {
      if (updated.length > 0) {
        handleSelectSession(updated[0].id);
      } else {
        handleNewSession();
      }
    }

    try {
      await fetch(`/api/ai/conversations?id=${sessionId}`, {
        method: "DELETE",
      });
    } catch {
      // Local state already updated
    }
  };

  const handleClearCurrentChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
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

  const executeInference = async (promptContent: string) => {
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
    setStatusText("Connecting to inference backend...");

    // Create assistant streaming placeholder
    const assistantMessageId = `ast-${Date.now()}`;
    const assistantMessagePlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      modelId: selectedModelId,
      modelName: activeModel.name,
      contextId: selectedContextId,
      content: "",
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...updatedMessages, assistantMessagePlaceholder]);

    // Setup AbortController for cancel / stop generation
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let accumulatedText = "";
    let capturedSessionId = activeSessionId;

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: promptContent.trim(),
          model: selectedModelId,
          context: selectedContextId,
          conversationId: activeSessionId || undefined,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        let errorMsg = `Inference failed (HTTP ${response.status})`;
        try {
          const errJson = await response.json();
          if (errJson.error?.message) {
            errorMsg = errJson.error.message;
          }
        } catch {
          // Fallback
        }
        throw new Error(errorMsg);
      }

      if (!response.body) {
        throw new Error("No response body received from stream.");
      }

      setInferenceStatus("streaming");
      setStatusText(`Streaming response from ${activeModel.name}...`);
      setIsLiveStream(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(":")) continue;

          if (trimmed === "data: [DONE]") {
            break;
          }

          if (trimmed.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmed.slice(6));

              if (data.type === "start" && data.conversationId) {
                capturedSessionId = data.conversationId;
                if (!activeSessionId) {
                  setActiveSessionId(data.conversationId);
                }
              }

              if (data.type === "delta" && data.text) {
                accumulatedText += data.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: accumulatedText, isStreaming: true }
                      : msg
                  )
                );
              }

              if (data.type === "complete") {
                setInferenceStatus("complete");
                setStatusText("");
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? {
                          ...msg,
                          content: accumulatedText,
                          isStreaming: false,
                          tokens: data.usage?.totalTokens,
                        }
                      : msg
                  )
                );
              }

              if (data.type === "error") {
                throw new Error(data.error || "Inference streaming error");
              }
            } catch (jsonErr) {
              if (jsonErr instanceof Error && jsonErr.message.includes("Inference")) {
                throw jsonErr;
              }
            }
          }
        }
      }

      setInferenceStatus("complete");
      setStatusText("");

      // Update session history
      const newSessionTitle =
        promptContent.length > 32
          ? `${promptContent.substring(0, 32)}...`
          : promptContent;

      if (!activeSessionId) {
        const newSession: ConversationSession = {
          id: capturedSessionId || `sess-${Date.now()}`,
          title: newSessionTitle,
          modelId: selectedModelId,
          contextId: selectedContextId,
          updatedAt: "Just now",
          group: "Today",
          messages: [
            ...updatedMessages,
            { ...assistantMessagePlaceholder, content: accumulatedText, isStreaming: false },
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
                    { ...assistantMessagePlaceholder, content: accumulatedText, isStreaming: false },
                  ],
                }
              : s
          )
        );
      }
    } catch (err) {
      if (abortController.signal.aborted) {
        setInferenceStatus("stopped");
        setStatusText("Inference generation stopped by user.");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: accumulatedText + "\n\n*(Generation stopped by user)*",
                  isStreaming: false,
                }
              : msg
          )
        );
      } else {
        const errMsg = err instanceof Error ? err.message : "Inference error occurred";
        setInferenceStatus("error");
        setStatusText(errMsg);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: `### Runtime Exception\n\n> [!WARNING]\n> ${errMsg}\n\nPlease check server provider configuration or try again.`,
                  isStreaming: false,
                  isError: true,
                }
              : msg
          )
        );
      }
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] min-h-[580px] w-full flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden lg:flex-row">
      {/* Sidebar: Conversation History */}
      <ConversationHistory
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />

      {/* Main Workspace Column */}
      <div className="flex flex-1 flex-col h-full bg-slate-50/50 overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* History Toggle (Mobile / Drawer) */}
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle Conversation History"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden xs:inline">Sessions</span>
            </button>

            {/* Model Selector */}
            <ModelSelector
              selectedModelId={selectedModelId}
              onSelectModel={(id) => setSelectedModelId(id)}
              disabled={inferenceStatus === "streaming"}
            />

            {/* Context Selector */}
            <ContextSelector
              selectedContextId={selectedContextId}
              onSelectContext={handleContextChange}
              disabled={inferenceStatus === "streaming"}
            />
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Runtime Mode Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-2.5 py-1 text-[11px] font-mono text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>SSE Stream</span>
            </div>

            {/* Clear Chat */}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearCurrentChat}
                disabled={inferenceStatus === "streaming"}
                className="inline-flex items-center gap-1 rounded-xl p-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                title="Clear current view"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}

            {/* New Session */}
            <button
              type="button"
              onClick={handleNewSession}
              disabled={inferenceStatus === "streaming"}
              className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">New Session</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            /* Empty State / Prompt Library */
            <div className="flex flex-col items-center justify-center min-h-[380px] max-w-2xl mx-auto text-center space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs">
                <Brain className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {activeModel.name} Research Workspace
                </h2>
                <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                  {activeModel.description}
                </p>
              </div>

              {/* Category Tab Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryTab(cat.id)}
                    className={`rounded-xl px-3 py-1 text-xs font-medium transition ${
                      selectedCategoryTab === cat.id
                        ? "bg-blue-600 text-white shadow-2xs font-bold"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Category Prompt Grid */}
              <div className="grid gap-2.5 sm:grid-cols-2 w-full pt-2">
                {PROMPT_CATEGORIES.find(
                  (c) => c.id === selectedCategoryTab
                )?.prompts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedModelId(item.modelId);
                      setSelectedContextId(item.contextId);
                      executeInference(item.prompt);
                    }}
                    className="flex flex-col text-left rounded-xl border border-slate-200 bg-white p-3 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-2xs transition group"
                  >
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      {item.title}
                    </span>
                    <span className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                      {item.prompt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Render Message Stream */
            messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${
                    isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      isUser
                        ? "bg-slate-900 text-white"
                        : "bg-blue-600 text-white shadow-2xs"
                    }`}
                  >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col space-y-1 max-w-[88%] sm:max-w-[80%]">
                    {/* Header */}
                    <div
                      className={`flex items-center gap-2 text-[11px] font-mono text-slate-400 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className="font-semibold text-slate-600">
                        {isUser ? "You" : msg.modelName || activeModel.name}
                      </span>
                      <span>&bull;</span>
                      <span>{msg.timestamp}</span>
                      {msg.tokens && (
                        <>
                          <span>&bull;</span>
                          <span className="text-blue-600 font-bold">{msg.tokens} tokens</span>
                        </>
                      )}
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        isUser
                          ? "bg-blue-600 text-white shadow-2xs"
                          : msg.isError
                          ? "border border-red-200 bg-red-50 text-red-900"
                          : "border border-slate-200/80 bg-white text-slate-900 shadow-2xs"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <MarkdownRenderer content={msg.content} isStreaming={msg.isStreaming} />
                      )}
                    </div>

                    {/* Footer Actions */}
                    {!isUser && msg.content && (
                      <div className="flex items-center gap-2 pt-0.5 pl-1">
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-slate-400 hover:text-slate-700 transition"
                          title="Copy response"
                        >
                          {copiedMessageId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Live Status Indicator */}
        {inferenceStatus !== "idle" && statusText && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-1.5 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{statusText}</span>
            </div>

            {inferenceStatus === "streaming" && (
              <button
                type="button"
                onClick={handleStopGeneration}
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-bold text-red-600 hover:bg-red-50 transition"
              >
                <Square className="h-2.5 w-2.5 fill-red-600" />
                <span>Stop Stream</span>
              </button>
            )}
          </div>
        )}

        {/* Input Prompt Box */}
        <div className="border-t border-slate-200/80 bg-white p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeInference(inputValue);
            }}
            className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-2 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition"
          >
            <textarea
              rows={2}
              placeholder={`Inquire with ${activeModel.name} (${activeModel.domain})...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  executeInference(inputValue);
                }
              }}
              disabled={inferenceStatus === "streaming"}
              className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none"
            />

            <div className="flex items-center gap-1.5 pb-0.5">
              {inferenceStatus === "streaming" ? (
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white shadow-2xs hover:bg-red-700 transition"
                  title="Stop generation"
                >
                  <Square className="h-4 w-4 fill-white" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  title="Send prompt"
                >
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-400 font-mono">
            <span>Shift + Enter for new line</span>
            <span>Quintos AI Inference Runtime</span>
          </div>
        </div>
      </div>
    </div>
  );
}