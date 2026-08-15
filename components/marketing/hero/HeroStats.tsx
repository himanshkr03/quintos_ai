import { Cpu, ShieldCheck, Atom, Network } from "lucide-react";

const pillars = [
  {
    icon: Network,
    title: "Foundational AI",
    subtitle: "Reasoning & LLM Architecture",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Systems",
    subtitle: "Sovereign & Secure Workflows",
  },
  {
    icon: Cpu,
    title: "Autonomous Agents",
    subtitle: "Multimodal Task Planning",
  },
  {
    icon: Atom,
    title: "Quantum ML",
    subtitle: "Hybrid Classical Computing",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-14 pt-8 border-t border-slate-200/80">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="group">
              <div className="flex items-center gap-2 text-blue-600 mb-1.5">
                <Icon className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {pillar.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {pillar.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}