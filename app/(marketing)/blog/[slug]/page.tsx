// File: E:\quintos_ai\app\(marketing)\blog\[slug]\page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import type { Metadata } from "next";

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import CTA from "@/components/sections/CTA";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/data/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllArticles();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticleBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Quintos AI",
    };
  }

  return {
    title: `${post.title} | Quintos AI Research Note`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getArticleBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedArticles(slug, 2);

  return (
    <>
      {/* Article Header & Hero */}
      <article className="relative overflow-hidden bg-white py-16 md:py-20 border-b border-slate-100">
        <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Back to Blog */}
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Knowledge Hub</span>
              </Link>
            </div>

            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-mono font-semibold text-blue-700">
                {post.category}
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-mono text-slate-600">
                {post.articleType}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-[1.18]">
              {post.title}
            </h1>

            {/* Summary */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
              {post.summary}
            </p>

            {/* Author & Telemetry Row */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-4 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-semibold text-slate-900 text-xs">
                    {post.author.name}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {post.author.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Note Notice */}
            <div className="mt-8 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-xs text-slate-600">
              <strong className="font-semibold text-slate-900">Research & Engineering Notice:</strong> This article documents technical inquiries, architecture explorations, and algorithmic modeling conducted by Quintos AI.
            </div>

            {/* Article Sections */}
            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <div key={section.heading} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {section.heading}
                  </h2>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal">
                    {section.body}
                  </p>

                  {/* Callout */}
                  {section.callout && (
                    <div className="rounded-xl border border-blue-200/80 bg-blue-50/50 p-5">
                      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-blue-800 mb-1">
                        {section.callout.title}
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-blue-900/90 font-normal">
                        {section.callout.content}
                      </p>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
                      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-[11px] font-mono text-slate-400">
                        <span>{section.codeSnippet.language}</span>
                        <span>Quintos AI Code Snippet</span>
                      </div>
                      <pre className="overflow-x-auto p-4 font-mono text-xs text-slate-200 leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Article Footer & Tags */}
            <div className="mt-12 border-t border-slate-100 pt-6">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Topic Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-slate-50/60 py-16 border-b border-slate-200/60">
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionTitle
                badge="Knowledge Graph"
                title="Related Technical Inquiries"
                description="Explore complementary explorations across our ongoing research directions."
                align="left"
              />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:border-blue-400/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-700">
                          {item.category}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">
                          {item.articleType}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono text-[11px]">
                      <span>{item.readTime}</span>
                      <span className="text-blue-600 font-semibold inline-flex items-center gap-1">
                        Explore Note <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <CTA />
    </>
  );
}
