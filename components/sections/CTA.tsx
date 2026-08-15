import { ArrowRight, Compass } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-t border-slate-800">
      {/* Subtle Technical Grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 h-64 w-80 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Collaborate & Deploy</span>
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight">
            Accelerate Your Enterprise with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Quintos AI
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
            Whether you are exploring foundational research partnerships,
            biomedical diagnostics, or sovereign private LLM infrastructure,
            our lab is ready to collaborate.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Button
              href="/contact"
              variant="white"
              size="md"
              rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            >
              Get Started
            </Button>

            <Button
              href="/research"
              variant="ghost"
              size="md"
              className="border border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:text-white"
              leftIcon={<Compass className="h-4 w-4 text-purple-400" />}
            >
              Explore Research
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}