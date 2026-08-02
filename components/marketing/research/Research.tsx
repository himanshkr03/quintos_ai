import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import { researchAreas } from "@/data/research";

export default function Research() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          badge="Research"
          title="Advancing Artificial Intelligence Through Research"
          description="Our research explores the next generation of artificial intelligence, from machine learning and generative AI to quantum computing and edge intelligence."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {researchAreas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="mb-6 leading-7 text-gray-600">
                  {area.description}
                </p>

                {/* CTA */}
                <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}