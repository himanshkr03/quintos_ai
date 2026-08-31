import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import Logo from "@/components/shared/navigation/Logo";
import { SITE } from "@/constants/site";
import { SOCIALS } from "@/constants/social";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";

const footerLinks = {
  products: [
    { label: "Quintos Assistant", href: "/products" },
    { label: "Quintos Vision", href: "/products" },
    { label: "Quintos Secure AI", href: "/products" },
    { label: "Medical AI Platform", href: "/products" },
    { label: "AI Learning Hub", href: "/products" },
  ],
  services: [
    { label: "Foundational & Generative AI", href: "/services" },
    { label: "Computer Vision & Medical AI", href: "/services" },
    { label: "Machine Learning Engineering", href: "/services" },
    { label: "Autonomous Agent Orchestration", href: "/services" },
    { label: "Enterprise AI Strategy", href: "/services" },
  ],
  research: [
    { label: "Large Language Models", href: "/research" },
    { label: "Quantum Machine Learning", href: "/research" },
    { label: "Biomedical Vision", href: "/research" },
    { label: "Autonomous Agent Systems", href: "/research" },
    { label: "Interpretable & Safe AI", href: "/research" },
  ],
  company: [
    { label: "About Quintos AI", href: "/about" },
    { label: "Founding Team", href: "/portfolio" },
    { label: "Careers & Fellowships", href: "/careers" },
    { label: "Pricing & Compute", href: "/pricing" },
    { label: "Research Notes", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Lab", href: "/contact" },
  ],
  legal: [
    { label: "Privacy & Sovereignty", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialItems = [
  {
    name: "LinkedIn",
    href: SOCIALS.linkedin,
    icon: LinkedInIcon,
    label: "Quintos AI Official LinkedIn Organization",
  },
  {
    name: "GitHub",
    href: SOCIALS.github,
    icon: GitHubIcon,
    label: "Quintos AI Official GitHub Organization",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/70 text-slate-600">
      <Container>
        {/* Main Footer Content */}
        <div className="py-14 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-4">
            <Logo />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-sm">
              {SITE.description}
            </p>

            {/* Direct Official Contact Email */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-600">
              <Mail className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-blue-600 transition-colors"
                aria-label="Email Quintos AI official research and inquiry contact"
              >
                {SITE.email}
              </a>
            </div>

            {/* Verified Official Social Links */}
            <div className="mt-5 flex items-center gap-3">
              {socialItems.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:shadow transition-all duration-150"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Products
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {footerLinks.products.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Capabilities
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Research
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {footerLinks.research.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Laboratory
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-900">
              Legal
            </h4>
            <ul className="mt-2 space-y-1.5">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="border-t border-slate-200/80 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} Quintos AI Labs. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Sovereign Lab &bull; Mohali, Punjab, India</span>
            <span>&bull;</span>
            <span className="text-slate-600">Enterprise AI Research</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}