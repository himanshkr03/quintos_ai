// File: E:\quintos_ai\app\(marketing)\portfolio\page.tsx

import { Metadata } from "next";
import {
  FounderHero,
  FoundersOverview,
  HimanshuPortfolio,
  ShabnamPortfolio,
  FoundingPhilosophy,
  BuildingQuintos,
  PortfolioSelectedWork,
  PortfolioLinks,
  PortfolioCTA,
} from "@/components/marketing/portfolio";

export const metadata: Metadata = {
  title: "Founders & Leadership | Quintos AI",
  description:
    "Meet the founding team behind Quintos AI — Himanshu Rajak, Founder, Researcher & AI Operational Head, and Shabnam, Founder, AI Developer & Executive Operations Lead.",
  openGraph: {
    title: "Founders & Leadership | Quintos AI",
    description:
      "Meet the founding team behind Quintos AI — Himanshu Rajak, Founder, Researcher & AI Operational Head, and Shabnam, Founder, AI Developer & Executive Operations Lead.",
    url: "https://quintosai.com/portfolio",
    siteName: "Quintos AI",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders & Leadership | Quintos AI",
    description:
      "Meet the founding team behind Quintos AI — Himanshu Rajak, Founder, Researcher & AI Operational Head, and Shabnam, Founder, AI Developer & Executive Operations Lead.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero: Building Quintos AI */}
      <FounderHero />

      {/* Section 01: Founding Team Overview (Equal Visual Cards) */}
      <FoundersOverview />

      {/* Section 02: Himanshu Rajak Dedicated Portfolio */}
      <HimanshuPortfolio />

      {/* Section 03: Shabnam Dedicated Portfolio */}
      <ShabnamPortfolio />

      {/* Section 04: Founding Philosophy (Research. Engineering. Execution.) */}
      <FoundingPhilosophy />

      {/* Section 05: Building Quintos AI Narrative */}
      <BuildingQuintos />

      {/* Section 06: Selected Work & Technical Notes with Attribution */}
      <PortfolioSelectedWork />

      {/* Section 07: Professional Profiles & Links (Two-Column Grid) */}
      <PortfolioLinks />

      {/* Section 08: Final CTA (Research. Build. Execute.) */}
      <PortfolioCTA />
    </div>
  );
}
