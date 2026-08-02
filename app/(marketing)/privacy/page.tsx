// File: E:\quintos_ai\app\(marketing)\privacy\page.tsx

import Container from "@/components/shared/layout/Container";
import CTA from "@/components/sections/CTA";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We may collect information that you voluntarily provide, such as your name, email address, company details, and project requirements. We may also collect technical information including browser type, device information, and website usage analytics.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to provide services, improve our products, respond to inquiries, personalize your experience, and maintain the security and reliability of our platform.",
  },
  {
    title: "Data Protection",
    content:
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.",
  },
  {
    title: "Third-Party Services",
    content:
      "Our platform may integrate with trusted third-party services such as cloud providers, analytics platforms, and AI providers. These services operate under their own privacy policies.",
  },
  {
    title: "Your Rights",
    content:
      "Depending on applicable laws, you may request access to, correction of, or deletion of your personal information. You may also request information regarding how your data is processed.",
  },
  {
    title: "Policy Updates",
    content:
      "This Privacy Policy may be updated periodically. Changes will be published on this page with the latest revision date.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Privacy Policy
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Your Privacy
              <span className="block text-blue-600">
                Matters to Us
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Quintos AI is committed to protecting your personal information
              and maintaining transparency about how data is collected, used,
              and safeguarded.
            </p>
          </div>
        </Container>
      </section>

      {/* Policy Sections */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-5xl space-y-10">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>

                <p className="leading-8 text-gray-600">
                  {section.content}
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