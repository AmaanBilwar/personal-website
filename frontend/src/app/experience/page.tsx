import React from 'react'
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"

const page = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Experience</h1>
      
      {/* Experience Item 1 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/images/honeywell.png" alt="Honeywell" />
              <AvatarFallback>HW</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Software Engineer Intern</CardTitle>
              <CardDescription className="text-sm">Honeywell</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>Sept 2024 - Dec 2024</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline">Langchain</Badge>
            <Badge variant="outline">Python</Badge>
            <Badge variant="outline">LLMs</Badge>
            <Badge variant="outline">Azure</Badge>
            <Badge variant="outline">Backend</Badge>

          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>

      {/* Experience Item 2 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/images/honeywell.png" alt="Company" />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Software Engineer Intern</CardTitle>
              <CardDescription className="text-sm">Honeywell</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>Jan 2024 - Apr 2024</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline">Spring Boot</Badge>
            <Badge variant="outline">Docker</Badge>
            <Badge variant="outline">Kubernetes</Badge>
            <Badge variant="outline">CI/CD</Badge>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Experience Item 3 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/images/ucincy.png" alt="University" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Research Assistant</CardTitle>
              <CardDescription className="text-sm">University of Cincinnati</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>Sept 2023 - Dec 2023</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline">Typescript</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Backend</Badge>
            <Badge variant="outline">Pitch Analysis</Badge>

          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>

      {/* Experience Item 4 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/studio-logo.png" alt="Studio" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Visual Effects Artist and Video Editor</CardTitle>
              <CardDescription className="text-sm">Freelance</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>March 2021 - Apr 2022</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline">After Effects</Badge>
            <Badge variant="outline">Premiere Pro</Badge>
            <Badge variant="outline">Adobe Photoshop</Badge>
            <Badge variant="outline">Blender</Badge>

          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default page