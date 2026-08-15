"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { COMMUNICATION_FAQS } from "@/data/contact";

export default function ContactFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50/60 border-t border-slate-200/60">
      <Container>
        <SectionTitle
          badge="Inquiry Protocols"
          title="Communication & Scoping FAQs"
          description="Understand our communication protocols, NDA procedures, response SLAs, and data confidentiality standards."
        />

        <div className="mx-auto max-w-3xl space-y-3.5 mt-10">
          {COMMUNICATION_FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            const headingId = `contact-faq-heading-${index}`;
            const contentId = `contact-faq-content-${index}`;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-blue-300 bg-white shadow-xs"
                    : "border-slate-200/80 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <MessageSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-slate-900">
                      {faq.question}
                    </span>
                  </div>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headingId}
                    className="border-t border-slate-100 px-5 sm:px-6 pb-5 pt-3.5"
                  >
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
