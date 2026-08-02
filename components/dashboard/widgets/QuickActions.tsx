// File: E:\quintos_ai\components\dashboard\widgets\QuickActions.tsx

import {
  Bot,
  FileText,
  KeyRound,
  Plus,
} from "lucide-react";

const actions = [
  {
    title: "New AI Chat",
    icon: Bot,
  },
  {
    title: "Generate API Key",
    icon: KeyRound,
  },
  {
    title: "Create Project",
    icon: Plus,
  },
  {
    title: "View Documentation",
    icon: FileText,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Icon size={20} />
              </div>

              <span className="font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}