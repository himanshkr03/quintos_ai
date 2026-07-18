import Container from "@/components/shared/layout/Container";
import Section from "@/components/shared/layout/Section";

import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <Section className="overflow-hidden">
      <Container>
        <div className="mx-auto max-w-4xl text-center">

          <HeroBadge />

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Building Intelligent
            <br />
            AI Solutions
            <span className="text-blue-600">
              {" "}for Tomorrow
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600">
            Quintos AI develops next-generation AI products,
            enterprise automation, intelligent research platforms,
            and scalable solutions powered by modern AI.
          </p>

          <HeroButtons />

          <HeroStats />

        </div>
      </Container>
    </Section>
  );
}