"use client";

import { Menu } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import Button from "@/components/shared/common/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopMenu />

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <Button
              variant="ghost"
              className="hidden lg:flex"
            >
              Login
            </Button>

            <Button
              className="hidden lg:flex"
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>

          </div>

        </div>
      </Container>
    </header>
  );
}