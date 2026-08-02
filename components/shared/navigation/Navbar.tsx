"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import MobileNav from "./MobileNav";

import Container from "@/components/shared/layout/Container";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import Button from "@/components/shared/common/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <Container>
          <nav
            className="flex h-20 items-center justify-between"
            aria-label="Main Navigation"
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <DesktopMenu />

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Login */}
              <Button
                variant="ghost"
                className="hidden lg:inline-flex"
              >
                Login
              </Button>

              {/* CTA */}
              <Button className="hidden lg:inline-flex">
                Get Started
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                aria-label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
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