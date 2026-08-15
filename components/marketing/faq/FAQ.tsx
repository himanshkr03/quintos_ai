"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          badge="Knowledge & Inquiries"
          title="Frequently Asked Questions"
          description="Learn about Quintos AI's research methodology, enterprise security practices, and deployment architectures."
        />

        <div className="mx-auto max-w-3xl space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const headingId = `faq-heading-${index}`;
            const contentId = `faq-content-${index}`;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-blue-300 bg-blue-50/15"
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
                  <span className="text-base font-semibold text-slate-900 pr-4 sm:text-lg">
                    {faq.question}
                  </span>

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