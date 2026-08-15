// File: E:\quintos_ai\components\marketing\hero\HeroButtons.tsx

"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      {/* Primary Button */}
      <Button
        href="/contact"
        variant="primary"
        rightIcon={<ArrowRight size={18} />}
      >
        Get Started
      </Button>

      {/* Secondary Button */}
      <Button
        href="/products"
        variant="ghost"
      >
        Explore Products
      </Button>
    </div>
  );
}