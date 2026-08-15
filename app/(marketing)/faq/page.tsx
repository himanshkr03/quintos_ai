// File: E:\quintos_ai\app\(marketing)\faq\page.tsx

import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import FAQ from "@/components/marketing/faq/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Frequently Asked Questions | Quintos AI",
  description: "Get answers to common questions regarding Quintos AI products, research, and enterprise services.",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Frequently Asked Questions
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Have Questions?
              <span className="block text-blue-600">
                We&apos;ve Got Answers
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Learn more about Quintos AI, our services, products, research,
              pricing, and enterprise AI solutions.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Component */}
      <FAQ />

      {/* Support Section */}
      <section className="bg-slate-50 py-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900">
              Still Have Questions?
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Our team is ready to help you understand our AI solutions,
              enterprise services, research collaborations, and products.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
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