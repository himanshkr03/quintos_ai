// File: E:\quintos_ai\components\marketing\hero\HeroPreview.tsx

import {
  Brain,
  Bot,
  Cpu,
  Sparkles,
} from "lucide-react";

import FloatingCard from "./FloatingCard";

export default function HeroPreview() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Main Dashboard Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              AI Dashboard
            </p>

            <h2 className="text-2xl font-bold text-gray-900">
              Quintos AI
            </h2>
          </div>

          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <Brain size={28} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              AI Models
            </p>

            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              25+
            </h3>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Accuracy
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              99.2%
            </h3>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Active Projects
            </p>

            <h3 className="mt-2 text-3xl font-bold text-blue-600">
              50+
            </h3>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Research Papers
            </p>

            <h3 className="mt-2 text-3xl font-bold text-violet-600">
              20+
            </h3>
          </div>

        </div>
      </div>

      {/* Floating Card - Top Left */}
      <div className="absolute -left-16 top-10 hidden xl:block">
        <FloatingCard
          icon={Bot}
          title="Generative AI"
          description="Enterprise LLM Solutions"
        />
      </div>

      {/* Floating Card - Bottom Right */}
      <div className="absolute -bottom-8 -right-16 hidden xl:block">
        <FloatingCard
          icon={Sparkles}
          title="AI Research"
          description="Next Generation Intelligence"
        />
      </div>

      {/* Floating Card - Top Right */}
      <div className="absolute -right-10 top-1/2 hidden xl:block">
        <FloatingCard
          icon={Cpu}
          title="Machine Learning"
          description="Scalable AI Models"
        />
      </div>

    </div>
  );
}