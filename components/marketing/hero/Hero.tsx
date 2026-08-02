// File: E:\quintos_ai\components\marketing\hero\Hero.tsx

"use client";

import Container from "@/components/shared/layout/Container";

import HeroBackground from "./HeroBackground";
import HeroButtons from "./HeroButtons";
import HeroPreview from "./HeroPreview";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Background */}
      <HeroBackground />

      <Container>
        <div className="relative z-10 grid min-h-[90vh] items-center gap-20 py-24 lg:grid-cols-2">

          {/* Left Content */}
          <div>

            {/* Badge */}
            <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
              🚀 Next Generation AI Company
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl xl:text-7xl">
              Empowering Businesses
              <span className="block text-blue-600">
                with Artificial Intelligence
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
              Quintos AI develops enterprise-grade Artificial Intelligence,
              Generative AI, Machine Learning, Computer Vision, and Quantum AI
              solutions that help organizations innovate faster and build
              intelligent products.
            </p>

            {/* Buttons */}
            <HeroButtons />

            {/* Stats */}
            <HeroStats />

          </div>

          {/* Right Preview */}
          <HeroPreview />

        </div>
      </Container>
    </section>
  );
}