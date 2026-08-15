// File: E:\quintos_ai\app\(marketing)\privacy\page.tsx

import Container from "@/components/shared/layout/Container";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Privacy Policy & Data Sovereignty | Quintos AI",
  description: "Read the official privacy policy of Quintos AI outlining data protection, sovereign runtime guarantees, and security practices.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information that you voluntarily provide to us when submitting inquiries, requesting technical audits, or accessing our platform services. This includes your name, email address, organizational affiliation, and project parameters. We do not harvest extraneous background telemetry or monetize user data.",
  },
  {
    title: "2. Zero-Leakage Data Sovereignty",
    content:
      "For enterprise client engagements and custom LLM deployments, Quintos AI guarantees strict data isolation. Client training datasets, embeddings, prompt logs, and model weights are retained strictly within sovereign, client-designated virtual private clouds (VPCs) or air-gapped on-premise clusters. Zero inference data is shared with third-party foundation model providers without explicit written consent.",
  },
  {
    title: "3. Cryptographic Security & Organizational Measures",
    content:
      "We apply end-to-end TLS 1.3 encryption in transit and AES-256 encryption at rest. Internal model access is guarded by multi-factor authentication, granular role-based access control (RBAC), and immutable audit logs.",
  },
  {
    title: "4. Third-Party Integrations & Infrastructure",
    content:
      "When integrating with cloud providers (e.g. AWS, Azure, Google Cloud), operations are governed under rigorous enterprise data processing agreements that prohibit third-party model training on client telemetry.",
  },
  {
    title: "5. Data Subject Rights",
    content:
      "You have the right to request access to, rectification of, or complete cryptographic deletion of your personal contact information at any time by contacting our security office at contact.quintosresearch@gmail.com.",
  },
  {
    title: "6. Policy Governance & Updates",
    content:
      "This policy is regularly reviewed against international data protection frameworks. Revisions will be published directly to this page with an updated timestamp.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Data Sovereignty & Legal
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Privacy Policy &{" "}
              <span className="gradient-ai">Data Governance</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Quintos AI is committed to uncompromising data sovereignty,
              transparency, and cryptographic data protection.
            </p>
          </div>
        </Container>
      </section>

      {/* Policy Sections */}
      <section className="py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-7 md:p-8 shadow-sm"
              >
                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {section.title}
                </h2>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
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