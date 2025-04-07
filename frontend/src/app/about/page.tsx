import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main className="w-full px-4 sm:px-0">
      {/* Hero section with larger image */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left column - Image */}
        <div className="md:w-1/2 lg:w-2/5">
          <div className="relative rounded-lg overflow-hidden shadow-md w-full">
            <Image
              src="/images/aboutme.jpg"
              alt="me at starbucks rostery"
              width={800}
              height={600}
              priority
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
        </div>

        {/* Right column - Text content */}
        <div className="md:w-1/2 lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">About Me</h1>
          <p className="mb-4 text-muted-foreground text-sm sm:text-base">
            I was born in Mumbai, India, a place known for its vibrant culture,
            bustling streets, and beautiful coastal views. Growing up in this
            environment shaped my perspective and interests in many ways.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Right column - Text content */}
        <div className="md:w-1/2 lg:w-3/5 order-2 md:order-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Early Childhood</h1>
          <p className="mb-4 text-muted-foreground text-sm sm:text-base">
            Early childhood moved to Pune, India, where I spent my formative
            years. went to school here. basically home. met the people i hate. made friends i could trust. best yet. 
          </p>
        </div>
        {/* Left column - Image */}
        <div className="md:w-1/2 lg:w-2/5 order-1 md:order-2">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/early.jpg"
              alt="placeholder image"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left column - Image */}
        <div className="md:w-1/2 lg:w-2/5">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/school.jpg"
              alt="school life"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right column - Text content */}
        <div className="md:w-1/2 lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">School Life</h1>
          <p className="mb-4 text-muted-foreground text-sm sm:text-base">
            I was the quiet chill kid, who knew how to have fun. No complaints from the teachers, lots and lots of friends (most I'm still friends with). Later school years I realized this is the best it gets and started to enjoy more. More complaints from teachers, but more memories. Realized I was charismatic and also that I could dance - who would've thought! These senior girls who were so cool and great at dancing told me I was good at dancing, and that's when I realized I might not be as bad as I thought.
          </p>
        </div>
      </div>
      
      {/* High School Section with text wrap */}
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">High School</h1>
        
        <div className="relative">
          {/* Image floats on larger screens, stacks on mobile */}
          <div className="float-none mb-4 sm:float-right sm:ml-6 sm:mb-2 w-full sm:w-1/2 md:w-2/5">
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/high.jpg"
                alt="High School"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Text wraps around the image on larger screens */}
          <p className="mb-4 text-muted-foreground text-sm sm:text-base">
            In India, you have to change schools in your sophomore year, and so I did. This was 2019, and early 2020 before the <strong>COVID</strong> pandemic happened. In these 9 months, I met the best people of my life that I still talk to and make sure I see every time I go back home. It changed the way I looked at life (in just 9 months). I found the love of my life in school too. Sadly we broke up that same year (2020) but it's okay (I still miss you btw).
            <br/><br/>
            We made GREAT memories (we used to aura farm in the lunch break while walking to the washroom). made a teacher cry once and the principle was the substitue teacher for a week cause the teacher couldn't handle the class. she was nice tho we found out later.
            <br/><br/>
            i remember us not being given "free games periods" cause we were the first science batch & teachers would rather teach us, we didnt like that wrote a letter to the principle and had a subject added as an option "physcial education". everyone was in CS before this (didnt wanna be). asked my mom if i could switch from cs to pe and she said no. here i am, machine learning swe developer and stuff. best decision my mom took for me that year. no regrets. trust people you love, they know you better than you do. 
          </p>
          <div className="clear-both"></div>
        </div>
      </div>
      
      {/* Gap Year Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2 lg:w-2/5">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/gap.jpg"
              alt="gap year"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2 lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Gap Year</h1>
          <p className="mb-4 text-muted-foreground text-sm sm:text-base">
            Things got challenging here. I was lost in life, partly due to a breakup and partly because I didn't want to follow the same path as others. I wanted to pursue different things. Fear of not making it in life kicked in, so I decided to take a gap year (whether by choice or not is up to you to decide). I learned a lot, made money, and made friends while doing it too. By the end of it, I decided it was time for college, but I didn't want to get trapped in the sad system of higher education in India. So I took the SAT, applied to big schools and small ones, and got into all of them (berkeley too). I decided to go to <strong>University of Cincinnati, USA.</strong>
          </p>
        </div>
      </div>

      {/* College Life Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2 lg:w-3/5 order-2 md:order-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">College Life</h1>
          <p className="mb-4 text-muted-foreground text-sm sm:text-base">
           when i got here i was so lost. istg. i knew nothing, had nothing building from  ground up. people hate indians here which didn't help. sad honestly. have to go above and beyond just for people to see you as human and one of them. i was lost didnt enjoy being here at all. <br /><br />
           a lot has changed since then. work in progres....
          </p>
        </div>
        <div className="md:w-1/2 lg:w-2/5 order-1 md:order-2">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/college.jpg"
              alt="college life"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
     
      {/* Current Section */}
      <div className="mx-auto mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Current</h1>
        <p className="mb-4 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
    uncertain what the future holds, especially with the current state of the world. currently surrounded by a lot of good people, especially bearcats electric racing. they humble me, support me. ive completed 2 coop rotations as a swe (ai focused in teh second one).  im learning and building. IM YEARNING. i have a lot to achieve tho. not even 1% of the way there. dont like who i've become tho. its okay sometimes you have to sacrifice what u want and yourself for the 
    bigger picture. lots to prove wrong, lots to prove. period.
    no more relationships are being upheld. with any girls(uk the reason for this, im still stuck on someone i broke up with 4 years and 7 months ago), friends, family. just me and work. sadly. 
     WE WILL SEE WHERE THIS TAKES ME. hopefully where i want to be. be it top or bottom. i will be there.
        </p>
      </div>
    </main>
  );
};

export default AboutPage;
