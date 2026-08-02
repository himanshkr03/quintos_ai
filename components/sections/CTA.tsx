// File: E:\quintos_ai\components\sections\CTA.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/common/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">

          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            🚀 Ready to Build with AI?
          </span>

          <h2 className="mt-8 text-4xl font-bold leading-tight md:text-6xl">
            Transform Your Business
            <br />
            with Quintos AI
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-blue-100">
            Let's build intelligent applications, enterprise AI solutions,
            and next-generation products together.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link href="/contact">
              <Button
                className="flex items-center gap-2 bg-white text-blue-700 hover:bg-gray-100"
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="ghost"
                className="border border-white text-white hover:bg-white hover:text-blue-700"
              >
                Explore Services
              </Button>
            </Link>

          </div>

        </div>
      </Container>
    </section>
  );
}