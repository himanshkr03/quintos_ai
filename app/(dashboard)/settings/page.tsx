// File: E:\quintos_ai\app\(dashboard)\settings\page.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Cpu,
  Database,
  Globe,
  Lock,
  Save,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Shield,
  Layers,
  Loader2,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";
import { useAuth } from "@/providers";

export default function SettingsPage() {
  const { user } = useAuth();
  const [defaultModel, setDefaultModel] = useState<
    | "quintos-reasoning-v1"
    | "quintos-bio-vision-3d"
    | "quintos-quantum-vqe"
    | "quintos-secure-llm"
  >("quintos-reasoning-v1");
  const [dataResidency, setDataResidency] = useState<
    "in-sovereign" | "eu-sovereign" | "us-dedicated"
  >("in-sovereign");
  const [latencyBudget, setLatencyBudget] = useState<
    "balanced" | "low-latency" | "batch"
  >("balanced");
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [quotaAlerts, setQuotaAlerts] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            if (data.settings.defaultModel) setDefaultModel(data.settings.defaultModel);
            if (data.settings.dataResidency) setDataResidency(data.settings.dataResidency);
            if (data.settings.latencyBudget) setLatencyBudget(data.settings.latencyBudget);
            if (typeof data.settings.weeklyDigest === "boolean")
              setWeeklyDigest(data.settings.weeklyDigest);
            if (typeof data.settings.quotaAlerts === "boolean")
              setQuotaAlerts(data.settings.quotaAlerts);
            if (typeof data.settings.anomalyAlerts === "boolean")
              setAnomalyAlerts(data.settings.anomalyAlerts);
          }
        }
      } catch (err) {
        console.warn("[Fetch Settings Warning]:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setToastMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          defaultModel,
          dataResidency,
          latencyBudget,
          weeklyDigest,
          quotaAlerts,
          anomalyAlerts,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data?.error?.message || "Failed to persist workspace settings.");
        setIsSaving(false);
        return;
      }

      setToastMessage("Workspace preferences saved successfully to database.");
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      console.error("[Save Settings Exception]:", err);
      setErrorMessage("Network error occurred while persisting settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Feedback */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-900 flex items-center gap-2.5 animate-in fade-in"
        >
          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Workspace Settings & Compute Defaults
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Configure default AI model routing, sovereign data residency, latency budgets, and alert triggers.
        </p>
      </div>

      {/* Mode Notice */}
      {user ? (
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-4 text-xs text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Live Workspace Configuration</strong>
            <p className="mt-0.5 text-emerald-800 leading-relaxed">
              Settings are saved directly to your PostgreSQL research organization profile and enforce sovereign cluster dispatch rules.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Demonstration Mode &bull; Local Settings</strong>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              Sign in with an authenticated session to persist organization-wide routing policies and compute alert channels.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Computing & Model Defaults Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-100 pb-4">
            <Cpu className="h-5 w-5 text-blue-600" />
            <span>AI Model & Computing Defaults</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Default Model */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Default Reasoning Model
              </label>
              <select
                value={defaultModel}
                onChange={(e) =>
                  setDefaultModel(
                    e.target.value as
                      | "quintos-reasoning-v1"
                      | "quintos-bio-vision-3d"
                      | "quintos-quantum-vqe"
                      | "quintos-secure-llm"
                  )
                }
                disabled={isSaving || isLoading}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
              >
                <option value="quintos-reasoning-v1">Quintos Reasoning v1 (Mathematical & Logic)</option>
                <option value="quintos-bio-vision-3d">Quintos Bio-Vision 3D (Medical Perception)</option>
                <option value="quintos-quantum-vqe">Quintos Quantum VQE (NISQ Simulation)</option>
                <option value="quintos-secure-llm">Quintos Secure LLM (Air-Gapped Node)</option>
              </select>
            </div>

            {/* Sovereign Data Residency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Sovereign Data Residency Zone
              </label>
              <select
                value={dataResidency}
                onChange={(e) =>
                  setDataResidency(
                    e.target.value as "in-sovereign" | "eu-sovereign" | "us-dedicated"
                  )
                }
                disabled={isSaving || isLoading}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
              >
                <option value="in-sovereign">India Sovereign VPC (Primary Lab Base)</option>
                <option value="eu-sovereign">EU Sovereign Zone (Frankfurt Air-Gapped)</option>
                <option value="us-dedicated">US East Dedicated Bare-Metal Cluster</option>
              </select>
            </div>
          </div>

          {/* Latency Optimization Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Inference Latency Profile
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  id: "balanced" as const,
                  title: "Balanced Throughput",
                  desc: "Optimal trade-off between batch throughput and token latency.",
                },
                {
                  id: "low-latency" as const,
                  title: "Ultra-Low Latency",
                  desc: "Prioritizes immediate time-to-first-token for interactive applications.",
                },
                {
                  id: "batch" as const,
                  title: "High-Density Batch",
                  desc: "Maximized compute utilization for heavy offline dataset processing.",
                },
              ].map((profile) => {
                const isSelected = latencyBudget === profile.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setLatencyBudget(profile.id)}
                    disabled={isSaving || isLoading}
                    className={`rounded-xl border p-3.5 text-left transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-900">
                      {profile.title}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {profile.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Telemetry & Alerting Preferences */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-100 pb-4">
            <Bell className="h-5 w-5 text-blue-600" />
            <span>Alerts & Telemetry Preferences</span>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Weekly Compute Digest
                </span>
                <p className="text-xs text-slate-500">
                  Receive email summaries of model invocations and GPU credits.
                </p>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                disabled={isSaving || isLoading}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="text-xs font-bold text-slate-900">
                  GPU Quota Alerts (80% & 95%)
                </span>
                <p className="text-xs text-slate-500">
                  Alert when monthly compute quota reaches threshold milestones.
                </p>
              </div>
              <input
                type="checkbox"
                checked={quotaAlerts}
                onChange={(e) => setQuotaAlerts(e.target.checked)}
                disabled={isSaving || isLoading}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Perception Anomaly Flagging
                </span>
                <p className="text-xs text-slate-500">
                  Real-time alerts when 3D volumetric segmentation confidence drops below threshold.
                </p>
              </div>
              <input
                type="checkbox"
                checked={anomalyAlerts}
                onChange={(e) => setAnomalyAlerts(e.target.checked)}
                disabled={isSaving || isLoading}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSaving || isLoading}
            leftIcon={
              isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )
            }
          >
            {isSaving ? "Saving Preferences..." : "Save Preferences"}
          </Button>
        </div>
      </form>
    </div>
  );
}