import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          badge="Our Services"
          title="AI Solutions for Every Industry"
          description="Quintos AI provides end-to-end artificial intelligence services, from strategy and research to enterprise deployment."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mb-6 leading-7 text-gray-600">
                  {service.description}
                </p>

                <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3">
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