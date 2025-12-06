import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/blog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

type Props = {};

const page = (props: Props) => {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="text-white flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-6xl flex flex-col items-center gap-8">
        {/* Back to Home button */}
        <Link
          href="https://amaandoes.tech"
          className="text-white/70 hover:text-white transition-colors self-start"
        >
          ← Back to Home
        </Link>

        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="font-bold text-6xl pb-4">Blog</h1>

          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="w-full max-w-3xl min-w-[320px] group/card"
            >
              <Card className="w-full bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                <div className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/70">{post.author}</p>
                  </div>
                  <div className="text-sm text-white/70 flex-shrink-0">
                    {formatDate(post.date)}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
