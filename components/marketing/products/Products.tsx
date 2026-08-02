import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

import { products } from "@/data/products";

export default function Products() {
  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <SectionTitle
          badge="Our Products"
          title="AI Products Built for the Future"
          description="Discover innovative AI-powered products designed to transform businesses, research, healthcare, and education."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mb-6 leading-7 text-gray-600">
                  {product.description}
                </p>

                {/* CTA */}
                <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3">
                  Explore Product
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