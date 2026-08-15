"use client";

import { useState, useEffect, Suspense, useId } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import Button from "@/components/shared/ui/Button";
import GitHubIcon from "@/components/shared/icons/GitHubIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";
import {
  INQUIRY_CATEGORIES,
  DEPLOYMENT_ENVIRONMENTS,
  PROJECT_TIMELINES,
} from "@/data/contact";
import { SOCIALS } from "@/constants/social";
import { SITE } from "@/constants/site";

interface FormState {
  category: "enterprise" | "research" | "biomedical" | "general";
  name: string;
  email: string;
  organization: string;
  deploymentEnv: string;
  timeline: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organization?: string;
  subject?: string;
  message?: string;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const formId = useId();

  const [form, setForm] = useState<FormState>({
    category: "enterprise",
    name: "",
    email: "",
    organization: "",
    deploymentEnv: DEPLOYMENT_ENVIRONMENTS[0],
    timeline: PROJECT_TIMELINES[0],
    subject: INQUIRY_CATEGORIES[0].defaultSubject,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionPhase, setSubmissionPhase] = useState<
    "idle" | "validating" | "success" | "error"
  >("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Ingest URL query parameters for contextual pre-filling
  useEffect(() => {
    const plan = searchParams.get("plan");
    const position = searchParams.get("position");
    const billing = searchParams.get("billing");
    const topic = searchParams.get("topic");
    const typeParam = searchParams.get("type");

    if (position) {
      setForm((prev) => ({
        ...prev,
        category: "research",
        subject: `Prospective Fellowship Inquiry: ${position}`,
        message: `I am inquiring regarding prospective fellowship directions in ${position}. Please find my academic / engineering background summary below:`,
      }));
    } else if (plan) {
      setForm((prev) => ({
        ...prev,
        category: "enterprise",
        subject: `Plan Scope & Architecture Inquiry: ${plan.toUpperCase()} Tier (${billing || "monthly"})`,
        message: `We are evaluating the ${plan.toUpperCase()} tier for our computational workflows and would like to review architecture and deployment specifications.`,
      }));
    } else if (topic) {
      setForm((prev) => ({
        ...prev,
        subject: `Technical Inquiry: ${topic}`,
        message: `We would like to consult on technical capabilities regarding ${topic}.`,
      }));
    } else if (
      typeParam &&
      ["enterprise", "research", "biomedical", "general"].includes(typeParam)
    ) {
      const selected = INQUIRY_CATEGORIES.find((c) => c.id === typeParam);
      if (selected) {
        setForm((prev) => ({
          ...prev,
          category: selected.id,
          subject: selected.defaultSubject,
        }));
      }
    }
  }, [searchParams]);

  const activeCategoryConfig =
    INQUIRY_CATEGORIES.find((c) => c.id === form.category) ||
    INQUIRY_CATEGORIES[0];

  const handleCategoryChange = (
    catId: "enterprise" | "research" | "biomedical" | "general"
  ) => {
    const catConfig = INQUIRY_CATEGORIES.find((c) => c.id === catId);
    setForm((prev) => ({
      ...prev,
      category: catId,
      subject: catConfig ? catConfig.defaultSubject : prev.subject,
    }));
  };

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
      errs.email = "Please enter a valid email address (e.g. name@organization.com)";
    }

    if (!values.organization.trim()) {
      errs.organization = "Organization, company, or institution is required";
    } else if (values.organization.trim().length < 2) {
      errs.organization = "Please provide at least 2 characters";
    }

    if (!values.subject.trim()) {
      errs.subject = "Subject or inquiry topic is required";
    } else if (values.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }

    if (!values.message.trim()) {
      errs.message = "Technical scope or inquiry details are required";
    } else if (values.message.trim().length < 15) {
      errs.message = "Message must be at least 15 characters to provide sufficient technical context";
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof FormErrors],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      organization: true,
      subject: true,
      message: true,
    });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmissionPhase("error");
      setStatusMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setSubmissionPhase("validating");
    setStatusMessage("Formatting inquiry parameters in demonstration mode...");

    setTimeout(() => {
      setSubmissionPhase("success");
      setStatusMessage(
        `Your inquiry has been compiled in frontend demonstration mode. To directly send this inquiry to our research & engineering team, please click "Open in Email Client" below or email contact.quintosresearch@gmail.com.`
      );
    }, 600);
  };

  const handleReset = () => {
    setForm({
      category: "enterprise",
      name: "",
      email: "",
      organization: "",
      deploymentEnv: DEPLOYMENT_ENVIRONMENTS[0],
      timeline: PROJECT_TIMELINES[0],
      subject: INQUIRY_CATEGORIES[0].defaultSubject,
      message: "",
    });
    setErrors({});
    setTouched({});
    setSubmissionPhase("idle");
    setStatusMessage("");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const generateMailtoHref = () => {
    const mailSubject = encodeURIComponent(`[${form.category.toUpperCase()}] ${form.subject}`);
    const mailBody = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Organization: ${form.organization}\n` +
      `Category: ${activeCategoryConfig.title}\n` +
      `Target Environment: ${form.deploymentEnv}\n` +
      `Timeline: ${form.timeline}\n\n` +
      `Technical Scope / Message:\n${form.message}\n`
    );
    return `mailto:${SITE.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleCopySummary = () => {
    const summaryText =
      `QUINTOS AI INQUIRY SUMMARY\n` +
      `--------------------------\n` +
      `Category: ${activeCategoryConfig.title}\n` +
      `From: ${form.name} (${form.email})\n` +
      `Organization: ${form.organization}\n` +
      `Subject: ${form.subject}\n` +
      `Environment: ${form.deploymentEnv}\n` +
      `Timeline: ${form.timeline}\n\n` +
      `Scope:\n${form.message}\n\n` +
      `Official Recipient: ${SITE.email}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const isSubmitting = submissionPhase === "validating";

  return (
    <div className="grid gap-10 lg:grid-cols-12 max-w-6xl mx-auto">
      {/* Left Column: Official Contact & Verification Channels */}
      <div className="lg:col-span-5 space-y-4">
        {/* Direct Email Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Official Communication
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Direct Inquiries & Architecture Inquiries
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors break-all"
                  aria-label="Send direct email to Quintos AI"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              title="Copy official email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* LinkedIn Organization */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <LinkedInIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                LinkedIn Organization
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Official Updates & Announcements
              </p>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Visit official Quintos AI LinkedIn page"
              >
                <span>linkedin.com/company/quintos-ai</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* GitHub Organization */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <GitHubIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                GitHub Organization
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Open-Source Code & Research Repositories
              </p>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Visit official Quintos AI GitHub organization"
              >
                <span>github.com/Quintos-AI</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Laboratory Base
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Research & Systems Engineering
              </p>
              <p className="mt-2 text-xs font-semibold text-slate-800">
                Based in Mohali, Punjab, India
              </p>
            </div>
          </div>
        </div>

        {/* Confidential Scoping Note */}
        <div className="rounded-2xl border border-blue-200/70 bg-blue-50/40 p-5">
          <div className="flex items-center gap-2 text-blue-900 mb-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-700" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Confidential Scoping
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-blue-900/80 font-normal">
            Project inquiries sent to our official email are treated with confidentiality. Prospective bilateral NDAs can be reviewed prior to in-depth technical scoping if requested.
          </p>
        </div>
      </div>

      {/* Right Column: Guided Interactive Inquiry Form */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          {/* Inquiry Category Switcher */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Select Inquiry Domain
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {INQUIRY_CATEGORIES.map((cat) => {
                const isSelected = form.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    disabled={isSubmitting || submissionPhase === "success"}
                    className={`rounded-xl border p-2.5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs"
                        : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span
                      className={`block font-mono text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? "text-blue-700" : "text-slate-400"
                      }`}
                    >
                      {cat.badge}
                    </span>
                    <span
                      className={`block text-xs font-bold leading-tight mt-1 ${
                        isSelected ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {cat.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500">
              {activeCategoryConfig.description}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Status Banners */}
            {submissionPhase === "success" && (
              <div
                role="alert"
                className="rounded-xl border border-emerald-200 bg-emerald-50/95 p-5 text-xs text-emerald-950 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-emerald-900">
                      Inquiry Compiled (Demonstration Mode)
                    </strong>
                    <p className="mt-1 leading-relaxed text-emerald-800">
                      {statusMessage}
                    </p>
                  </div>
                </div>

                {/* Direct Action Bar */}
                <div className="pt-2 border-t border-emerald-200/80 flex flex-wrap items-center gap-2.5">
                  <a
                    href={generateMailtoHref()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open in Email Client (Pre-filled)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-medium text-emerald-800 hover:underline"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reset Form</span>
                  </button>
                </div>
              </div>
            )}

            {isSubmitting && (
              <div
                role="status"
                className="rounded-xl border border-blue-200 bg-blue-50/90 p-4 text-xs text-blue-900 flex items-center gap-3"
              >
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin shrink-0" />
                <div>
                  <span className="font-semibold">{statusMessage}</span>
                </div>
              </div>
            )}

            {submissionPhase === "error" && statusMessage && (
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

            {/* Row 1: Name and Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  name="name"
                  placeholder="e.g. Dr. Alex Morgan"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                    errors.name && touched.name
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  disabled={isSubmitting || submissionPhase === "success"}
                  required
                />
                {errors.name && touched.name && (
                  <p
                    id={`${formId}-name-err`}
                    className="mt-1 text-[11px] text-red-600 font-medium"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-email`}
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  name="email"
                  placeholder="alex@organization.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                    errors.email && touched.email
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  disabled={isSubmitting || submissionPhase === "success"}
                  required
                />
                {errors.email && touched.email && (
                  <p
                    id={`${formId}-email-err`}
                    className="mt-1 text-[11px] text-red-600 font-medium"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Organization and Subject */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${formId}-org`}
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Organization / Institution <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-org`}
                  type="text"
                  name="organization"
                  placeholder="Company, University, or Lab Name"
                  value={form.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.organization}
                  aria-describedby={
                    errors.organization ? `${formId}-org-err` : undefined
                  }
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                    errors.organization && touched.organization
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  disabled={isSubmitting || submissionPhase === "success"}
                  required
                />
                {errors.organization && touched.organization && (
                  <p
                    id={`${formId}-org-err`}
                    className="mt-1 text-[11px] text-red-600 font-medium"
                  >
                    {errors.organization}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-subject`}
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Inquiry Topic / Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-subject`}
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.subject}
                  aria-describedby={
                    errors.subject ? `${formId}-subject-err` : undefined
                  }
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                    errors.subject && touched.subject
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  disabled={isSubmitting || submissionPhase === "success"}
                  required
                />
                {errors.subject && touched.subject && (
                  <p
                    id={`${formId}-subject-err`}
                    className="mt-1 text-[11px] text-red-600 font-medium"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Deployment Context (For Enterprise & Biomedical) */}
            {(form.category === "enterprise" ||
              form.category === "biomedical") && (
              <div className="grid gap-4 sm:grid-cols-2 pt-1 border-t border-slate-100">
                <div>
                  <label
                    htmlFor={`${formId}-deploy`}
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Target Deployment Environment
                  </label>
                  <select
                    id={`${formId}-deploy`}
                    name="deploymentEnv"
                    value={form.deploymentEnv}
                    onChange={handleChange}
                    disabled={isSubmitting || submissionPhase === "success"}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {DEPLOYMENT_ENVIRONMENTS.map((env) => (
                      <option key={env} value={env}>
                        {env}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-timeline`}
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Projected Scoping Timeline
                  </label>
                  <select
                    id={`${formId}-timeline`}
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    disabled={isSubmitting || submissionPhase === "success"}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {PROJECT_TIMELINES.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Message Area with Character Count */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`${formId}-msg`}
                  className="block text-xs font-semibold text-slate-700"
                >
                  Technical Scope & Context <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    form.message.length > 1800
                      ? "text-amber-600 font-bold"
                      : "text-slate-400"
                  }`}
                >
                  {form.message.length} / 2000
                </span>
              </div>
              <textarea
                id={`${formId}-msg`}
                name="message"
                rows={5}
                maxLength={2000}
                placeholder={activeCategoryConfig.placeholderMessage}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${formId}-msg-err` : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
                  errors.message && touched.message
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
                disabled={isSubmitting || submissionPhase === "success"}
                required
              />
              {errors.message && touched.message && (
                <p
                  id={`${formId}-msg-err`}
                  className="mt-1 text-[11px] text-red-600 font-medium"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submission Actions */}
            <div className="pt-2 flex items-center justify-between">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting || submissionPhase === "success"}
                rightIcon={
                  isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )
                }
              >
                {isSubmitting ? "Processing..." : "Compile Inquiry (Demo)"}
              </Button>

              <div className="flex items-center gap-3">
                {submissionPhase === "success" && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                  >
                    Reset Form
                  </button>
                )}

                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  Demonstration Form
                </span>
              </div>
            </div>
          </form>
        </div>
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
          description="Whether you are scoping sovereign enterprise AI deployment, proposing an exploratory research inquiry, or evaluating biomedical vision architectures, our team is ready to consult."
        />

        <div className="mt-10">
          <Suspense
            fallback={
              <div className="text-center py-16 text-slate-400 text-xs font-mono">
                Initializing communication channels...
              </div>
            }
          >
            <ContactFormInner />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}