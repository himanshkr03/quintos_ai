// lib/metadata.ts

import type { Metadata } from "next";

export const siteConfig = {
  name: "Quintos AI",
  title: "Quintos AI | AI Research, Intelligent Systems & Advanced Computing",
  description:
    "Quintos AI builds sovereign artificial intelligence architectures, foundational reasoning models, biomedical vision systems, and quantum machine learning.",

  url: "https://quintosai.com",

  ogImage: "/og-image.png",

  creator: "Quintos AI",

  keywords: [
    "Artificial Intelligence",
    "Generative AI",
    "Machine Learning",
    "LLM Reasoning",
    "RAG",
    "AI Agents",
    "Sovereign AI",
    "Enterprise AI",
    "Deep Learning",
    "Computer Vision",
    "Quantum Machine Learning",
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  authors: [
    {
      name: siteConfig.creator,
    },
  ],

  creator: siteConfig.creator,

  metadataBase: new URL(siteConfig.url),

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};