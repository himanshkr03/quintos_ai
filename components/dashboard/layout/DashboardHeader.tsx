// File: E:\quintos_ai\components\dashboard\layout\DashboardHeader.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { MOCK_NOTIFICATIONS, MockNotification } from "@/data/dashboard";
import { useAuth } from "@/providers";
import DashboardSidebar from "./DashboardSidebar";
import ProjectSelector from "../projects/ProjectSelector";

export default function DashboardHeader() {
  const router = useRouter();
  const { user, signOut: authSignOut } = useAuth();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<MockNotification[]>(
    MOCK_NOTIFICATIONS
  );

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Research Fellow";
  const userEmail = user?.email || "himanshkr03@gmail.com";
  const isLiveAuth = !!user;

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSignOut = async () => {
    try {
      await authSignOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("[Sign Out Error]:", err);
      router.push("/login");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 md:px-8 backdrop-blur-md">
        {/* Left Section: Mobile Toggle & Project / Search */}
        <div className="flex items-center gap-3">
          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Open navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Project Workspace Selector */}
          <ProjectSelector className="hidden sm:block" />

          {/* Quick Search */}
          <div className="relative hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search models, keys, compute..."
              className="w-36 lg:w-56 bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <kbd className="hidden lg:inline-block rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section: Badges & Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mode Pill */}
          {isLiveAuth ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="hidden xs:inline">Authenticated Session</span>
              <span className="xs:hidden">Auth</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="hidden xs:inline">Demonstration Mode</span>
              <span className="xs:hidden">Demo</span>
            </div>
          )}

          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      System Notifications
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Research logs & compute telemetry
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[11px] font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="py-6 text-center text-xs text-slate-400">
                      No notifications recorded.
                    </p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`rounded-xl p-3 text-xs transition ${
                          notif.read
                            ? "bg-slate-50/60 text-slate-600"
                            : "bg-blue-50/50 text-slate-900 border-l-2 border-blue-600"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <strong className="font-semibold text-slate-900">
                            {notif.title}
                          </strong>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                          {notif.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown Trigger */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label="User profile menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-2xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {userName}
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  {isLiveAuth ? "Active Workspace" : "Demonstration User"}
                </p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    {userEmail}
                  </p>
                </div>

                <div className="py-1 space-y-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                  >
                    <User className="h-4 w-4 text-slate-500" />
                    <span>Profile Overview</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                  >
                    <Settings className="h-4 w-4 text-slate-500" />
                    <span>Workspace Settings</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                  >
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                    <span>Public Website</span>
                  </Link>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Sidebar */}
      {mobileDrawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Dashboard Navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <DashboardSidebar onClose={() => setMobileDrawerOpen(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
}