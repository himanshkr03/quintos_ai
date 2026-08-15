// File: E:\quintos_ai\app\(dashboard)\dashboard\page.tsx

import {
  Brain,
  Bot,
  Cpu,
  Database,
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

import {
  ChatWidget,
  PromptHistory,
  RecentChats,
} from "@/components/dashboard/ai";

import {
  APIKeysTable,
  BillingTable,
} from "@/components/dashboard/tables";

export const metadata = {
  title: "Dashboard | Quintos AI",
  description: "Enterprise AI dashboard and workspace overview.",
};

export default function DashboardPage() {
  return (
    <>
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back to Quintos AI workspace overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="AI Requests"
          value="18,420"
          icon={Bot}
          change="+18%"
        />

        <StatsCard
          title="Models"
          value="24"
          icon={Brain}
          change="+4"
        />

        <StatsCard
          title="Datasets"
          value="87"
          icon={Database}
          change="+9"
        />

        <StatsCard
          title="GPU Hours"
          value="624"
          icon={Cpu}
          change="+32%"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-8 xl:grid-cols-3">
        <UsageChart />
        <RevenueChart />
        <ActivityChart />
      </div>

      {/* Usage */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <UsageCard
          title="API Usage"
          used={72}
          total={100}
        />

        <UsageCard
          title="Storage"
          used={48}
          total={100}
        />
      </div>

      {/* AI */}
      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <ChatWidget />

        <div className="space-y-8">
          <PromptHistory />
          <RecentChats />
        </div>
      </div>

      {/* Widgets */}
      <div className="mt-8 grid gap-8 xl:grid-cols-3">
        <QuickActions />
        <RecentActivity />
        <Notifications />
      </div>

      {/* Tables */}
      <div className="mt-8 grid gap-8">
        <APIKeysTable />
        <BillingTable />
      </div>

      {/* AI Models */}
      <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <ModelCard
          name="GPT-4.1"
          provider="OpenAI"
          description="General-purpose reasoning model."
        />

        <ModelCard
          name="Gemini 2.5"
          provider="Google"
          description="Multimodal AI model for enterprise."
        />

        <ModelCard
          name="Llama 3"
          provider="Meta"
          description="Open-weight large language model."
        />
      </div>

      {/* Activity */}
      <div className="mt-8">
        <ActivityCard
          title="Latest Update"
          description="Your dashboard modules have been successfully integrated."
          time="Just now"
        />
      </div>
    </>
  );
}