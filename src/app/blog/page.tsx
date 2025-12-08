import React from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BlogPage = () => {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-12 text-black bg-white">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-6">Blog</h1>
        <ul className="space-y-4 sm:space-y-3 text-sm sm:text-base">
          {blogPosts.map((post) => (
            <li key={post.slug} className="flex items-start">
              <span className="mr-2 mt-0.5 flex-shrink-0">•</span>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold underline hover:text-gray-600"
                >
                  {post.title}
                </Link>
                <span className="hidden sm:inline">: </span>
                <br className="sm:hidden" />
                <span className="text-black/80 sm:text-black">
                  {post.author} - {formatDate(post.date)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default BlogPage;
