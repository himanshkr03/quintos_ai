// File: E:\quintos_ai\components\marketing\portfolio\PortfolioCTA.tsx

import Link from "next/link";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import { FOUNDERS_DATA, PERSONAL_PORTFOLIO_URL } from "@/data/portfolio";

export default function PortfolioCTA() {
  const shabnam = FOUNDERS_DATA[1];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-24 text-white">
      {/* Background grid and ambient dark tech glow */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-900/40 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>LET&apos;S BUILD THE FUTURE</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Research. Innovation. Intelligence.
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Exploring new frontiers in artificial intelligence, systems engineering, and emerging computational paradigms.
          </p>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={PERSONAL_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              aria-label="Visit personal external portfolio of Himanshu Rajak (opens in new tab)"
            >
              <Button
                variant="primary"
                size="md"
                rightIcon={<ExternalLink className="h-4 w-4" />}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0"
              >
                Himanshu&apos;s Portfolio
              </Button>
            </a>

            <a
              href={shabnam.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              aria-label="Visit verified GitHub profile of Shabnam (opens in new tab)"
            >
              <Button
                variant="outline"
                size="md"
                leftIcon={<GitHubIcon className="h-4 w-4" />}
                rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
                className="w-full sm:w-auto border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                Shabnam&apos;s GitHub
              </Button>
            </a>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<Mail className="h-4 w-4" />}
                className="w-full sm:w-auto bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Contact Quintos AI
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
