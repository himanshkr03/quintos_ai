"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, RefreshCw, Send } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Pre-fill subject based on query parameters (e.g. ?plan=pro or ?position=...)
  useEffect(() => {
    const plan = searchParams.get("plan");
    const position = searchParams.get("position");
    const billing = searchParams.get("billing");
    const topic = searchParams.get("topic");

    if (position) {
      setForm((prev) => ({
        ...prev,
        subject: `Fellowship / Career Application: ${position}`,
        message: `I am interested in applying for the ${position} role. Please find my background summary below:`,
      }));
    } else if (plan) {
      setForm((prev) => ({
        ...prev,
        subject: `Enterprise / Plan Inquiry: ${plan.toUpperCase()} Tier (${billing || "monthly"})`,
        message: `We would like to discuss deploying the ${plan.toUpperCase()} tier for our team.`,
      }));
    } else if (topic) {
      setForm((prev) => ({
        ...prev,
        subject: `Research Collaboration: ${topic}`,
      }));
    }
  }, [searchParams]);

  const validate = (values: FormState): FormErrors => {
    const errs: FormErrors = {};

    if (!values.name.trim()) {
      errs.name = "Full name is required";
    } else if (values.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(values.email.trim())) {
      errs.email = "Please enter a valid email address (e.g. name@company.com)";
    }

    if (!values.subject.trim()) {
      errs.subject = "Subject or inquiry topic is required";
    } else if (values.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }

    if (!values.message.trim()) {
      errs.message = "Project or research description is required";
    } else if (values.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters to provide sufficient context";
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    // Simulated frontend submission delay (Phase 5 will attach real backend endpoint)
    setTimeout(() => {
      setStatus("success");
      setStatusMessage(
        "Inquiry received in demonstration mode. For actual operational inquiries, please email contact.quintosresearch@gmail.com."
      );
    }, 1200);
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setTouched({});
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 max-w-5xl mx-auto">
      {/* Contact Information Cards */}
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
            Sovereignty & Confidentiality
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-blue-800/80">
            All communications and architectural specifications submitted to Quintos AI are strictly confidential and governed under non-disclosure security standards.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-sm"
        >
          {/* Status Banners */}
          {status === "success" && (
            <div
              role="alert"
              className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs text-emerald-900 flex items-start gap-3"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Form Submitted (Demo Mode)</strong>
                <p className="mt-0.5 leading-relaxed text-emerald-800">{statusMessage}</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 hover:underline"
                >
                  <RefreshCw className="h-3 w-3" />
                  Send Another Inquiry
                </button>
              </div>
            </div>
          )}

          {status === "error" && statusMessage && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Validation Notice</strong>
                <p className="mt-0.5 leading-relaxed text-red-700">{statusMessage}</p>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Dr. Alex Morgan"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                  errors.name && touched.name
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
                disabled={status === "submitting" || status === "success"}
                required
              />
              {errors.name && touched.name && (
                <p id="name-error" className="mt-1 text-[11px] text-red-600 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="alex@organization.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                  errors.email && touched.email
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
                disabled={status === "submitting" || status === "success"}
                required
              />
              {errors.email && touched.email && (
                <p id="email-error" className="mt-1 text-[11px] text-red-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Subject / Topic <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="e.g. Enterprise LLM Deployment / Research Fellowship"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                errors.subject && touched.subject
                  ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              disabled={status === "submitting" || status === "success"}
              required
            />
            {errors.subject && touched.subject && (
              <p id="subject-error" className="mt-1 text-[11px] text-red-600 font-medium">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Inquiry / Technical Scope <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe your technical requirements, goals, or research questions..."
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                errors.message && touched.message
                  ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              disabled={status === "submitting" || status === "success"}
              required
            />
            {errors.message && touched.message && (
              <p id="message-error" className="mt-1 text-[11px] text-red-600 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status === "submitting" || status === "success"}
              rightIcon={
                status === "submitting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )
              }
            >
              {status === "submitting" ? "Processing..." : "Send Inquiry"}
            </Button>

            {status === "success" && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                Reset Form
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          badge="Direct Inquiries"
          title="Connect with Our Research & Engineering Team"
          description="Whether you have an enterprise integration project, research collaboration inquiry, or sovereign deployment question, we are ready to assist."
        />

        <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs font-mono">Loading form parameters...</div>}>
          <ContactFormInner />
        </Suspense>
      </Container>
    </section>
  );
}