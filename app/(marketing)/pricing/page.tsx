// File: E:\quintos_ai\app\(marketing)\pricing\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import PricingCards from "@/components/marketing/pricing/PricingCards";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Pricing & Deployment Models | Quintos AI",
  description: "Transparent access tiers and sovereign enterprise deployment options for Quintos AI platforms.",
};

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
              we provide transparent compute and model access tiers.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Pricing Section */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            badge="Tiers & Architecture"
            title="Predictable Compute & Access Models"
            description="Clear infrastructure options with zero hidden compute surcharges."
          />

          <div className="mt-10">
            <PricingCards />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}