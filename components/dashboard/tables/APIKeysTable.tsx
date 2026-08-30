// File: E:\quintos_ai\components\dashboard\tables\APIKeysTable.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  KeyRound,
  Plus,
  Copy,
  Check,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Terminal,
  X,
  Sparkles,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";

export interface LiveApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  environment: "PRODUCTION" | "STAGING" | "EVALUATION";
  status: "ACTIVE" | "REVOKED" | "EXPIRED";
  createdAt: string;
  lastUsedAt: string | null;
}

export default function APIKeysTable() {
  const [keys, setKeys] = useState<LiveApiKey[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [activeSnippetTab, setActiveSnippetTab] = useState<
    "python" | "typescript" | "curl"
  >("python");
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Modal State
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState<
    "PRODUCTION" | "STAGING" | "EVALUATION"
  >("PRODUCTION");
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdKeySecret, setCreatedKeySecret] = useState<string | null>(null);
  const [revokeConfirmId, setRevokeConfirmId] = useState<string | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);

  const fetchKeys = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/api-keys");
      if (!res.ok) {
        if (res.status === 401) {
          setErrorMessage("Sign in required to view organization API keys.");
        } else {
          const errData = await res.json().catch(() => ({}));
          setErrorMessage(errData?.error?.message || "Failed to load API keys.");
        }
        setKeys([]);
        return;
      }
      const data = await res.json();
      setKeys(data.apiKeys || []);
    } catch (err) {
      console.error("[Fetch API Keys Error]:", err);
      setErrorMessage("Network error while loading API keys.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim() || isGenerating) return;

    setIsGenerating(true);
    setActionError(null);

    try {
      const res = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newKeyName.trim(),
          environment: newKeyEnv,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setActionError(data?.error?.message || "Failed to generate API key.");
        setIsGenerating(false);
        return;
      }

      setCreatedKeySecret(data.secret);
      await fetchKeys();
    } catch (err) {
      console.error("[Generate Key Exception]:", err);
      setActionError("An unexpected error occurred while creating the key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseModal = () => {
    setGenerateModalOpen(false);
    setNewKeyName("");
    setCreatedKeySecret(null);
    setActionError(null);
  };

  const handleRevokeKey = async (id: string) => {
    if (isRevoking) return;
    setIsRevoking(true);
    setActionError(null);

    try {
      const res = await fetch(`/api/api-keys?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setActionError(data?.error?.message || "Failed to revoke API key.");
        setIsRevoking(false);
        return;
      }

      setRevokeConfirmId(null);
      await fetchKeys();
    } catch (err) {
      console.error("[Revoke Key Exception]:", err);
      setActionError("Failed to revoke API key.");
    } finally {
      setIsRevoking(false);
    }
  };

  const activeKeyPrefix = keys.find((k) => k.status === "ACTIVE")?.keyPrefix;
  const previewToken = activeKeyPrefix
    ? `${activeKeyPrefix}_xxxxxxxxxxxxxxxx`
    : "qnt_live_xxxxxxxxxxxxxxxx";

  const snippets = {
    python: `import quintos

# Initialize Quintos AI Research Client
client = quintos.Client(api_key="${previewToken}")

response = client.reasoning.generate(
    model="quintos-reasoning-v1",
    prompt="Formulate variational quantum ansatz for molecular ground state.",
    temperature=0.2
)

print(response.output)`,
    typescript: `import { QuintosAI } from "@quintos/sdk";

const client = new QuintosAI({
  apiKey: "${previewToken}",
});

async function main() {
  const result = await client.reasoning.generate({
    model: "quintos-reasoning-v1",
    prompt="Formulate variational quantum ansatz for molecular ground state.",
  });
  console.log(result.output);
}

main();`,
    curl: `curl -X POST https://api.quintos.ai/v1/reasoning/generate \\
  -H "Authorization: Bearer ${previewToken}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "quintos-reasoning-v1",
    "prompt": "Formulate variational quantum ansatz for molecular ground state."
  }'`,
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(snippets[activeSnippetTab]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-900 flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={fetchKeys}
            className="inline-flex items-center gap-1 font-semibold text-red-700 hover:text-red-900"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Main Keys Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Active API Keys</h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage secret keys for programmatic inference and sovereign VPC runtimes.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchKeys}
              disabled={isLoading}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
              title="Refresh API keys"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setGenerateModalOpen(true)}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Generate New Key
            </Button>
          </div>
        </div>

        {/* Keys Table / States */}
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-500 space-y-3">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
            <p className="font-mono">Loading organization API credentials...</p>
          </div>
        ) : keys.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500 space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs">
              <KeyRound className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No API Keys Generated Yet</h3>
            <p className="max-w-md mx-auto text-slate-500 text-xs">
              Create your first API key to enable programmatic access to Quintos AI reasoning runtimes and SDK components.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setGenerateModalOpen(true)}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Generate First Key
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 text-left font-semibold">Key Name</th>
                  <th className="py-3 text-left font-semibold">Environment</th>
                  <th className="py-3 text-left font-semibold">Key Prefix</th>
                  <th className="py-3 text-left font-semibold">Created</th>
                  <th className="py-3 text-left font-semibold">Last Invocation</th>
                  <th className="py-3 text-left font-semibold">Status</th>
                  <th className="py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {keys.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-blue-600" />
                        <span>{k.name}</span>
                      </div>
                    </td>

                    <td className="py-4 font-mono text-slate-600">
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px]">
                        {k.environment}
                      </span>
                    </td>

                    <td className="py-4 font-mono text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">
                          {k.keyPrefix}...
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(k.id, k.keyPrefix)}
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                          title="Copy Prefix"
                        >
                          {copiedKeyId === k.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-4 font-mono text-slate-500">
                      {new Date(k.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 font-mono text-slate-500">
                      {k.lastUsedAt
                        ? new Date(k.lastUsedAt).toLocaleDateString()
                        : "Never"}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          k.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            k.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {k.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      {k.status === "ACTIVE" ? (
                        <button
                          type="button"
                          onClick={() => setRevokeConfirmId(k.id)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Revoke</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Revoked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Code Snippets Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Code2 className="h-4 w-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                SDK & API Integration
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Quickstart Code Example
            </h3>
          </div>

          {/* Snippet Tabs */}
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-800/90 p-1 border border-slate-700">
            {(["python", "typescript", "curl"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveSnippetTab(tab)}
                className={`rounded-lg px-3 py-1 text-xs font-mono font-medium capitalize transition ${
                  activeSnippetTab === tab
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4">
          <button
            type="button"
            onClick={handleCopySnippet}
            className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/90 px-2.5 py-1 text-xs font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            {copiedSnippet ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-blue-200 leading-relaxed">
            <code>{snippets[activeSnippetTab]}</code>
          </pre>
        </div>
      </div>

      {/* Modal: Generate New Secret Key */}
      {generateModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-generate-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!createdKeySecret ? (
              <form onSubmit={handleGenerateKey} className="space-y-4">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Credential Provisioning
                  </span>
                  <h3
                    id="modal-generate-title"
                    className="text-lg font-bold text-slate-900 mt-1"
                  >
                    Generate Secret API Key
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assign a memorable identifier to track inference across research clusters.
                  </p>
                </div>

                {actionError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{actionError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Key Identifier Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Biomedical Inference Worker"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    disabled={isGenerating}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Environment
                  </label>
                  <select
                    value={newKeyEnv}
                    onChange={(e) =>
                      setNewKeyEnv(
                        e.target.value as "PRODUCTION" | "STAGING" | "EVALUATION"
                      )
                    }
                    disabled={isGenerating}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  >
                    <option value="PRODUCTION">Production (Sovereign VPC)</option>
                    <option value="STAGING">Research Staging (Sandbox)</option>
                    <option value="EVALUATION">Evaluation (Rate Limited)</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={isGenerating}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isGenerating}
                    leftIcon={
                      isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : undefined
                    }
                  >
                    {isGenerating ? "Generating..." : "Generate Secret Key"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Key Generated Successfully
                  </h3>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 space-y-1">
                  <strong className="block font-semibold">Save your secret key now:</strong>
                  <p className="leading-relaxed">
                    For security, this secret key will NEVER be displayed again. If you lose it, you will need to generate a new key.
                  </p>
                </div>

                <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-900 break-all pr-12">
                  <span>{createdKeySecret}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy("newly-created", createdKeySecret)}
                    className="absolute top-2.5 right-2.5 rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 hover:bg-slate-100 transition"
                    title="Copy Key"
                  >
                    {copiedKeyId === "newly-created" ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleCloseModal}
                  >
                    I Have Saved My Key
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Revoke Confirmation */}
      {revokeConfirmId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-base font-bold text-slate-900">
                Confirm Key Revocation
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to revoke this API key? Any active pipelines, SDK clients, or services using this key will immediately lose access to Quintos AI runtimes.
            </p>

            {actionError && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-800">
                {actionError}
              </div>
            )}

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRevokeConfirmId(null)}
                disabled={isRevoking}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRevokeKey(revokeConfirmId)}
                disabled={isRevoking}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                {isRevoking && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>{isRevoking ? "Revoking..." : "Revoke Key"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}