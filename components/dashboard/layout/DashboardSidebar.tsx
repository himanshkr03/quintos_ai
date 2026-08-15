// File: E:\quintos_ai\components\dashboard\layout\DashboardSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CreditCard,
  KeyRound,
  Settings,
  ArrowLeft,
  Server,
  Activity,
} from "lucide-react";
import Logo from "@/components/shared/navigation/Logo";

interface DashboardSidebarProps {
  onClose?: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "API Keys",
    href: "/api-keys",
    icon: KeyRound,
    badge: "3",
  },
  {
    name: "Billing & Credits",
    href: "/billing",
    icon: CreditCard,
    badge: "Demo",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    badge: null,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
];

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-72 flex-col justify-between border-r border-slate-200/80 bg-white shadow-xs">
      <div>
        {/* Logo & Workspace Title */}
        <div className="border-b border-slate-100 p-6">
          <Logo />
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              Research Workspace
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 p-4" aria-label="Dashboard Navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      active ? "text-white" : "text-slate-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                      active
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer & Operational Status */}
      <div className="border-t border-slate-100 p-4 space-y-3">
        {/* Node Status Card */}
        <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono font-semibold text-slate-800 text-[11px]">
              <Server className="h-3.5 w-3.5 text-blue-600" />
              Sovereign Node
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 font-mono">
              <Activity className="h-3 w-3" />
              Active
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            Based in Mohali, Punjab, India
          </p>
        </div>

        {/* Back to Public Site */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Marketing Site</span>
        </Link>
      </div>
    </aside>
  );
}