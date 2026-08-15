// File: E:\quintos_ai\app\(marketing)\blog\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import BlogList from "@/components/marketing/blog/BlogList";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Research Notes & Technical Explorations | Quintos AI",
  description: "Explore algorithmic deep-dives, research notes, tutorials, and engineering architecture discussions from the Quintos AI laboratory.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Technical Notes & Research Inquiries
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Research Notes &{" "}
              <span className="gradient-ai">Technical Explorations</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Theoretical inquiries, conceptual frameworks, algorithmic tutorials, and
              infrastructure discussions documented by the Quintos AI team.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Blog List Section */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            badge="Technical Inquiries"
            title="Explore the Knowledge Hub"
            description="Exploratory frameworks, engineering notes, and algorithmic architecture explorations."
          />

          <div className="mt-10">
            <BlogList />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}