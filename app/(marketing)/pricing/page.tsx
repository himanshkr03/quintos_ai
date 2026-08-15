// File: E:\quintos_ai\app\(marketing)\pricing\page.tsx

import { Check } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Pricing & Deployment Models | Quintos AI",
  description: "Transparent access tiers and sovereign enterprise deployment options for Quintos AI platforms.",
};

const plans = [
  {
    name: "Developer & Academic",
    price: "Free",
    period: " / community",
    description: "Ideal for researchers, students, and prototype evaluation.",
    features: [
      "Access to open benchmark models",
      "Standard API rate limits",
      "Community research forum access",
      "Interactive knowledge notebook runtime",
      "Public documentation & tutorials",
    ],
    cta: "Start Exploring",
    variant: "outline" as const,
  },
  {
    name: "Pro & Applied Scale",
    price: "$49",
    period: " / month",
    description: "Designed for engineering teams scaling production workloads.",
    features: [
      "Priority GPU-accelerated inference",
      "Fine-tuning pipeline access",
      "High-throughput vector indexing",
      "Dedicated API key management",
      "Direct technical email support",
      "Automated evaluation suites",
    ],
    popular: true,
    cta: "Deploy Workspace",
    variant: "primary" as const,
  },
  {
    name: "Enterprise Sovereign",
    price: "Custom",
    period: " / tailored",
    description: "For organizations demanding air-gapped security and private custom models.",
    features: [
      "Air-gapped on-premise / private VPC runtime",
      "Custom domain-adapted LLM training",
      "Full tensor encryption & audit logging",
      "Sub-millisecond custom CUDA kernels",
      "Dedicated AI research consultant",
      "24/7 mission-critical SLA support",
    ],
    cta: "Contact Enterprise Lab",
    variant: "outline" as const,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Transparent Access
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Flexible Tiers for Research &{" "}
              <span className="gradient-ai">Enterprise Deployments</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Whether you are an academic researcher exploring prototypes or an
              enterprise deploying sovereign models into private infrastructure,
              we have a transparent tier for your scale.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            badge="Tiers & Architecture"
            title="Predictable Compute & Access Models"
            description="Clear infrastructure options with zero hidden compute surcharges."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl border bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  plan.popular
                    ? "border-blue-500 ring-2 ring-blue-500/20"
                    : "border-slate-200/80"
                }`}
              >
                <div>
                  {plan.popular && (
                    <div className="mb-3.5 inline-flex rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Recommended
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="mt-5 flex items-baseline border-y border-slate-100 py-3.5">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-1 text-xs font-mono text-slate-500">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2.5">
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

                <div className="mt-8 pt-5 border-t border-slate-100">
                  <Button
                    href="/contact"
                    variant={plan.variant}
                    size="md"
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}