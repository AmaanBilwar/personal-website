import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { prepareMarkdown } from "@/lib/markdown";

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
    <main className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-12 text-black bg-white flex justify-center">
      <div className="max-w-4xl w-full">
        {/* Blog post content */}
        <article className="flex flex-col gap-6">
          {/* Header */}
          <header className="flex flex-col gap-2 pb-6 border-b border-black/20">
            <h1 className="text-2xl sm:text-3xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-black/70">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-neutral max-w-none prose-headings:text-black prose-p:text-black/90 prose-strong:text-black prose-ul:text-black/90 prose-li:text-black/90 prose-a:text-black prose-a:underline prose-code:text-black prose-pre:bg-black/5 prose-pre:border prose-pre:border-black/20">
            <ReactMarkdown
              rehypePlugins={[rehypeSlug, rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-2xl sm:text-3xl font-bold mt-8 mb-4"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-xl sm:text-2xl font-bold mt-6 mb-3"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg sm:text-xl font-semibold mt-4 mb-2"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-sm sm:text-base leading-relaxed mb-4"
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
                    className="text-sm sm:text-base leading-relaxed"
                    {...props}
                  />
                ),

                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-black/5 px-4 py-3 rounded text-sm font-mono whitespace-pre-wrap break-words overflow-x-auto border border-black/20"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-black/5 px-1.5 py-0.5 rounded text-sm font-mono whitespace-normal break-words"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-black underline hover:text-gray-600 transition-colors"
                    {...props}
                  />
                ),
              }}
            >
              {prepareMarkdown(post.content)}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
