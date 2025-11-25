import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="text-white flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="text-white/70 hover:text-white transition-colors self-start"
        >
          ← Back to Blog
        </Link>

        {/* Blog post content */}
        <article className="flex flex-col gap-6">
          {/* Header */}
          <header className="flex flex-col gap-4 pb-6 border-b border-white/20">
            <h1 className="text-4xl sm:text-5xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-ul:text-white/90 prose-li:text-white/90 prose-a:text-white prose-a:underline prose-code:text-white prose-pre:bg-white/10 prose-pre:border prose-pre:border-white/20">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl sm:text-4xl font-bold mt-8 mb-4"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl sm:text-3xl font-bold mt-6 mb-3"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl sm:text-2xl font-semibold mt-4 mb-2"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-base sm:text-lg leading-relaxed mb-4"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside mb-4 space-y-2 ml-4"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside mb-4 space-y-2 ml-4"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="text-base sm:text-lg leading-relaxed"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-white underline hover:text-white/80 transition-colors"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
