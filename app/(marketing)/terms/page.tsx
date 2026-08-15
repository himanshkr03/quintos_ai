// File: E:\quintos_ai\app\(marketing)\terms\page.tsx

import Container from "@/components/shared/layout/Container";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Terms of Service & Research Usage | Quintos AI",
  description: "Terms and conditions governing the use of Quintos AI website, research preprints, APIs, and software platforms.",
};

const terms = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Quintos AI's website, preprints, APIs, or software platforms, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please discontinue use immediately.",
  },
  {
    title: "2. Permitted Use & Prohibited Conduct",
    content:
      "Quintos AI platforms and APIs are provided strictly for lawful research, development, and commercial operations. Users must not attempt unauthorized penetration testing, reverse-engineer model weights through adversarial perturbation attacks, or deploy models for unlawful, harmful, or fraudulent activities.",
  },
  {
    title: "3. Intellectual Property & Research Artifacts",
    content:
      "All proprietary algorithms, platform interfaces, architectural documentation, and trademarks belong to Quintos AI. Open-source models and preprints are licensed under their respective repository licenses (e.g. Apache 2.0 or MIT) as explicitly noted in their distribution manifests.",
  },
  {
    title: "4. API Service Level & Compute Quotas",
    content:
      "API access is subject to computational rate limits, security throttling, and operational maintenance windows. Quintos AI reserves the right to suspend API keys engaged in abusive or non-compliant request patterns.",
  },
  {
    title: "5. Disclaimer of Warranties & Liability Limitation",
    content:
      "Except as explicitly defined in custom enterprise service level agreements (SLAs), research prototypes and public interfaces are provided 'as is' without warranties of continuous availability or absolute accuracy.",
  },
  {
    title: "6. Modifications to Terms",
    content:
      "We reserve the right to revise these Terms of Service as our research and regulatory requirements evolve. Continued use of our platforms constitutes acceptance of updated terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Legal & Platform Terms
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Terms of <span className="gradient-ai">Service</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              These terms govern access to Quintos AI&apos;s digital platforms,
              APIs, open research artifacts, and enterprise software services.
            </p>
          </div>
        </Container>
      </section>

      {/* Terms Sections */}
      <section className="py-20 bg-white">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            {terms.map((term) => (
              <div
                key={term.title}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 sm:p-7 shadow-sm"
              >
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {term.title}
                </h2>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
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