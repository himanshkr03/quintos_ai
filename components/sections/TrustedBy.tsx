// File: E:\quintos_ai\components\sections\TrustedBy.tsx

import Image from "next/image";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";

const partners = [
  {
    name: "OpenAI",
    logo: "/logos/openai.svg",
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft.svg",
  },
  {
    name: "Google",
    logo: "/logos/google.svg",
  },
  {
    name: "NVIDIA",
    logo: "/logos/nvidia.svg",
  },
  {
    name: "Meta",
    logo: "/logos/meta.svg",
  },
  {
    name: "Amazon",
    logo: "/logos/aws.svg",
  },
];

export default function TrustedBy() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionTitle
          badge="Trusted Technologies"
          title="Built Using World-Class AI Technologies"
          description="Quintos AI leverages modern AI frameworks, cloud platforms, and enterprise technologies to build intelligent solutions."
        />

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-28 items-center justify-center rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}