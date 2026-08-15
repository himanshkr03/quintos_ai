import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { engineeringPrinciples } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-slate-50/60 py-20 border-b border-slate-200/60">
      <Container>
        <SectionTitle
          badge="Guiding Principles"
          title="Our Research & Engineering Philosophy"
          description="We are committed to building transparent, rigorously evaluated, and mathematically grounded artificial intelligence systems."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringPrinciples.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:border-blue-400/60 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}