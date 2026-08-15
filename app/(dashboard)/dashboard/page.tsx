// File: E:\quintos_ai\app\(dashboard)\dashboard\page.tsx

import {
  Brain,
  Bot,
  Cpu,
  Database,
  AlertTriangle,
  Server,
  Activity,
  Layers,
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

export const metadata = {
  title: "Research Workspace & Dashboard | Quintos AI",
  description: "Enterprise AI workspace overview, sovereign compute quotas, and model telemetry.",
};

export default function DashboardPage() {
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
          <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
            Region: India Central (Sovereign)
          </span>
        </div>
      </div>

      {/* Global Demonstration Notice Banner */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Demonstration Workspace Mode</strong>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            All telemetry counts, GPU hours, simulated model latencies, and billing quotas shown below are illustrative mock data for platform interface evaluation.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Simulated Invocations"
          value="18,420"
          icon={Bot}
          change="+18% (Demo)"
        />

        <StatsCard
          title="Active Research Models"
          value="4"
          icon={Brain}
          change="Sovereign"
        />

        <StatsCard
          title="Evaluated Datasets"
          value="87"
          icon={Database}
          change="+9 (Demo)"
        />

        <StatsCard
          title="GPU Compute Hours"
          value="624"
          icon={Cpu}
          change="+32% (Demo)"
        />
      </div>

      {/* Flagship AI Evaluation Research Workspace (Phase 4D) */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            AI Research Evaluation Workspace (Demonstration Mode)
          </h2>
          <p className="text-xs text-slate-500">
            Formulate research prompts, switch reasoning models, and test domain-specific outputs in simulated streaming mode.
          </p>
        </div>

        <ChatWidget />
      </div>

      {/* Model Runtimes Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Sovereign Research Model Endpoints (Simulated)
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
              Simulated System Telemetry
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
              title="Simulated API Quota"
              used={72}
              total={100}
            />

            <UsageCard
              title="Vector Dataset Storage"
              used={48}
              total={100}
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