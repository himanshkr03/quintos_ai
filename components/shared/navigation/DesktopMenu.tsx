"use client";

import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Research", href: "/research" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function DesktopMenu() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-sm font-medium transition hover:text-blue-600"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}