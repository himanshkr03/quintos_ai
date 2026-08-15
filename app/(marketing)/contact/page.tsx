// File: E:\quintos_ai\app\(marketing)\contact\page.tsx

import Container from "@/components/shared/layout/Container";
import ContactForm from "@/components/marketing/contact/ContactForm";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Contact Us | Quintos AI",
  description: "Connect with the Quintos AI team for enterprise inquiries, research collaboration, and AI solutions.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Contact Us
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Let&apos;s Build the Future
              <span className="block text-blue-600">
                Together with AI
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Whether you&apos;re looking for AI consulting, enterprise solutions,
              research collaboration, or product development, we&apos;d love to
              hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Office Information */}
      <section className="bg-slate-50 py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Headquarters
              </h2>

              <p className="leading-7 text-gray-600">
                Mohali, Punjab
                <br />
                India
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Email
              </h2>

              <a
                href="mailto:contact.quintosresearch@gmail.com"
                className="leading-7 text-gray-600 hover:text-blue-600 transition-colors block"
              >
                contact.quintosresearch@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Business Hours
              </h2>

              <p className="leading-7 text-gray-600">
                Monday – Friday
                <br />
                9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}