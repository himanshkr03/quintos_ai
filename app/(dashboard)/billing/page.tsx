import BillingTable from "@/components/dashboard/tables/BillingTable";

export const metadata = {
  title: "Billing | Quintos AI",
  description: "Manage your subscription, invoices, and billing information.",
};

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Billing & Subscription</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your plan, payment methods, and review previous invoices.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Current Plan
            </span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Enterprise AI Plan</h2>
            <p className="mt-1 text-sm text-gray-600">
              Unlimited model invocations, priority GPU compute, and dedicated support.
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-gray-900">$299</span>
            <span className="text-sm text-gray-500"> / month</span>
          </div>
        </div>
      </div>

      <BillingTable />
    </div>
  );
}