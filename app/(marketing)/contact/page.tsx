// File: E:\quintos_ai\app\(marketing)\contact\page.tsx

import { Mail, MapPin, Clock } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import ContactForm from "@/components/marketing/contact/ContactForm";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Contact Laboratory & Partnerships | Quintos AI",
  description: "Connect with the Quintos AI research laboratory for enterprise inquiries, research collaboration, and technical audits.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Direct Inquiries
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Let&apos;s Architect the Future{" "}
              <span className="gradient-ai">Together with AI</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Whether you are seeking custom LLM development, medical imaging
              perception, sovereign private infrastructure, or academic research
              collaboration, our team is ready to assist.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Office & Verification Information */}
      <section className="bg-slate-50/70 py-16 border-t border-slate-200/60">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-blue-600 mb-2.5">
                <MapPin className="h-5 w-5" />
                <h3 className="text-base font-bold text-slate-900">
                  Location & Base
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Based in Mohali, Punjab, India
                <br />
                Global Inquiries & Deployments
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-blue-600 mb-2.5">
                <Mail className="h-5 w-5" />
                <h3 className="text-base font-bold text-slate-900">
                  Official Contact
                </h3>
              </div>
              <a
                href="mailto:contact.quintosresearch@gmail.com"
                className="font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors block"
              >
                contact.quintosresearch@gmail.com
              </a>
              <span className="mt-1 block text-[11px] text-slate-400">
                Encrypted & Reviewed Daily
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-blue-600 mb-2.5">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-bold text-slate-900">
                  Operational Hours
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Monday – Friday
                <br />
                9:00 AM – 6:00 PM IST (UTC +5:30)
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}