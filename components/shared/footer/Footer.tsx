import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Logo from "@/components/shared/navigation/Logo";
import { SITE } from "@/constants/site";
import { SOCIALS } from "@/constants/social";

const footerLinks = {
  products: [
    { label: "Quintos Assistant", href: "/products" },
    { label: "Quintos Vision", href: "/products" },
    { label: "Quintos Secure AI", href: "/products" },
    { label: "Medical AI Platform", href: "/products" },
    { label: "AI Learning Platform", href: "/products" },
  ],
  services: [
    { label: "Generative AI", href: "/services" },
    { label: "Enterprise AI Solutions", href: "/services" },
    { label: "Machine Learning", href: "/services" },
    { label: "Computer Vision", href: "/services" },
    { label: "AI Strategy & Consulting", href: "/services" },
  ],
  research: [
    { label: "Large Language Models", href: "/research" },
    { label: "Multimodal AI", href: "/research" },
    { label: "Quantum Machine Learning", href: "/research" },
    { label: "Healthcare AI", href: "/research" },
    { label: "Autonomous AI Agents", href: "/research" },
  ],
  company: [
    { label: "About Quintos AI", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog & Insights", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialItems = [
  { name: "GitHub", href: SOCIALS.github },
  { name: "LinkedIn", href: SOCIALS.linkedin },
  { name: "X", href: SOCIALS.x },
  { name: "YouTube", href: SOCIALS.youtube },
  { name: "Instagram", href: SOCIALS.instagram },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-slate-50 text-gray-600">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-4">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-gray-600 max-w-sm">
              {SITE.description}
            </p>

            {/* Direct Official Contact Email */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4 text-blue-600 shrink-0" />
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-blue-600 transition-colors"
              >
                {SITE.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
              {socialItems.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.products.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Research
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.research.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-900">
              Legal
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-gray-500">
          <p>© {currentYear} Quintos AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Mohali, Punjab, India</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}