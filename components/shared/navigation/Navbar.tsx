// File: E:\quintos_ai\components\shared\navigation\Navbar.tsx

"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import Button from "@/components/shared/ui/Button";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
        <Container>
          <div
            className="flex h-16 items-center justify-between px-2"
            role="navigation"
            aria-label="Main Navigation"
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Right Section */}
            <div className="flex items-center gap-2.5">
              {/* Sign In */}
              <Button
                href="/login"
                variant="ghost"
                size="sm"
                className="hidden lg:inline-flex text-xs font-semibold"
              >
                Sign In
              </Button>

              {/* Workspace / Dashboard */}
              <Button
                href="/dashboard"
                variant="primary"
                size="sm"
                className="hidden lg:inline-flex text-xs"
              >
                Workspace
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                aria-label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}