import Image from "next/image";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

const ecosystemTech = [
  {
    name: "OpenAI",
    logo: "/logos/openai.svg",
    role: "LLM & Foundation APIs",
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft.svg",
    role: "Azure Cloud & AI Infrastructure",
  },
  {
    name: "Google",
    logo: "/logos/google.svg",
    role: "TPU Compute & Multimodal Models",
  },
  {
    name: "NVIDIA",
    logo: "/logos/nvidia.svg",
    role: "CUDA & TensorRT Acceleration",
  },
  {
    name: "Meta",
    logo: "/logos/meta.svg",
    role: "Llama & Open-Weight Architectures",
  },
  {
    name: "Amazon AWS",
    logo: "/logos/aws.svg",
    role: "SageMaker & Distributed Clusters",
  },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-200/60 bg-slate-50/50 py-14 md:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Technology Ecosystem
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Engineered Across Modern AI Frameworks
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Quintos AI architectures build upon open-source research models, accelerated
            computing runtimes, and enterprise cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 max-w-6xl mx-auto">
          {ecosystemTech.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center rounded-xl border border-slate-200/70 bg-white/90 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-10 w-full items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={100}
                  height={32}
                  className="h-7 w-auto max-w-[90px] object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <span className="mt-2.5 text-[10px] font-mono text-slate-400 text-center leading-tight">
                {tech.role}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}