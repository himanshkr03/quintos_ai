// types/navigation.ts

export interface NavigationItem {
  label: string;
  href: string;
}

export interface FooterLink {
  title: string;
  links: NavigationItem[];
}