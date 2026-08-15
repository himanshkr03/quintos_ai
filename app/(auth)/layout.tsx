// File: E:\quintos_ai\app\(auth)\layout.tsx

import React from "react";
import Link from "next/link";
import Logo from "@/components/shared/navigation/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Auth Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 sm:px-12 backdrop-blur-md">
        <Logo />
        <Link
          href="/"
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition"
        >
          ← Return to Marketing Site
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Auth Footer */}
      <footer className="border-t border-slate-200/80 bg-white p-4 text-center text-[11px] text-slate-500 font-mono">
        <span>QUINTOS AI &bull; Research &bull; Intelligence &bull; Advanced Computing</span>
        <div className="mt-1">
          <span className="text-slate-400">Based in Mohali, Punjab, India</span>
        </div>
      </footer>
    </div>
  );
}
