import { Quote } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <SectionTitle
          badge="Testimonials"
          title="Trusted by Businesses and Researchers"
          description="Our mission is to deliver intelligent AI solutions that create measurable impact across industries."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote className="mb-6 h-10 w-10 text-blue-600" />

              <p className="mb-8 leading-7 text-gray-600">
                "{testimonial.review}"
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>

                <p className="text-sm font-medium text-blue-600">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}