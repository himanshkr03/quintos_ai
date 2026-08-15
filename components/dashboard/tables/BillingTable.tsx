"use client";

import { useState } from "react";
import {
  Download,
  CreditCard,
  Check,
  AlertTriangle,
  FileText,
  Sparkles,
  Zap,
  CheckCircle2,
  X,
} from "lucide-react";
import { INITIAL_MOCK_INVOICES, MockInvoice } from "@/data/dashboard";
import Button from "@/components/shared/ui/Button";

export default function BillingTable() {
  const [invoices] = useState<MockInvoice[]>(INITIAL_MOCK_INVOICES);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [changePlanModalOpen, setChangePlanModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<"Developer" | "Pro" | "Enterprise">("Enterprise");
  const [selectedPlanOption, setSelectedPlanOption] = useState<"Developer" | "Pro" | "Enterprise">("Enterprise");
  const [planSuccessToast, setPlanSuccessToast] = useState<string | null>(null);

  const [updateCardModalOpen, setUpdateCardModalOpen] = useState(false);
  const [cardSuccessToast, setCardSuccessToast] = useState<string | null>(null);

  const handleDownloadInvoice = (invoice: MockInvoice) => {
    setDownloadingId(invoice.id);
    setTimeout(() => {
      setDownloadingId(null);
      // Simulated download notification
      alert(`[Demo Mode] Simulated download started: ${invoice.downloadFileName}`);
    }, 600);
  };

  const handleApplyPlanChange = () => {
    setCurrentPlan(selectedPlanOption);
    setChangePlanModalOpen(false);
    setPlanSuccessToast(`Plan successfully switched to ${selectedPlanOption} Tier (Demo Mode).`);
    setTimeout(() => setPlanSuccessToast(null), 4000);
  };

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateCardModalOpen(false);
    setCardSuccessToast("Simulated payment method updated successfully.");
    setTimeout(() => setCardSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Feedback */}
      {planSuccessToast && (
        <div
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{planSuccessToast}</span>
        </div>
      )}

      {cardSuccessToast && (
        <div
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{cardSuccessToast}</span>
        </div>
      )}

      {/* Demonstration Mode Banner */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Demonstration Workspace &bull; Simulated Compute Billing</strong>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            All billing plans, GPU hours, compute credit quotas, and invoices are simulated demonstrations for interface testing. No actual financial transactions or payment charges occur.
          </p>
        </div>
      </div>

      {/* Plan & Compute Credit Quota Cards */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Current Subscription Card */}
        <div className="md:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Active Subscription (Demo)
              </span>
              <span className="text-xs text-slate-500 font-mono">Renews Sep 01, 2026</span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {currentPlan} AI Plan
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {currentPlan === "Enterprise"
                    ? "Dedicated sovereign VPC cluster, priority GPU queues, and custom fine-tuning."
                    : currentPlan === "Pro"
                    ? "Advanced research models, 500 GPU compute hours, and high-throughput endpoints."
                    : "Standard evaluation rate limits and community models."}
                </p>
              </div>

              <div className="text-right shrink-0 ml-4">
                <span className="text-3xl font-bold text-slate-900">
                  {currentPlan === "Enterprise" ? "$299" : currentPlan === "Pro" ? "$99" : "$0"}
                </span>
                <span className="text-xs text-slate-500 font-mono"> / mo</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">
              Need custom bare-metal nodes?
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setChangePlanModalOpen(true)}
            >
              Change Plan (Demo)
            </Button>
          </div>
        </div>

        {/* Compute Credit Meter Card */}
        <div className="md:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700">
                <Zap className="h-4 w-4 text-blue-600" />
                Monthly Compute Quota
              </span>
              <span className="text-xs font-bold text-blue-600 font-mono">56% Used</span>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between text-xs font-mono text-slate-700 mb-1.5">
                <span>$280.00 Consumed</span>
                <span className="text-slate-400">$500.00 Limit</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: "56%" }}
                />
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              Quota includes sovereign model inferences, matrix eigenvalues, and batch embeddings.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">Auto-refill: Enabled</span>
            <span className="font-semibold text-emerald-600">Nominal</span>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Payment Method</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Card used for automatic compute credit renewals and subscriptions.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setUpdateCardModalOpen(true)}
          >
            Update Payment Method
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Visa ending in 4242</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Default
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">Expires 08 / 2029 (Simulated)</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-100 pb-5">
          <h3 className="text-base font-bold text-slate-900">Invoices & Billing History</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Download previous simulated invoices for tax and accounting records.
          </p>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 text-left font-semibold">Invoice ID</th>
                <th className="py-3 text-left font-semibold">Description</th>
                <th className="py-3 text-left font-semibold">Billing Date</th>
                <th className="py-3 text-left font-semibold">Amount</th>
                <th className="py-3 text-left font-semibold">Status</th>
                <th className="py-3 text-right font-semibold">Receipt</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 font-mono font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span>{inv.id}</span>
                    </div>
                  </td>

                  <td className="py-4 text-slate-700">{inv.description}</td>
                  <td className="py-4 font-mono text-slate-500">{inv.date}</td>
                  <td className="py-4 font-mono font-bold text-slate-900">{inv.amount}</td>

                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      <Check className="h-3 w-3" />
                      {inv.status}
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(inv)}
                      disabled={downloadingId === inv.id}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Download className="h-3 w-3 text-slate-500" />
                      <span>{downloadingId === inv.id ? "Downloading..." : "PDF"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Change Subscription Plan (Demo) */}
      {changePlanModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setChangePlanModalOpen(false)}
              className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Plan Configuration
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Select Workspace Tier (Demo Mode)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate switching subscription tiers to preview compute allocations.
              </p>
            </div>

            <div className="grid gap-3 mt-5">
              {[
                {
                  id: "Developer",
                  price: "$0",
                  desc: "Community models, shared test runtimes, and standard rate limits.",
                },
                {
                  id: "Pro",
                  price: "$99/mo",
                  desc: "Full model suite, 500 GPU compute hours, priority queues.",
                },
                {
                  id: "Enterprise",
                  price: "$299/mo",
                  desc: "Dedicated sovereign VPC cluster, air-gapped runtimes, custom weights.",
                },
              ].map((tier) => {
                const isSelected = selectedPlanOption === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() =>
                      setSelectedPlanOption(
                        tier.id as "Developer" | "Pro" | "Enterprise"
                      )
                    }
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600 shadow-2xs"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900">
                        {tier.id} Tier
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">{tier.desc}</p>
                    </div>
                    <span className="font-mono font-bold text-sm text-slate-900 shrink-0 ml-4">
                      {tier.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setChangePlanModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleApplyPlanChange}
              >
                Confirm Plan Switch
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Update Payment Method (Demo) */}
      {updateCardModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setUpdateCardModalOpen(false)}
              className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Payment Method Simulation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Update Card Details (Demo)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulated card input for testing user interface flows.
              </p>
            </div>

            <form onSubmit={handleUpdateCard} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Himanshu Rajak"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Number (Mock)
                </label>
                <input
                  type="text"
                  required
                  defaultValue="•••• •••• •••• 4242"
                  className="w-full rounded-xl border border-slate-300 font-mono px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="08 / 2029"
                    className="w-full rounded-xl border border-slate-300 font-mono px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="•••"
                    className="w-full rounded-xl border border-slate-300 font-mono px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setUpdateCardModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="sm">
                  Save Card (Demo)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}