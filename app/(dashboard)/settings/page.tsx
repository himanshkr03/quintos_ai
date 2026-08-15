import { Bell, Key, Shield, Sliders } from "lucide-react";

export const metadata = {
  title: "Settings | Quintos AI",
  description: "Configure your Quintos AI workspace settings and preferences.",
};

const settingsSections = [
  {
    title: "General Preferences",
    description: "Default language, timezone, and workspace behavior.",
    icon: Sliders,
  },
  {
    title: "Security & Authentication",
    description: "Two-factor authentication, active sessions, and password management.",
    icon: Shield,
  },
  {
    title: "Notifications",
    description: "Email alerts for API quotas, billing milestones, and system updates.",
    icon: Bell,
  },
  {
    title: "API & Model Defaults",
    description: "Default LLM routing, latency budgets, and fallback endpoints.",
    icon: Key,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your workspace preferences, security configurations, and AI defaults.
        </p>
      </div>

      <div className="grid gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}