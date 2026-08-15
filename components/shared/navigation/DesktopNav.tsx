"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { NAVIGATION } from "@/constants/navigation";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-8 lg:flex"
      aria-label="Desktop Navigation"
    >
      {NAVIGATION.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "group relative text-sm font-medium transition-colors duration-300",
              isActive
                ? "text-blue-600"
                : "text-gray-700 hover:text-gray-900"
            )}
          >
            {item.label}

            <span
              className={clsx(
                "absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-blue-600 transition-transform duration-300 origin-left",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}