import { ArrowRight, Compass } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Button
        href="/contact"
        variant="primary"
        size="lg"
        rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
      >
        Get Started
      </Button>

      <Button
        href="/research"
        variant="outline"
        size="lg"
        leftIcon={<Compass className="h-4 w-4 text-blue-600" />}
      >
        Explore Research
      </Button>
    </div>
  );
}