// File: E:\quintos_ai\app\(marketing)\portfolio\page.tsx

import { Metadata } from "next";
import {
  PortfolioHero,
  PortfolioAbout,
  PortfolioInterests,
  PortfolioInnovation,
  PortfolioSelectedWork,
  PortfolioQuintosConnection,
  PortfolioLinks,
  PortfolioCTA,
} from "@/components/marketing/portfolio";

export const metadata: Metadata = {
  title: "Himanshu Rajak — Founder & AI Researcher | Quintos AI",
  description:
    "Founder, AI researcher, and technology innovator building at the intersection of Artificial Intelligence, Quantum Machine Learning, Healthcare AI, and Intelligent Systems.",
  openGraph: {
    title: "Himanshu Rajak — Founder & AI Researcher | Quintos AI",
    description:
      "Founder, AI researcher, and technology innovator building at the intersection of Artificial Intelligence, Quantum Machine Learning, Healthcare AI, and Intelligent Systems.",
    url: "https://quintosai.com/portfolio",
    siteName: "Quintos AI",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Rajak — Founder & AI Researcher | Quintos AI",
    description:
      "Founder, AI researcher, and technology innovator building at the intersection of Artificial Intelligence, Quantum Machine Learning, Healthcare AI, and Intelligent Systems.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <PortfolioHero />

      {/* 2. About the Researcher */}
      <PortfolioAbout />

      {/* 3. Research Interests */}
      <PortfolioInterests />

      {/* 4. Research & Innovation Trajectories */}
      <PortfolioInnovation />

      {/* 5. Selected Work & Technical Notes */}
      <PortfolioSelectedWork />

      {/* 6. Building Quintos AI Connection */}
      <PortfolioQuintosConnection />

      {/* 7. Professional Profiles & Links */}
      <PortfolioLinks />

      {/* 8. Final CTA Section */}
      <PortfolioCTA />
    </div>
  );
}
