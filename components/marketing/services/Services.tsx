import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          badge="Applied AI Capabilities"
          title="Translational AI Engineering & Solutions"
          description="Quintos AI delivers end-to-end artificial intelligence engineering, bridging foundational research with secure enterprise deployment."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-md"
              >
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    {service.description}
                  </p>

                  {/* Domain Tags */}
                  {service.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={service.href || "/services"}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Explore Capability</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}