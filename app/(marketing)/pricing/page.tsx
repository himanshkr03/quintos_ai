// File: E:\quintos_ai\app\(marketing)\pricing\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import CTA from "@/components/sections/CTA";

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
  },
  {
    name: "Professional",
    price: "$29/month",
    description: "Ideal for startups and growing businesses.",
    features: [
      "Everything in Starter",
      "Advanced AI Models",
      "Priority Support",
      "API Access",
      "Analytics Dashboard",
    ],
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
                className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>

                <p className="mt-3 text-gray-600">
                  {plan.description}
                </p>

                <div className="mt-8 text-5xl font-bold text-blue-600">
                  {plan.price}
                </div>

                <ul className="mt-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}