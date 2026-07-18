import Button from "@/components/shared/common/Button";

export default function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Button size="lg">
        Get Started
      </Button>

      <Button
        size="lg"
        variant="outline"
      >
        Explore Products
      </Button>
    </div>
  );
}