import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main className="w-full">
      {/* Hero section with 3/10 image and 7/10 text (wider text area) */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Left column - Image (reduced from 2/5 to 3/10) */}
        <div className="md:w-1/4">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/honeywell.png"
              alt="placeholder image"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right column - Text content (increased from 3/5 to 7/10) */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          <p className="mb-4 text-muted-foreground">
            I was born in Mumbai, India, a place known for its vibrant culture,
            bustling streets, and beautiful coastal views. Growing up in this
            environment shaped my perspective and interests in many ways.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Right column - Text content (increased) */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">early childhood</h1>
          <p className="mb-4 text-muted-foreground">
            Early childhood moved to Pune, India, where I spent my formative
            years. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        {/* Left column - Image (reduced) */}
        <div className="md:w-1/4">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/honeywell.png"
              alt="placeholder image"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Left column - Image (reduced) */}
        <div className="md:w-1/4">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/honeywell.png"
              alt="placeholder image"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right column - Text content (increased) */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">School Life</h1>
          <p className="mb-4 text-muted-foreground">
            I was born in Mumbai, India, a place known for its vibrant culture,
            bustling streets, and beautiful coastal views. Growing up in this
            environment shaped my perspective and interests in many ways. Lorem ipsum dolor 
            sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Right column - Text content (increased) */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">High School</h1>
          <p className="mb-4 text-muted-foreground">
            Early childhood moved to Pune, India, where I spent my formative
            years. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        {/* Left column - Image (reduced) */}
        <div className="md:w-1/4">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/honeywell.png"
              alt="placeholder image"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Center aligned sections */}
      <div className="mx-auto md:w-4/5 mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Gap Year</h1>
        <p className="mb-4 text-muted-foreground max-w-3xl mx-auto">
          I was born in Mumbai, India, a place known for its vibrant culture,
          bustling streets, and beautiful coastal views. Growing up in this
          environment shaped my perspective and interests in many ways.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Left column - Image (reduced) */}
        <div className="md:w-1/4">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/honeywell.png"
              alt="placeholder image"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right column - Text content (increased) */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">College Life</h1>
          <p className="mb-4 text-muted-foreground">
            I was born in Mumbai, India, a place known for its vibrant culture,
            bustling streets, and beautiful coastal views. Growing up in this
            environment shaped my perspective and interests in many ways.
          </p>
        </div>
      </div>
      
      {/* Center aligned sections */}
      <div className="mx-auto md:w-4/5 mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Current</h1>
        <p className="mb-4 text-muted-foreground max-w-3xl mx-auto">
          I was born in Mumbai, India, a place known for its vibrant culture,
          bustling streets, and beautiful coastal views. Growing up in this
          environment shaped my perspective and interests in many ways.
        </p>
      </div>
    </main>
  );
};

export default AboutPage;
