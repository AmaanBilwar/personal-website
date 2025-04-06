import React from 'react'
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"

const ExperiencePage = () => {
  return (
    <div className="w-full px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Experience</h1>
      
      {/* Experience Item 1 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src="/images/honeywell.png" alt="Honeywell" />
              <AvatarFallback>HW</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-xl">Software Engineer Intern</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Honeywell</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Sept 2024 - Dec 2024</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">Langchain</Badge>
            <Badge variant="outline" className="text-xs">Python</Badge>
            <Badge variant="outline" className="text-xs">LLMs</Badge>
            <Badge variant="outline" className="text-xs">Azure</Badge>
            <Badge variant="outline" className="text-xs">Backend</Badge>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>

      {/* Experience Item 2 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src="/images/honeywell.png" alt="Company" />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-xl">Software Engineer Intern</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Honeywell</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Jan 2024 - Apr 2024</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">Spring Boot</Badge>
            <Badge variant="outline" className="text-xs">Docker</Badge>
            <Badge variant="outline" className="text-xs">Kubernetes</Badge>
            <Badge variant="outline" className="text-xs">CI/CD</Badge>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Experience Item 3 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src="/images/ucincy.png" alt="University" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-xl">Research Assistant</CardTitle>
              <CardDescription className="text-xs sm:text-sm">University of Cincinnati</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Sept 2023 - Dec 2023</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">Typescript</Badge>
            <Badge variant="outline" className="text-xs">Next.js</Badge>
            <Badge variant="outline" className="text-xs">Backend</Badge>
            <Badge variant="outline" className="text-xs">Pitch Analysis</Badge>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>placeholder text</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </CardContent>
      </Card>
{/* Experience Item 4 */}
<Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src="/images/pr.png" alt="Premire pro logo" />
              <AvatarFallback>Pr</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-xl">Visual Effects Artist and Video Editor</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Freelance</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>March 2021 - Apr 2022</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">After Effects</Badge>
            <Badge variant="outline" className="text-xs">Premiere Pro</Badge>
            <Badge variant="outline" className="text-xs">Adobe Photoshop</Badge>
            <Badge variant="outline" className="text-xs">Blender</Badge>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
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

export default ExperiencePage;