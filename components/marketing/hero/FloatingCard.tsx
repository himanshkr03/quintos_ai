// File: E:\quintos_ai\components\marketing\hero\FloatingCard.tsx

import { LucideIcon } from "lucide-react";

interface FloatingCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function FloatingCard({
  icon: Icon,
  title,
  description,
  className = "",
}: FloatingCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        <Icon size={24} />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}