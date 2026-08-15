"use client";

import Container from "@/components/shared/layout/Container";
import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroPreview from "./HeroPreview";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Ambient background with grid */}
      <HeroBackground />

      <Container>
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <HeroBadge />

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.12]">
              Architecting Intelligence for the{" "}
              <span className="gradient-ai">
                Next Era of Computing
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Quintos AI is an advanced artificial intelligence laboratory
              and engineering company. We advance foundational AI research,
              multimodal perception, autonomous agents, and quantum machine
              learning to build transformative, production-ready systems.
            </p>

            <HeroButtons />

            <div className="w-full">
              <HeroStats />
            </div>
          </div>

          {/* Right Column (Hero Visual) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}