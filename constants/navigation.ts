// constants/navigation.ts

export interface NavigationItem {
  label: string;
  href: string;
}

export const NAVIGATION: readonly NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Research",
    href: "/research",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;