// File: E:\quintos_ai\components\dashboard\widgets\QuickActions.tsx

import Link from "next/link";
import {
  KeyRound,
  FileText,
  CreditCard,
  Layers,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Generate API Key",
    desc: "Create secret tokens for SDK access",
    href: "/api-keys",
    icon: KeyRound,
  },
  {
    title: "Manage Compute Credits",
    desc: "Review quota allocation & invoices",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Research Explorations",
    desc: "Read foundational AI research notes",
    href: "/blog",
    icon: FileText,
  },
  {
    title: "Sovereign AI Capabilities",
    desc: "Explore models, vision & quantum",
    href: "/products",
    icon: Layers,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center justify-between rounded-xl border border-slate-200/80 p-3 text-xs transition hover:border-blue-300 hover:bg-blue-50/40 group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">
                    {action.title}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {action.desc}
                  </span>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}