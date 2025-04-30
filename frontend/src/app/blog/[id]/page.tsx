import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  date: string;
  views: number;
}

export const metadata: Metadata = {
  title: 'Blog Post',
  description: 'Read my blog post',
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;
  const blog = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`)
    .then(res => res.json());

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-background/80 text-black dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog" className="text-neutral-500 hover:text-black dark:hover:text-white mb-12 inline-block">
          ← Back to blog
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-mono">{blog.title}</h1>
              <div className="flex items-center gap-2 text-neutral-500">
                <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                  day: '2-digit',
                  month: 'numeric',
                  year: 'numeric'
                })}</span>
                <span className="text-xs">•</span>
                <span>{blog.views}k</span>
              </div>
            </div>
          </div>

          <article className="prose dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-2" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-xl font-bold mb-2" {...props} />,
                h5: ({node, ...props}) => <h5 className="text-lg font-bold mb-2" {...props} />,
                h6: ({node, ...props}) => <h6 className="text-base font-bold mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />,
                code: ({node, ...props}) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto mb-4" {...props} />
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
} 