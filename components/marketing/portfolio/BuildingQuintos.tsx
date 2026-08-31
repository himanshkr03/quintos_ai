// File: E:\quintos_ai\components\marketing\portfolio\BuildingQuintos.tsx

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Cpu } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";

export default function BuildingQuintos() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-200/80 bg-gradient-to-b from-blue-50/60 via-slate-50/50 to-white p-8 sm:p-12 shadow-sm">
          <div className="space-y-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-white px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Founding Vision</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Building Quintos AI
            </h2>

            {/* Core Founding-Team Narrative */}
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-2xl mx-auto">
              Quintos AI is being built through the combination of research leadership, AI engineering, and executive operations. The founding team brings complementary strengths to the development of intelligent systems and emerging technologies.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto text-left sm:text-center">
              <p>
                From exploring latent-space transformer dynamics and hybrid quantum heuristics to engineering high-throughput streaming inference engines and multi-agent coordination frameworks, Quintos AI operates as an integrated deep-tech venture.
              </p>
              <p>
                By combining research curiosity with rigorous production standards, the founders are dedicated to delivering sovereign, transparent, and mathematically grounded artificial intelligence systems.
              </p>
            </div>

            {/* Action */}
            <div className="pt-4 flex justify-center">
              <Link href="/">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="shadow-md shadow-blue-600/15"
                >
                  Explore Quintos AI Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
