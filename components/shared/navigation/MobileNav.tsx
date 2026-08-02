"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { NAVIGATION } from "@/constants/navigation";
import Button from "@/components/shared/common/Button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({
  open,
  onClose,
}: MobileNavProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-2xl lg:hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-lg font-semibold">
            Menu
          </h2>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer Buttons */}
        <div className="mt-auto flex flex-col gap-3 p-6">
          <Button variant="ghost">
            Login
          </Button>

          <Button>
            Get Started
          </Button>
        </div>
      </aside>
    </>
  );
}