"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search, Tag, X } from "lucide-react";
import { BlogPost, getAllArticles } from "@/data/blog";

const categories = [
  "All Categories",
  "LLM Reasoning",
  "Medical AI",
  "Quantum ML",
  "Systems & Inference",
  "Autonomous Agents",
  "Interpretability",
] as const;

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const articles = getAllArticles();

  const filteredArticles = useMemo(() => {
    return articles.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Categories" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.articleType.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search research notes & explorations..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900">{filteredArticles.length}</strong>{" "}
          {filteredArticles.length === 1 ? "research note" : "research notes"}
        </span>

        {(selectedCategory !== "All Categories" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All Categories");
              setSearchQuery("");
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/blog/${art.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-700">
                    {art.category}
                  </span>

                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-mono text-slate-500">
                    {art.articleType}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {art.title}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                  {art.summary}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {art.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[9px] text-slate-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-3.5 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-600 text-[11px] font-mono">{art.readTime}</span>
                <div className="flex items-center gap-1 font-mono text-[11px] text-blue-600 group-hover:translate-x-0.5 transition-transform font-semibold">
                  <span>Explore Note</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <Tag className="mx-auto h-8 w-8 text-slate-400 mb-3" />
          <h4 className="text-base font-bold text-slate-900">No research notes found</h4>
          <p className="mt-1 text-xs text-slate-500">
            No technical notes or conceptual frameworks matched your current filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All Categories");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
