"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Building,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  Save,
  Laptop,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";
import { SITE } from "@/constants/site";

export default function ProfilePage() {
  const [name, setName] = useState<string>("Himanshu Rajak");
  const [email, setEmail] = useState<string>(SITE.email);
  const [organization, setOrganization] = useState<string>("Quintos AI Research Laboratory");
  const [roleTitle, setRoleTitle] = useState<string>("Lead AI & Quantum Systems Engineer");
  const [location, setLocation] = useState<string>("Based in Mohali, Punjab, India");
  const [bio, setBio] = useState<string>(
    "Focusing on foundational LLM reasoning bounds, variational quantum eigensolvers, and sovereign distributed model inference."
  );

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("Profile changes saved successfully in demonstration mode.");
      setTimeout(() => setToastMessage(null), 4000);
    }, 500);
  };

  const toggleTwoFactor = () => {
    const nextState = !twoFactorEnabled;
    setTwoFactorEnabled(nextState);
    setToastMessage(
      nextState
        ? "Two-Factor Authentication enabled (Demonstration mode)."
        : "Two-Factor Authentication disabled (Demonstration mode)."
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          User & Research Profile
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Manage your research identity, authorized contact credentials, and session security.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Demonstration Mode &bull; Local Profile Simulation</strong>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            Profile modifications are simulated locally for dashboard evaluation. In production environments, credentials sync with your identity provider.
          </p>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        {/* Avatar & Title Banner */}
        <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
            HR
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{name}</h2>
            <p className="text-xs font-mono text-slate-500">{roleTitle} &bull; Workspace Owner</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Primary Contact Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Organization */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Organization / Research Lab
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Role Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Role & Specialization
              </label>
              <input
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Laboratory Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Research Focus & Technical Overview
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving}
              leftIcon={<Save className="h-4 w-4" />}
            >
              {isSaving ? "Saving..." : "Save Changes (Demo)"}
            </Button>
          </div>
        </form>
      </div>

      {/* Security & Sessions Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 2FA Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-1">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Two-Factor Authentication</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Require a time-based one-time password (TOTP) from an authenticator application for API token issuance and billing updates.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span
              className={`font-mono text-xs font-bold ${
                twoFactorEnabled ? "text-emerald-600" : "text-slate-400"
              }`}
            >
              {twoFactorEnabled ? "Status: Enabled" : "Status: Disabled"}
            </span>

            <button
              type="button"
              onClick={toggleTwoFactor}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              {twoFactorEnabled ? "Disable (Demo)" : "Enable (Demo)"}
            </button>
          </div>
        </div>

        {/* Active Session Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-1">
              <Laptop className="h-5 w-5 text-blue-600" />
              <span>Active Workspace Session</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Authenticated device session accessing sovereign workspace telemetry.
            </p>

            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs font-mono text-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Chrome on Windows</span>
                <span className="text-[10px] text-emerald-600 font-bold">Current Session</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Based in Mohali, Punjab, India &bull; IP: 103.24.xxx.xxx</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Session ID: sess_9f8a2c1e</span>
            <span className="text-emerald-600 font-bold">Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}