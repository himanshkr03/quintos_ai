// File: E:\quintos_ai\components\marketing\hero\HeroButtons.tsx

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Button from "@/components/shared/common/Button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      {/* Primary Button */}
      <Link href="/contact">
        <Button className="flex items-center gap-2">
          Get Started
          <ArrowRight size={18} />
        </Button>
      </Link>

      {/* Secondary Button */}
      <Link href="/products">
        <Button variant="ghost">
          Explore Products
        </Button>
      </Link>
    </div>
  );
}