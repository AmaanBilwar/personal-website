import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
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
    <div className="min-h-screen bg-white dark:bg-background/80  text-black dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog" className="text-neutral-500 hover:text-black mb-12 inline-block">
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

          <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
} 