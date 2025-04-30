'use client'
import React from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

interface Organization {
  name: string;
  role: string;
  description: string;
  tech?: string[];
  link?: string;
  blogId?: string;
}

const organizations: Organization[] = [
  {
    name: "Bearcats Electric Racing",
    role: "Powertrain and Controls",
    description: "Currently building the telemetry system for our FSAE racecar.",
    tech: ["Python", "Rust", "CAN", "Websockets", "Telemetry"],
    blogId: process.env.NEXT_PUBLIC_TELEMETRY_BLOG_ID
  }
];

const OrganizationsPage = () => {
  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-mono font-bold">Organizations</h1>
          <p className="text-muted-foreground">groups I&apos;m involved with</p>
        </div>

        <div className="flex justify-center space-x-6">
          <Link href="/" className="hover:opacity-80">
            <span className="text-2xl">⌂</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {organizations.map((org, index) => (
            <article 
              key={index}
              className="border border-neutral-800 rounded-lg p-6 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-mono font-semibold">{org.name}</h2>
                <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
                  {org.role}
                </Badge>
              </div>
              
              <p className="text-neutral-400 mb-4">{org.description}</p>
              
              {org.tech && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {org.tech.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              {org.blogId && (
                <div className="text-sm text-neutral-500">
                  wanna get technical? <Link href={`/blog/${org.blogId}`} className="text-blue-500 hover:text-blue-400">read more.</Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default OrganizationsPage