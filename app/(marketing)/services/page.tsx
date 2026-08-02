// File: E:\quintos_ai\app\(marketing)\services\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import Services from "@/components/marketing/services/Services";
import CTA from "@/components/sections/CTA";

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understand business goals, identify opportunities, and define AI strategy.",
  },
  {
    step: "02",
    title: "Development",
    description:
      "Design, train, and build scalable AI models tailored to your requirements.",
  },
  {
    step: "03",
    title: "Deployment",
    description:
      "Deploy secure, production-ready AI solutions with monitoring and optimization.",
  },
];

const technologies = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "OpenAI",
  "Llama",
  "Gemini",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Qdrant",
  "Next.js",
];

const industries = [
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Cybersecurity",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Our Services
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Enterprise AI
              <span className="block text-blue-600">
                Solutions & Consulting
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              We help organizations adopt Artificial Intelligence through
              research, consulting, development, deployment, and long-term
              support.
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <Services />

      {/* Process */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Our Process"
            title="How We Deliver AI Solutions"
            description="A structured workflow from idea to deployment."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <span className="text-5xl font-bold text-blue-600">
                  {item.step}
                </span>

                <h3 className="mt-6 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionTitle
            badge="Technology Stack"
            title="Modern AI Technologies"
            description="We use industry-leading frameworks and tools."
          />

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-200 bg-white px-6 py-3 font-medium text-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Industries"
            title="Industries We Serve"
            description="AI solutions tailored for diverse sectors."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {industry}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}