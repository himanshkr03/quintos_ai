// File: E:\quintos_ai\app\(dashboard)\dashboard\page.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Brain,
  Bot,
  Cpu,
  Database,
  AlertTriangle,
  Server,
  Activity,
  Layers,
  CheckCircle2,
  Loader2,
  RefreshCw,
  FolderGit2,
  KeyRound,
  MessageSquare,
} from "lucide-react";

import {
  StatsCard,
  UsageCard,
  ActivityCard,
  ModelCard,
} from "@/components/dashboard/cards";

import {
  UsageChart,
  RevenueChart,
  ActivityChart,
} from "@/components/dashboard/charts";

import {
  QuickActions,
  RecentActivity,
  Notifications,
} from "@/components/dashboard/widgets";

import { ChatWidget } from "@/components/dashboard/ai";
import { useAuth } from "@/providers";

interface LiveDashboardStats {
  totalRequests: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  totalComputeUnits: number;
  activeProjects: number;
  totalConversations: number;
  activeApiKeys: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<LiveDashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoadingStats(true);
    setStatsError(null);
    try {
      const res = await fetch("/api/dashboard/stats");
      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setStats(data.stats);
        }
      } else if (res.status === 401) {
        // Unauthenticated demo view
        setStats(null);
      } else {
        setStatsError("Unable to synchronize live telemetry.");
      }
    } catch (err) {
      console.warn("[Fetch Dashboard Stats Warning]:", err);
      setStatsError("Network error while synchronizing telemetry.");
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page Heading & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-0.5 text-[11px] font-mono font-bold text-blue-700 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            Sovereign Lab Environment
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Research Workspace Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Monitor model telemetry, GPU compute allocations, and active inference pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchStats}
            disabled={isLoadingStats}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition shadow-2xs disabled:opacity-50"
            title="Refresh telemetry"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoadingStats ? "animate-spin" : ""}`}
            />
          </button>
          <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
            Region: India Central (Sovereign)
          </span>
        </div>
      </div>

      {/* Mode Status Notice Banner */}
      {user && stats ? (
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 p-4 text-xs text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">
              Live Database Telemetry Synchronized
            </strong>
            <p className="mt-0.5 text-emerald-800 leading-relaxed">
              Displaying live organization metrics, active research containers, and compute consumption from PostgreSQL.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Research Workspace Mode</strong>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              Telemetry counts and compute quotas are scoped to your active research organization. Sign in to track live production invocations and compute hours.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Invocations"
          value={
            isLoadingStats
              ? "..."
              : stats
              ? stats.totalRequests.toLocaleString()
              : "0"
          }
          icon={Bot}
          change={stats ? `${stats.totalRequests} logged` : "0 logged"}
        />

        <StatsCard
          title="Active Projects"
          value={
            isLoadingStats
              ? "..."
              : stats
              ? stats.activeProjects.toString()
              : "1"
          }
          icon={FolderGit2}
          change="Isolated"
        />

        <StatsCard
          title="AI Conversations"
          value={
            isLoadingStats
              ? "..."
              : stats
              ? stats.totalConversations.toString()
              : "0"
          }
          icon={MessageSquare}
          change="Indexed"
        />

        <StatsCard
          title="Compute Units (CU)"
          value={
            isLoadingStats
              ? "..."
              : stats
              ? stats.totalComputeUnits.toString()
              : "0.0"
          }
          icon={Cpu}
          change="Sovereign"
        />
      </div>

      {/* Flagship AI Evaluation Research Workspace */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            AI Research Evaluation Workspace
          </h2>
          <p className="text-xs text-slate-500">
            Formulate research prompts, switch reasoning models, and test domain-specific outputs in streaming mode.
          </p>
        </div>

        <ChatWidget />
      </div>

      {/* Model Runtimes Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Sovereign Research Model Endpoints
          </h2>
          <p className="text-xs text-slate-500">
            Active neural models accessible via programmatic SDK and private VPC clusters.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ModelCard
            name="Quintos Reasoning v1"
            provider="Quintos AI Labs"
            description="Algorithmic deduction and test-time compute search model."
            status="active"
          />

          <ModelCard
            name="Quintos Bio-Vision 3D"
            provider="Perception Systems"
            description="3D volumetric MRI and CT segmentation perception engine."
            status="active"
          />

          <ModelCard
            name="Quintos Quantum VQE"
            provider="Quantum ML Research"
            description="NISQ variational quantum eigensolver molecular simulation."
            status="standby"
          />
        </div>
      </div>

      {/* Telemetry Charts & Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              System Telemetry & Throughput
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Token throughput, compute usage, and weekly request distribution.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <UsageChart />
              <ActivityChart />
            </div>
          </div>

          <RevenueChart />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <QuickActions />

          <div className="space-y-6">
            <UsageCard
              title="Compute Quota"
              used={stats?.totalComputeUnits || 0}
              total={100}
            />

            <UsageCard
              title="Active API Keys"
              used={stats?.activeApiKeys || 0}
              total={10}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity & System Logs */}
      <div className="grid gap-8 lg:grid-cols-2">
        <RecentActivity />
        <Notifications />
      </div>
    </div>
  );
}