// lib/metadata.ts

import type { Metadata } from "next";

export const siteConfig = {
  name: "Quintos AI",
  title: "Quintos AI | AI Solutions, Products & Research",
  description:
    "Quintos AI builds intelligent AI products, enterprise solutions, research platforms, and automation systems for the future.",

  url: "https://quintosai.com",

  ogImage: "/og-image.png",

  creator: "Quintos AI",

  keywords: [
    "Artificial Intelligence",
    "Generative AI",
    "Machine Learning",
    "LLM",
    "RAG",
    "AI Agents",
    "Automation",
    "Enterprise AI",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
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
    creator: "@quintosai",
  },

  robots: {
    index: true,
    follow: true,
  },
};