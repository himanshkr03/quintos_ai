import type { Metadata } from "next";
import "./globals.css";

import { AppProvider } from "@/providers";
import { inter, spaceGrotesk } from "@/lib/fonts";
import { metadata as siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-white text-gray-900 antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}