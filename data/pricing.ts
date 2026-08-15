// File: E:\quintos_ai\data\pricing.ts

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number | null; // null for free or custom
  annualPrice: number | null; // monthly equivalent when billed annually
  period: string;
  annualBillingText?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
  variant: "outline" | "primary";
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "developer",
    name: "Developer & Academic",
    description: "Designed for researchers, students, and prototype evaluation with open-weight foundation models.",
    monthlyPrice: 0,
    annualPrice: 0,
    period: "free tier",
    features: [
      "Access to open foundation model endpoints",
      "Standard rate limits (60 req/min)",
      "Public research forum access",
      "Interactive knowledge notebook runtime",
      "Community documentation & algorithmic tutorials",
    ],
    ctaText: "Explore Free Tier",
    ctaHref: "/contact?plan=developer",
    variant: "outline",
  },
  {
    id: "pro",
    name: "Pro & Applied Scale",
    badge: "Most Popular",
    description: "Engineered for development teams scaling production workloads and fine-tuning pipelines.",
    monthlyPrice: 49,
    annualPrice: 39, // $39/mo billed annually ($468/yr) - 20% savings
    period: "per seat / month",
    annualBillingText: "Billed annually ($468/yr). Save 20%",
    features: [
      "Priority GPU-accelerated inference queues",
      "PEFT / LoRA fine-tuning pipeline access",
      "High-throughput vector indexing (up to 1M vectors)",
      "Dedicated API key management & usage quotas",
      "Direct technical email support (24h turnaround)",
      "Automated evaluation & regression test suites",
    ],
    popular: true,
    ctaText: "Select Pro Scale",
    ctaHref: "/contact?plan=pro",
    variant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise Sovereign",
    badge: "Air-Gapped & Custom",
    description: "For organizations demanding air-gapped security, custom model weights, and dedicated infrastructure.",
    monthlyPrice: null,
    annualPrice: null,
    period: "custom engagement",
    features: [
      "Air-gapped on-premise / private VPC runtime architecture",
      "Custom domain-adapted LLM training on private data",
      "Zero telemetry retention & full tensor encryption",
      "Sub-millisecond custom CUDA & TensorRT kernels",
      "Dedicated AI research & systems engineering consultation",
      "Custom architectural SLA and priority engineering support",
    ],
    ctaText: "Contact Enterprise Lab",
    ctaHref: "/contact?plan=enterprise",
    variant: "outline",
  },
];

export const pricingFaqs = [
  {
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Yes. You can transition your tier at any time. When upgrading from monthly to annual, your unused compute quota is credited toward the annual plan.",
  },
  {
    question: "How does Quintos AI handle private enterprise data?",
    answer:
      "For Enterprise Sovereign deployments, model weights and tensor runtimes are isolated inside your designated private cloud or on-premise hardware with zero data telemetry transmitted externally.",
  },
  {
    question: "Are academic and non-profit research discounts available?",
    answer:
      "Yes. We provide grant-sponsored compute quotas and specialized API allowances for accredited university research laboratories and open-source scientific initiatives.",
  },
];
