import React from 'react'
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, ExternalLinkIcon, LightbulbIcon } from "lucide-react"

const ExperiencePage = () => {
  return (
    <div className="w-full px-4 sm:px-0">
      {/* Personal intro section */}
      <div className="mb-10 relative">
        <div className="relative h-40 sm:h-60 rounded-xl overflow-hidden mb-6">
          <Image 
            src="/images/college.jpg" 
            alt="My professional journey" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
          <h1 className="absolute bottom-4 left-4 text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
            The Journey
          </h1>
        </div>
        
        <p className="text-muted-foreground mb-4 italic border-l-4 border-primary/50 pl-3">
          "The walls between art and engineering exist only in our minds."
        </p>
      </div>
      
      {/* Experience Item 1 */}
      <Card className="mb-12 overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/5 py-1"></div>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary/20 shadow-sm">
              <AvatarImage src="/images/honeywell.png" alt="Honeywell" />
              <AvatarFallback className="bg-primary/10">HW</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Software Engineer Intern</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <CardDescription className="text-xs sm:text-sm">Honeywell</CardDescription>
                <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  <span>Cincinnati, OH</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Sept 2024 - Dec 2024</span>
          </div>
        </CardHeader>
        <Separator className="bg-primary/10" />
        <CardContent className="pt-6">
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Langchain</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Python</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">LLMs</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Azure</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Backend</Badge>
          </div>
          
          <div className="relative mb-8 rounded-lg overflow-hidden max-w-3xl mx-auto">
            <Image 
              src="/images/honeywell-image.png" 
              alt="My time at Honeywell" 
              width={600}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              {/* <p className="text-sm text-white">Developing intelligent solutions using LLM technology</p> */}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-base font-medium mb-2 flex items-center gap-2">
              <LightbulbIcon className="h-4 w-4 text-yellow-500" /> What I worked on
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
            </ul>
          </div>
          
          <div className="italic text-sm text-muted-foreground border-t pt-4 border-dashed">
            "I'm excited to be working with cutting-edge AI technologies at Honeywell, where I can see firsthand how intelligent systems are transforming industrial applications."
          </div>
        </CardContent>
      </Card>

      {/* Experience Item 2 - Previous Honeywell role */}
      <Card className="mb-12 overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/5 py-1"></div>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary/20 shadow-sm">
              <AvatarImage src="/images/honeywell.png" alt="Company" />
              <AvatarFallback className="bg-primary/10">HW</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Software Engineer Intern</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <CardDescription className="text-xs sm:text-sm">Honeywell</CardDescription>
                <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  <span>Cincinnati, OH</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Jan 2024 - Apr 2024</span>
          </div>
        </CardHeader>
        <Separator className="bg-primary/10" />
        <CardContent className="pt-6">
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Spring Boot</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Docker</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Kubernetes</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">CI/CD</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="relative rounded-lg overflow-hidden h-48">
              <Image 
                src="/images/image.png" 
                alt="Docker containerization" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                <LightbulbIcon className="h-4 w-4 text-yellow-500" /> Key Achievements
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Containerized legacy applications using Docker, improving deployment efficiency by 40%</li>
                <li>Implemented CI/CD pipelines that reduced release cycles from weeks to days</li>
                <li>Developed microservices using Spring Boot to enhance scalability of core systems</li>
                <li>Configured Kubernetes clusters for high-availability service orchestration</li>
              </ul>
            </div>
          </div>
          
          <div className="italic text-sm text-muted-foreground border-t pt-4 border-dashed">
            "My first rotation at Honeywell taught me the importance of modern DevOps practices and how containerization transforms application lifecycle management."
          </div>
        </CardContent>
      </Card>
      
      {/* Experience Item 3 - UC Research */}
      <Card className="mb-12 overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all">
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/5 py-1"></div>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary/20 shadow-sm">
              <AvatarImage src="/images/ucincy.png" alt="University" />
              <AvatarFallback className="bg-primary/10">UC</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Research Assistant</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <CardDescription className="text-xs sm:text-sm">University of Cincinnati</CardDescription>
                <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  <span>Cincinnati, OH</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>Sept 2023 - Dec 2023</span>
          </div>
        </CardHeader>
        <Separator className="bg-primary/10" />
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Typescript</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Next.js</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Audio Analysis</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Pitch Detection</Badge>
          </div>
          
          <div className="mb-6">
            <div className="relative rounded-lg overflow-hidden mb-4">
              <Image 
                src="/images/pitch-research.jpg" 
                alt="Pitch analysis visualization" 
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              As part of Dr. Smith's lab in the Department of Computer Science, I contributed to research on audio signal processing and pitch detection algorithms for music education applications.
            </p>
            <div className="bg-secondary/20 rounded-lg p-4">
              <h3 className="text-base font-medium mb-2">Research Focus</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Developed a web application using Next.js for real-time pitch visualization</li>
                <li>Implemented FFT algorithms to analyze and display musical pitch with high accuracy</li>
                <li>Created an interactive interface allowing music students to improve intonation</li>
                <li>Contributed to a paper submitted to the International Conference on Music Technology</li>
              </ul>
            </div>
          </div>
          
          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1 mt-4">
            <ExternalLinkIcon className="h-3 w-3" />
            View research paper
          </a>
        </CardContent>
      </Card>

      {/* Experience Item 4 - Freelance */}
      <Card className="mb-8 overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/5 py-1"></div>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary/20 shadow-sm">
              <AvatarImage src="/images/pr.png" alt="Premiere Pro logo" />
              <AvatarFallback className="bg-primary/10">Pr</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Visual Effects Artist & Editor</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <CardDescription className="text-xs sm:text-sm">Freelance</CardDescription>
                <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  <span>Remote</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
            <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span>March 2021 - Apr 2022</span>
          </div>
        </CardHeader>
        <Separator className="bg-primary/10" />
        <CardContent className="pt-6">
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">After Effects</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Premiere Pro</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Photoshop</Badge>
            <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">Blender</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="relative h-32 rounded-md overflow-hidden">
              <Image 
                src="/images/vfx-work1.jpg" 
                alt="VFX project" 
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-32 rounded-md overflow-hidden">
              <Image 
                src="/images/vfx-work2.jpg" 
                alt="Video editing project" 
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-32 rounded-md overflow-hidden">
              <Image 
                src="/images/vfx-work3.jpg" 
                alt="3D modeling project" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-3">
              My creative side found expression through freelance video editing and VFX work. I collaborated with YouTube creators and small businesses to produce engaging visual content.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Created motion graphics and visual effects for 30+ client videos</li>
              <li>Developed 3D models and animations using Blender for commercial projects</li>
              <li>Edited promotional content that collectively generated over 2 million views</li>
              <li>Designed custom thumbnails and graphics that improved click-through rates by 35%</li>
            </ul>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-dashed">
            <div className="italic text-xs text-muted-foreground">
              "This creative work continues to influence my software development approach, giving me an eye for design and user experience."
            </div>
            <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
              <ExternalLinkIcon className="h-3 w-3" />
              View portfolio
            </a>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default ExperiencePage;