// File: E:\quintos_ai\app\(marketing)\faq\page.tsx

import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import FAQ from "@/components/marketing/faq/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Frequently Asked Questions | Quintos AI",
  description: "Get answers to technical questions regarding Quintos AI products, research methodology, and enterprise deployments.",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Frequently Asked Questions
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Answers & Technical{" "}
              <span className="gradient-ai">Inquiries</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Explore answers regarding our research areas, sovereign data
              security, custom AI engineering, and enterprise partnership models.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Component */}
      <FAQ />

      {/* Support Section */}
      <section className="bg-slate-50/70 py-24 border-t border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-8 md:p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 leading-snug">
              Have a Specific Technical Question?
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Our research scientists and engineering team are available to discuss
              feasibility audits, bespoke architecture designs, and academic collaborations.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="md"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}