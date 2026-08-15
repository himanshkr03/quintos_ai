import Image from "next/image";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

const ecosystemTech = [
  {
    name: "OpenAI",
    logo: "/logos/openai.svg",
    category: "Foundation Models & LLM APIs",
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft.svg",
    category: "Enterprise Cloud & Azure AI",
  },
  {
    name: "Google",
    logo: "/logos/google.svg",
    category: "Gemini & TPU Infrastructure",
  },
  {
    name: "NVIDIA",
    logo: "/logos/nvidia.svg",
    category: "CUDA & GPU Acceleration",
  },
  {
    name: "Meta",
    logo: "/logos/meta.svg",
    category: "Llama & Open AI Architectures",
  },
  {
    name: "Amazon AWS",
    logo: "/logos/aws.svg",
    category: "Cloud Compute & SageMaker",
  },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-20">
      <Container>
        <SectionTitle
          badge="Technology Stack & Ecosystem"
          title="Engineered Across Modern AI Frameworks"
          description="Quintos AI builds on state-of-the-art open models, accelerated computing architectures, and cloud platforms to deliver robust enterprise intelligence."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {ecosystemTech.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-12 w-full items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={110}
                  height={36}
                  className="h-8 w-auto max-w-[100px] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <span className="mt-3 text-[11px] font-mono text-slate-400 text-center leading-tight">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}