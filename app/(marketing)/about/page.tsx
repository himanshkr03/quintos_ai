// File: E:\quintos_ai\app\(marketing)\about\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "About Us | Quintos AI",
  description: "Learn about Quintos AI, our research vision, core values, and our mission to build transformative AI technologies.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              About Quintos AI
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
              Building Intelligent
              <span className="block text-blue-600">
                AI Solutions for Tomorrow
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Quintos AI is an Artificial Intelligence company focused on
              research, enterprise AI solutions, Generative AI, Machine
              Learning, Computer Vision, and Quantum AI technologies.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Our Story"
            title="Innovation Through Research"
            description="We believe Artificial Intelligence should empower people, accelerate innovation, and solve real-world challenges."
          />

          <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-gray-600">
            <p>
              Quintos AI was founded with a vision of creating intelligent
              technologies that bridge the gap between cutting-edge research
              and practical business applications.
            </p>

            <p>
              Our team works across multiple AI domains including Large
              Language Models, Computer Vision, Intelligent Automation,
              AI Agents, and Enterprise AI Platforms.
            </p>

            <p>
              By combining innovation with engineering excellence, we build
              scalable AI products that help organizations embrace the future.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Mission
              </h2>

              <p className="leading-8 text-gray-600">
                To develop innovative Artificial Intelligence solutions that
                transform industries, improve decision-making, and create
                meaningful value for businesses and society.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Vision
              </h2>

              <p className="leading-8 text-gray-600">
                To become a globally recognized AI company known for
                innovation, research excellence, and responsible Artificial
                Intelligence.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Core Values"
            title="What Drives Us"
            description="The principles that guide every solution we build."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Innovation",
              "Research",
              "Integrity",
              "Impact",
            ].map((value) => (
              <div
                key={value}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-2xl font-semibold text-blue-600">
                  {value}
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