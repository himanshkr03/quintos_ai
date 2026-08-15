// File: E:\quintos_ai\app\(dashboard)\billing\page.tsx

import BillingTable from "@/components/dashboard/tables/BillingTable";

export const metadata = {
  title: "Billing & Compute Credits | Quintos AI Research Workspace",
  description: "Manage subscription plans, GPU compute quotas, and invoices in demonstration mode.",
};

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Billing & Compute Quotas
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Review compute credit consumption, manage workspace subscription tiers, and download invoices.
        </p>
      </div>

      <BillingTable />
    </div>
  );
}