// File: E:\quintos_ai\app\(marketing)\blog\page.tsx

import Container from "@/components/shared/layout/Container";
import SectionTitle from "@/components/shared/common/SectionTitle";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Blog & Insights | Quintos AI",
  description: "Explore the latest insights, research findings, and technical deep-dives from the Quintos AI team.",
};

const posts = [
  {
    category: "Generative AI",
    title: "The Future of Large Language Models",
    description:
      "Explore how LLMs are transforming enterprise applications and software development.",
    date: "August 2026",
    author: "Quintos AI Research Team",
  },
  {
    category: "Computer Vision",
    title: "AI in Medical Imaging",
    description:
      "Understanding how deep learning is revolutionizing disease diagnosis and healthcare.",
    date: "July 2026",
    author: "Quintos AI Research Team",
  },
  {
    category: "Machine Learning",
    title: "Building Production-Ready ML Systems",
    description:
      "Best practices for deploying scalable machine learning solutions.",
    date: "June 2026",
    author: "Quintos AI Engineering",
  },
  {
    category: "Quantum AI",
    title: "Quantum Machine Learning Explained",
    description:
      "A beginner-friendly introduction to hybrid quantum-classical AI systems.",
    date: "May 2026",
    author: "Quintos AI Research Team",
  },
  {
    category: "AI Agents",
    title: "Autonomous AI Agents in Business",
    description:
      "How AI agents can automate workflows and improve enterprise productivity.",
    date: "April 2026",
    author: "Quintos AI",
  },
  {
    category: "Responsible AI",
    title: "Building Ethical AI Systems",
    description:
      "Principles for creating transparent, fair, and trustworthy AI applications.",
    date: "March 2026",
    author: "Quintos AI",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Blog
            </span>

            <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
              Insights, Research &
              <span className="block text-blue-600">
                AI Innovation
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Discover the latest trends, research findings, tutorials,
              and engineering insights from the Quintos AI team.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-24">
        <Container>
          <SectionTitle
            badge="Latest Articles"
            title="Explore Our Knowledge Hub"
            description="Stay updated with AI technologies, research, and industry trends."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {post.category}
                  </span>

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    {post.title}
                  </h2>

                  <p className="mt-4 leading-7 text-gray-600">
                    {post.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-4 text-xs text-gray-500 flex items-center justify-between">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}