// File: E:\quintos_ai\app\(dashboard)\profile\page.tsx

"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";
import { SITE } from "@/constants/site";
import { useAuth } from "@/providers";

export default function ProfilePage() {
  const { user, refreshSession } = useAuth();
  const [name, setName] = useState<string>("Himanshu Rajak");
  const [email, setEmail] = useState<string>(SITE.email);
  const [organization, setOrganization] = useState<string>(
    "Quintos AI Research Laboratory"
  );
  const [roleTitle, setRoleTitle] = useState<string>(
    "Lead AI & Quantum Systems Engineer"
  );
  const [location, setLocation] = useState<string>(
    "Based in Mohali, Punjab, India"
  );
  const [bio, setBio] = useState<string>(
    "Focusing on foundational LLM reasoning bounds, variational quantum eigensolvers, and sovereign distributed model inference."
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const isAuthenticatedSession = !!user;

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      setIsLoadingProfile(true);
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            if (data.profile.name) setName(data.profile.name);
            if (data.profile.email) setEmail(data.profile.email);
            if (data.profile.organizationName)
              setOrganization(data.profile.organizationName);
            if (data.profile.roleTitle) setRoleTitle(data.profile.roleTitle);
            if (data.profile.location) setLocation(data.profile.location);
            if (data.profile.bio) setBio(data.profile.bio);
          }
        }
      } catch (err) {
        console.warn("[Profile Fetch Warning]:", err);
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setToastMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          organizationName: organization.trim(),
          roleTitle: roleTitle.trim(),
          location: location.trim(),
          bio: bio.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data?.error?.message || "Failed to update profile.");
        setIsSaving(false);
        return;
      }

      setToastMessage("Profile changes saved successfully to database.");
      setTimeout(() => setToastMessage(null), 4000);
      if (refreshSession) {
        await refreshSession();
      }
    } catch (err) {
      console.error("[Save Profile Error]:", err);
      setErrorMessage("An unexpected network error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
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

      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-900 flex items-center gap-2.5 animate-in fade-in"
        >
          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
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

      {/* Mode Notice */}
      {isAuthenticatedSession ? (
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-4 text-xs text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Authenticated Workspace Identity</strong>
            <p className="mt-0.5 text-emerald-800 leading-relaxed">
              Your profile is synchronized with your active Supabase authentication identity and PostgreSQL user record.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Demonstration Mode &bull; Local Profile View</strong>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              Sign in with an authenticated account to persist custom profile updates across your research organization.
            </p>
          </div>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        {/* Avatar & Title Banner */}
        <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{name}</h2>
            <p className="text-xs font-mono text-slate-500">{roleTitle} &bull; Workspace Member</p>
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
                  disabled={isSaving || isLoadingProfile}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
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
                  disabled
                  title="Email cannot be changed directly from profile"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 outline-none cursor-not-allowed"
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
                disabled={isSaving || isLoadingProfile}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
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
                disabled={isSaving || isLoadingProfile}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
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
              disabled={isSaving || isLoadingProfile}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
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
              disabled={isSaving || isLoadingProfile}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:bg-slate-50"
            />
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving || isLoadingProfile}
              leftIcon={
                isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )
              }
            >
              {isSaving ? "Saving..." : "Save Changes"}
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
              Require a time-based one-time password (TOTP) from an authenticator application for API token issuance and workspace administration.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-slate-500">
              Status: Not Configured
            </span>

            <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
              Requires TOTP Setup
            </span>
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
                <span className="font-bold text-slate-900">Browser Session</span>
                <span className="text-[10px] text-emerald-600 font-bold">
                  {isAuthenticatedSession ? "Live Supabase Session" : "Simulated"}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Based in Mohali, Punjab, India &bull; Encrypted TLS 1.3</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Identity: {isAuthenticatedSession ? email : "Demo Session"}</span>
            <span className="text-emerald-600 font-bold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}