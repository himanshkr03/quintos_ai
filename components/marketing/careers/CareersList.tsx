"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { departments, getAllOpenings } from "@/data/careers";
import Button from "@/components/shared/ui/Button";

export default function CareersList() {
  const [selectedDept, setSelectedDept] = useState<string>("All Departments");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const openings = getAllOpenings();

  const filteredOpenings = useMemo(() => {
    return openings.filter((job) => {
      return selectedDept === "All Departments" || job.department === selectedDept;
    });
  }, [openings, selectedDept]);

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Department Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-6">
        {departments.map((dept) => {
          const isSelected = selectedDept === dept;
          return (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
              }`}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {/* Notice */}
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center text-xs text-slate-600">
        <span className="font-semibold text-slate-900">Prospective Opportunities Note:</span> The areas below outline our key technical domains and illustrative research fellowship tracks. Inquire below to connect with our team.
      </div>

      {/* Openings List */}
      <div className="space-y-5">
        {filteredOpenings.map((job) => {
          const isExpanded = expandedId === job.id;
          const applyHref = `/contact?position=${encodeURIComponent(job.title)}`;

          return (
            <div
              key={job.id}
              className={`rounded-2xl border bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 ${
                isExpanded
                  ? "border-blue-400 ring-2 ring-blue-500/15"
                  : "border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-md bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-blue-700">
                      {job.department}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-600">
                      {job.location}
                    </span>
                    <span className="rounded-md bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-medium text-purple-700">
                      {job.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 max-w-2xl">
                    {job.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleDetails(job.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
                  >
                    <span>{isExpanded ? "Hide Scope" : "View Scope"}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  <Button
                    href={applyHref}
                    variant="primary"
                    size="sm"
                  >
                    Express Interest
                  </Button>
                </div>
              </div>

              {/* Expandable Specifications */}
              {isExpanded && (
                <div className="mt-6 border-t border-slate-100 pt-6 space-y-6 animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Key Technical Focus Areas
                    </h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                        >
                          <Check className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Desired Technical Background
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                        >
                          <Check className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {job.niceToHave && (
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-2">
                        Helpful Prior Experience
                      </h4>
                      <ul className="space-y-2">
                        {job.niceToHave.map((nth) => (
                          <li
                            key={nth}
                            className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                            <span>{nth}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Location: {job.location} ({job.workplaceType})
                    </span>
                    <Button
                      href={applyHref}
                      variant="primary"
                      size="sm"
                    >
                      Inquire Regarding This Area
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
