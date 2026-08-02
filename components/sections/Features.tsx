// File: E:\quintos_ai\components\sections\Features.tsx

import {
  Brain,
  Bot,
  Cpu,
  ShieldCheck,
  Workflow,
  Sparkles,
} from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

const features = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Enterprise-grade AI solutions tailored for modern businesses.",
  },
  {
    icon: Bot,
    title: "Generative AI",
    description:
      "Build intelligent assistants, copilots, and LLM-powered applications.",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    description:
      "Predictive analytics and intelligent decision-making systems.",
  },
  {
    icon: ShieldCheck,
    title: "Secure AI",
    description:
      "Privacy-first AI infrastructure with enterprise-grade security.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive business processes using intelligent agents.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "Research-driven AI technologies designed for the future.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          badge="Why Choose Quintos AI"
          title="Powerful AI Capabilities for Every Business"
          description="We combine cutting-edge research, enterprise engineering, and modern AI technologies to deliver scalable intelligent solutions."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}