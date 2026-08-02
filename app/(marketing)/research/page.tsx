// File: E:\quintos_ai\app\(marketing)\research\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import Research from "@/components/marketing/research/Research";
import CTA from "@/components/sections/CTA";

const researchAreas = [
  {
    title: "Large Language Models",
    description:
      "Building intelligent conversational AI, RAG systems, and domain-specific language models.",
  },
  {
    title: "Computer Vision",
    description:
      "Research in medical imaging, object detection, image segmentation, and visual intelligence.",
  },
  {
    title: "Quantum AI",
    description:
      "Exploring hybrid quantum-classical algorithms for next-generation intelligent systems.",
  },
  {
    title: "AI Agents",
    description:
      "Developing autonomous agents capable of reasoning, planning, and executing complex workflows.",
  },
];

const publications = [
  "Artificial Intelligence",
  "Generative AI",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Quantum Machine Learning",
  "Responsible AI",
];

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Research
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Advancing the Future
              <span className="block text-blue-600">
                Through AI Research
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Our research focuses on solving real-world challenges through
              Artificial Intelligence, Machine Learning, Generative AI, and
              emerging technologies.
            </p>
          </div>
        </Container>
      </section>

      {/* Research Component */}
      <Research />

      {/* Research Areas */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Research Areas"
            title="Our Focus Domains"
            description="Innovation driven by cutting-edge research and practical applications."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-900">
                  {area.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Publications */}
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionTitle
            badge="Research Topics"
            title="Areas of Publication"
            description="Knowledge creation through interdisciplinary AI research."
          />

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {publications.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-blue-200 bg-white px-6 py-3 font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                {topic}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}