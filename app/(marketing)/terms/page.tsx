// File: E:\quintos_ai\app\(marketing)\terms\page.tsx

import Container from "@/components/shared/layout/Container";
import CTA from "@/components/sections/CTA";

const terms = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using Quintos AI's website, products, or services, you agree to comply with these Terms and Conditions. If you do not agree, please discontinue use of our services.",
  },
  {
    title: "Use of Services",
    content:
      "Our services are intended for lawful purposes only. Users must not misuse the platform, attempt unauthorized access, distribute malicious software, or violate applicable laws.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, trademarks, logos, software, research materials, and designs published by Quintos AI remain the intellectual property of Quintos AI unless otherwise stated.",
  },
  {
    title: "User Responsibilities",
    content:
      "Users are responsible for maintaining the confidentiality of their accounts and ensuring that any information they provide is accurate and up to date.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Quintos AI shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these Terms and Conditions at any time. Continued use of our services after updates constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Terms & Conditions
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Terms of
              <span className="block text-blue-600">
                Service
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              These Terms and Conditions govern your use of Quintos AI's
              website, products, research, and enterprise AI services.
            </p>
          </div>
        </Container>
      </section>

      {/* Terms */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-5xl space-y-10">
            {terms.map((term) => (
              <div
                key={term.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  {term.title}
                </h2>

                <p className="leading-8 text-gray-600">
                  {term.content}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}