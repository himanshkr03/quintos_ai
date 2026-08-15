// File: E:\quintos_ai\app\(marketing)\pricing\page.tsx

import { Check } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Pricing | Quintos AI",
  description: "Flexible, transparent pricing for individuals, startups, and enterprises.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students and AI enthusiasts.",
    features: [
      "Community Support",
      "Basic AI Tools",
      "Research Resources",
      "Limited API Access",
    ],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "Ideal for startups and growing businesses.",
    features: [
      "Everything in Starter",
      "Advanced AI Models",
      "Priority Support",
      "API Access",
      "Analytics Dashboard",
    ],
    popular: true,
    cta: "Start Free Trial",
    variant: "primary" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored AI solutions for enterprises.",
    features: [
      "Unlimited AI Usage",
      "Dedicated AI Consultant",
      "Private Deployment",
      "Custom Integrations",
      "24/7 Enterprise Support",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Pricing
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Flexible Pricing
              <span className="block text-blue-600">
                For Every Stage
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Choose the plan that fits your AI journey. Scale from personal
              experimentation to enterprise-grade deployments.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Plans */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Plans"
            title="Simple & Transparent Pricing"
            description="Designed for individuals, startups, and enterprises."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-8 md:p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.popular
                    ? "border-blue-600 ring-2 ring-blue-600/20"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    Most Popular
                  </span>
                )}

                <h2 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>

                <p className="mt-2 text-sm text-gray-600 min-h-[40px]">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-4 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-700"
                    >
                      <Check className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button
                    href="/contact"
                    variant={plan.variant}
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