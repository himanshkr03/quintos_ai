"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { pricingPlans, pricingFaqs } from "@/data/pricing";
import Button from "@/components/shared/ui/Button";

export default function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-16">
      {/* Billing Cycle Toggle */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 shadow-inner">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
              billingCycle === "monthly"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Billing
          </button>

          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
              billingCycle === "annual"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Save 20%
            </span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-500">
          {billingCycle === "annual"
            ? "Annual commitments receive priority GPU cluster allocations"
            : "Flexible monthly cancel-anytime compute tiers"}
        </span>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => {
          const isAnnual = billingCycle === "annual";
          const displayPrice =
            plan.monthlyPrice === null
              ? "Custom"
              : plan.monthlyPrice === 0
              ? "Free"
              : isAnnual
              ? `$${plan.annualPrice}`
              : `$${plan.monthlyPrice}`;

          const billingSubtext =
            plan.monthlyPrice === null
              ? "tailored enterprise deployment"
              : plan.monthlyPrice === 0
              ? "community & research evaluation"
              : isAnnual
              ? plan.annualBillingText || "Billed annually"
              : "Billed monthly";

          const ctaTarget = `${plan.ctaHref}&billing=${billingCycle}`;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl border bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                plan.popular
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-slate-200/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between min-h-[28px] mb-3">
                  {plan.badge ? (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        plan.popular
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {plan.popular && <Sparkles className="h-2.5 w-2.5" />}
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Tier 01
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {plan.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-5 border-y border-slate-100 py-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      {displayPrice}
                    </span>
                    {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                      <span className="ml-1.5 text-xs font-mono text-slate-500">
                        / month
                      </span>
                    )}
                  </div>
                  <span className="mt-1 block text-[11px] font-mono text-slate-500">
                    {billingSubtext}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="mt-6">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                    Included Capabilities
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal"
                      >
                        <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-5 border-t border-slate-100">
                <Button
                  href={ctaTarget}
                  variant={plan.variant}
                  size="md"
                  className="w-full justify-center"
                >
                  {plan.ctaText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing FAQs Section */}
      <div className="pt-10 max-w-3xl mx-auto border-t border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 text-center mb-6">
          Pricing & Deployment Questions
        </h3>

        <div className="space-y-3">
          {pricingFaqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5"
            >
              <h4 className="text-sm font-semibold text-slate-900 mb-1.5">
                {faq.question}
              </h4>
              <p className="text-xs leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
