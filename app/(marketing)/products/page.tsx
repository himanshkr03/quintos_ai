// File: E:\quintos_ai\app\(marketing)\products\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import Products from "@/components/marketing/products/Products";
import CTA from "@/components/sections/CTA";

const productCategories = [
  {
    title: "Enterprise AI",
    description:
      "AI-powered business applications for automation and decision-making.",
  },
  {
    title: "Generative AI",
    description:
      "Custom chatbots, copilots, content generation, and LLM-powered platforms.",
  },
  {
    title: "Computer Vision",
    description:
      "Image analysis, object detection, OCR, and medical imaging solutions.",
  },
  {
    title: "AI Agents",
    description:
      "Autonomous AI agents capable of planning, reasoning, and executing workflows.",
  },
];

const features = [
  "Cloud Ready",
  "Enterprise Security",
  "REST APIs",
  "Multi-Model Support",
  "Analytics Dashboard",
  "Scalable Architecture",
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Our Products
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Intelligent AI Products
              <span className="block text-blue-600">
                Built for Modern Businesses
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Discover innovative AI products designed to automate workflows,
              enhance productivity, and accelerate digital transformation.
            </p>
          </div>
        </Container>
      </section>

      {/* Products */}
      <Products />

      {/* Categories */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Categories"
            title="AI Solutions for Every Need"
            description="Our product portfolio covers multiple domains of Artificial Intelligence."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {productCategories.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-900">
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

      {/* Features */}
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionTitle
            badge="Platform Features"
            title="Designed for Scale"
            description="Every Quintos AI product is engineered with enterprise-grade capabilities."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center font-medium text-gray-700 shadow-sm transition hover:border-blue-500 hover:text-blue-600"
              >
                {feature}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}