import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import { AppProvider } from "@/providers";

import { inter, spaceGrotesk } from "@/lib/fonts";
import { metadata as siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-white antialiased`}
      >
        <AppProvider>
          {/* Header */}
          <Navbar />

          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}