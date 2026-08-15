// File: E:\quintos_ai\app\(marketing)\contact\page.tsx

import { Mail, MapPin, ExternalLink, ShieldCheck, MessageSquare } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import ContactForm from "@/components/marketing/contact/ContactForm";
import ContactFAQ from "@/components/marketing/contact/ContactFAQ";
import CTA from "@/components/sections/CTA";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";
import { SOCIALS } from "@/constants/social";
import { SITE } from "@/constants/site";

export const metadata = {
  title: "Contact Laboratory & Inquiries | Quintos AI",
  description:
    "Connect with the Quintos AI research laboratory for enterprise inquiries, research collaboration, biomedical perception scopes, and technical audits.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Direct Communication & Inquiries
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Let&apos;s Architect the Future{" "}
              <span className="gradient-ai">Together with AI</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Whether you are evaluating sovereign LLM runtimes, biomedical imaging
              perception, air-gapped on-prem infrastructure, or exploratory research
              collaborations, our team is ready to consult.
            </p>

            {/* Quick Context Pill Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                Direct Technical Review
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Prospective NDA Review
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                Based in Mohali, Punjab, India
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Guided Interactive Contact Form */}
      <ContactForm />

      {/* Verified Official Channel Information */}
      <section className="bg-slate-50/70 py-16 border-t border-slate-200/60">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* Email */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-blue-600 mb-2.5">
                  <Mail className="h-5 w-5" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Official Email
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Direct research & business inquiries
                </p>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors break-all"
                aria-label="Email Quintos AI official contact"
              >
                {SITE.email}
              </a>
            </div>

            {/* LinkedIn */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-blue-600 mb-2.5">
                  <LinkedInIcon className="h-5 w-5" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Official LinkedIn
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Company news & research announcements
                </p>
              </div>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Visit Quintos AI official LinkedIn page"
              >
                <span>linkedin.com/company/quintos-ai</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* GitHub */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-blue-600 mb-2.5">
                  <GitHubIcon className="h-5 w-5" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Official GitHub
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Open-source code & research repositories
                </p>
              </div>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Visit Quintos AI official GitHub organization"
              >
                <span>github.com/Quintos-AI</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-blue-600 mb-2.5">
                  <MapPin className="h-5 w-5" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Laboratory Base
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Research & Development
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Based in Mohali, Punjab, India
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Communication & Scoping FAQs */}
      <ContactFAQ />

      {/* Final Call to Action */}
      <CTA />
    </>
  );
}