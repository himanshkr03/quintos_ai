"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted. Our team will review your inquiry.");
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          badge="Direct Inquiries"
          title="Connect with Our Research & Engineering Team"
          description="Whether you have an enterprise integration project, research collaboration inquiry, or sovereign deployment question, we are ready to assist."
        />

        <div className="grid gap-10 lg:grid-cols-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Official Inquiries</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Research & Partnerships</p>
                  <a
                    href="mailto:contact.quintosresearch@gmail.com"
                    className="mt-2 block font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    contact.quintosresearch@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Location</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Research & Development</p>
                  <p className="mt-2 text-xs font-medium text-slate-700 leading-relaxed">
                    Based in Mohali, Punjab, India
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200/60 bg-blue-50/40 p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Sovereignty & Privacy Note
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-blue-800/80">
                All communications and project specifications submitted to Quintos AI are strictly confidential and governed under non-disclosure security standards.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-sm"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g. Dr. Alex Morgan"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="alex@organization.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Subject / Topic <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="e.g. Enterprise LLM Deployment / Research Collaboration"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Project Details / Inquiry <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Describe your technical requirements, goals, or research questions..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rightIcon={<Send className="h-4 w-4" />}
                >
                  Send Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}