// File: E:\quintos_ai\app\not-found.tsx

import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  LayoutDashboard,
  Search,
  BookOpen,
  Mail,
  Layers,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";

export const metadata = {
  title: "404 - Coordinate Not Found | Quintos AI",
  description: "The requested neural trajectory or resource could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl text-center space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1 text-xs font-mono text-blue-400 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>Error 404 &bull; Trajectory Coordinate Unresolved</span>
        </div>

        {/* Big Glitch-Style Status Code */}
        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title and Explanation */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Resource or Neural Endpoint Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The target workspace, dataset index, or inference route you requested does not exist or has been relocated to another sovereign cluster.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              className="w-full sm:w-auto shadow-lg shadow-blue-600/20"
            >
              Return Home
            </Button>
          </Link>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<LayoutDashboard className="h-4 w-4" />}
              className="w-full sm:w-auto border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
            >
              Open Dashboard
            </Button>
          </Link>
        </div>

        {/* Suggested Helpful Links */}
        <div className="pt-8 border-t border-slate-800/80">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">
            Explore Quintos AI Research
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <Link
              href="/research"
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-400 hover:text-white hover:border-slate-700 transition flex flex-col items-center gap-1.5"
            >
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Research</span>
            </Link>

            <Link
              href="/blog"
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-400 hover:text-white hover:border-slate-700 transition flex flex-col items-center gap-1.5"
            >
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span>Publications</span>
            </Link>

            <Link
              href="/api-keys"
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-400 hover:text-white hover:border-slate-700 transition flex flex-col items-center gap-1.5"
            >
              <Search className="h-4 w-4 text-blue-400" />
              <span>API Keys</span>
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-400 hover:text-white hover:border-slate-700 transition flex flex-col items-center gap-1.5"
            >
              <Mail className="h-4 w-4 text-blue-400" />
              <span>Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
