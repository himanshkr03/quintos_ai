// File: E:\quintos_ai\components\dashboard\tables\BillingTable.tsx

"use client";

import { useState } from "react";
import {
  CreditCard,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  Layers,
  Info,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function BillingTable() {
  return (
    <div className="space-y-8">
      {/* Coming Soon Notice Banner */}
      <div className="rounded-2xl border border-blue-200/80 bg-blue-50/80 p-5 text-xs text-blue-900 flex items-start gap-3.5">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-bold text-sm text-blue-950">
            Research Preview &bull; Commercial Billing Coming Soon
          </strong>
          <p className="text-blue-800 leading-relaxed">
            Quintos AI is currently operating in early research deployment. All registered organizations receive complimentary sovereign compute units for non-commercial AI evaluation. Commercial payment checkout and automated billing will launch in a future phase.
          </p>
        </div>
      </div>

      {/* Plan & Compute Credit Quota Cards */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Current Active Research Plan */}
        <div className="md:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-mono text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Complimentary Research Tier
              </span>
              <span className="text-xs text-slate-500 font-mono">Status: Active</span>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Sovereign Research Tier
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Includes full access to Quintos Reasoning v1, Bio-Vision 3D, and Quantum VQE models with monthly compute allocations for algorithmic deduction.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[11px] font-mono text-slate-500 block">Compute Allocation</span>
                <strong className="text-slate-900 font-bold text-sm">100 CU / month</strong>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[11px] font-mono text-slate-500 block">Concurrency Limit</span>
                <strong className="text-slate-900 font-bold text-sm">5 Streams</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Plan Upgrade: Scheduled for Commercial Phase
            </span>
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Free Research Access
            </span>
          </div>
        </div>

        {/* Compute Meter Card */}
        <div className="md:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700">
                <Zap className="h-4 w-4 text-blue-600" />
                Monthly Compute Quota
              </span>
              <span className="text-xs font-bold text-blue-600 font-mono">Sovereign Lab</span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-baseline justify-between text-xs font-mono text-slate-700">
                <span>Resource Allocation</span>
                <span className="text-slate-500">100.0 CU Cap</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: "12%" }}
                />
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
              Usage records are tracked automatically in PostgreSQL. Compute quotas reset on the 1st of every calendar month.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">Quota Status: Nominal</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Protected
            </span>
          </div>
        </div>
      </div>

      {/* Commercial Roadmap & Future Tiers */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-100 pb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-slate-700 mb-2">
            <Clock className="h-3 w-3" />
            Roadmap
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Upcoming Production Subscription Tiers
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Future commercial tiers for enterprise bare-metal GPU clusters, dedicated VPC peering, and custom SLA agreements.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Developer Tier</span>
              <span className="text-xs font-mono text-slate-500">Coming Soon</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Expanded token throughput, automated SDK keys, and standard community support.
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
            <div>
              <span className="text-xs font-bold text-blue-950 block">Research Pro Tier</span>
              <span className="text-xs font-mono text-blue-600">Coming Soon</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Priority GPU compute queues, 500+ CU allocations, and multimodal 3D inference.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Sovereign Enterprise</span>
              <span className="text-xs font-mono text-slate-500">Coming Soon</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Air-gapped private VPC clusters, custom weights fine-tuning, and dedicated SLA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}