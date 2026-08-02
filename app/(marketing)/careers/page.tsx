// File: E:\quintos_ai\app\(marketing)\careers\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import CTA from "@/components/sections/CTA";

const openings = [
  {
    title: "AI Engineer",
    location: "Mohali, India",
    type: "Full Time",
    description:
      "Develop enterprise AI applications, LLM-powered systems, and intelligent automation solutions.",
  },
  {
    title: "Machine Learning Engineer",
    location: "Remote",
    type: "Full Time",
    description:
      "Design, train, and deploy scalable machine learning models for production environments.",
  },
  {
    title: "Computer Vision Engineer",
    location: "Mohali, India",
    type: "Full Time",
    description:
      "Build advanced computer vision systems for healthcare, manufacturing, and smart automation.",
  },
  {
    title: "AI Research Intern",
    location: "Remote",
    type: "Internship",
    description:
      "Work with our research team on Generative AI, LLMs, AI Agents, and Quantum AI projects.",
  },
];

const benefits = [
  "Work on Cutting-Edge AI Technologies",
  "Flexible Work Environment",
  "Research & Innovation Culture",
  "Learning and Development Support",
  "Competitive Compensation",
  "Career Growth Opportunities",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Careers
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Join the Future of
              <span className="block text-blue-600">
                Artificial Intelligence
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Build innovative AI products, contribute to cutting-edge
              research, and shape the future of intelligent technology with
              Quintos AI.
            </p>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Open Positions"
            title="Current Opportunities"
            description="Explore exciting career opportunities and become part of our growing AI team."
          />

          <div className="mt-16 space-y-8">
            {openings.map((job) => (
              <div
                key={job.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
              >
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {job.title}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {job.location}
                      </span>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        {job.type}
                      </span>
                    </div>

                    <p className="mt-5 max-w-3xl leading-7 text-gray-600">
                      {job.description}
                    </p>
                  </div>

                  <button className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionTitle
            badge="Why Join Us"
            title="Benefits of Working at Quintos AI"
            description="We foster innovation, collaboration, and continuous learning."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center font-semibold text-gray-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600"
              >
                {benefit}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}