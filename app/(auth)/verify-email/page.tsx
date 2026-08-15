// File: E:\quintos_ai\app\(auth)\verify-email\page.tsx

"use client";

import Link from "next/link";
import { MailCheck, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm text-center space-y-5">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs">
        <MailCheck className="h-6 w-6" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Verify Your Email Address
        </h1>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">
          Please check your email inbox for a verification link from Quintos AI. Clicking the link will verify your credentials and activate your research workspace.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-[11px] text-slate-500 font-mono text-left space-y-1">
        <p><strong>Didn&apos;t receive an email?</strong></p>
        <p>&bull; Check your spam or corporate quarantine folder.</p>
        <p>&bull; Ensure your institutional email accepts incoming messages.</p>
      </div>

      <div className="pt-2">
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition w-full"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Sign In</span>
        </Link>
      </div>
    </div>
  );
}
