export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  content: string;
};

// Your blog posts - add new posts here!
export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-Jia",
    title: "Introducing Jia — the Search Engine for Everything",
    author: "Amaan",
    date: "2025-12-23",
    content: `

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VVGu88627xaLkQ0in_2NxUrEGEbYru4t9A&s"></img>

    # Table of contents

- [What is Jia?](#what-is-jia)
- [How does Jia help?](#how-does-jia-help)
- [Why Jia](#why-jia)
- [How do I do this?](#how-do-i-do-this)
- [But I don't want you to have my data](#but-i-dont-want-you-to-have-my-data)
- [Final Thoughts](#final-thoughts)

    # What is Jia?
    Imagine this, you upload something to Google Drive, and think to yourself *"thank God for cloud storage, I can view this from anywhere I need"*. A few days later, you need that file (it could be an image, video, or a PDF) again but cannot remember the name of the file for the life of you. Now what? Sort by date? Probably. You're stressed and miss it even after a few scrolls up and down the page. Now what? Did you actually think you'd remember the name of the file with random characters at the end combined with your incredibly abysmal way of naming things, especially if they're important?

    Silly enough, you find that file a couple of days later and in shock you say "*Of course I named it that ughh*"

    # How does Jia help?

    We don't just store and host your files for you, we **understand** what your file is about, despite the format. If it's a video:
    - who's in the video
    - where is it taking place
    - what are the objects in the video
    - the vibes.
    <br />

    **You get the point.**

    Similarly, if it's a pdf, for example, we extract the content to process it. On top of this, you can attach your own tags to the file you're uploading. Like "homework", "college", "trip to hawaii" etc.

    In this way, if you remember anything in or about the file, we can find it for you.

    # Why Jia
    Google Drive is ass, don't even get me started on the search functionality.

    # How do I do this?
     Currently, the functionality is limited to videos, which might seem crazy because videos are the most difficult file type to index because they're dynamic and multimodal. I am very close with getting the video search tool working decently, which means images, files like pdfs and word docs should be way easier to preprocess.

     Let's talk about how I do this with videos, because the rest would just be a subset of that.

    With our preprocessing pipeline, I first chunk the videos, meaning they're split into smaller 30-second chunks. Then multiple threads are spawned for a multi-process pipeline that I call "INDEXING". It has:
    <ol>
    <li> <u>Transcription pipeline</u> - extracts audio from the chunk, passes that to an LLM for transcription, and writes to JSON the transcript. It's important to keep in mind I do word-level transcription because video editing needs very precise control.</li>
    <li> <u>Scene / environment detection</u> - for each chunk made for the video, we take three screenshots: one at the start, one in the middle, and the very last frame of that chunk. We then pass these images to an LLM to get a general idea of what the video is about in terms of objects and environment. The JSON written by the LLM is very detailed, containing objects found, scene/environment, number of people, etc.</li>
    <li><u>REDACTED</u> - YOU DIDN'T THINK I WAS GONNA TELL YOU EVERYTHING, RIGHT?</li> Currently in the process of fine-tuning a model for various video editing use cases.

    # But I don't want you to have my data
    No worries, I have no interest in your data either. I'm committed to building software that's private, efficient, and treats users with respect. I always prioritize people first and follow strict standards. There's absolutely no hidden agenda.

    <u>No data retention by default, not as a hidden option.</u>

    I'm designing this in a way where I cannot read or access any information about the user or their files unless I have a confirmation, which will be asked for when or if a user reports a bug that requires me to look at their data.

    # Final Thoughts
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VVGu88627xaLkQ0in_2NxUrEGEbYru4t9A&s"></img>
    `,
  },
  {
    slug: "scene-ai-when",
    title: "Scene AI When?",
    author: "Amaan",
    date: "2025-12-05",
    content: `
    # Table of contents

- [Scene AI when?](#scene-ai-when)
- [Where it all began?](#where-it-all-began)
- [Where it is now](#where-it-is-now)
- [Final Thoughts](#final-thoughts)
- [Note](#note)

      # Scene AI when?

      I know you all have heard it by now, but if you haven't here I am to introduce you to Scene AI.
      Scene AI started as this side project of mine to merge my love for video editing and computer software.

      ## Where it all began

      I was watching a video while eating, like any other human, and thought, “I know how to edit videos like this. Neat trick. I should get back into it.” Then I did what any other human does: moved on.

      But the thought stuck. Finals ended. April 2025. I’m sitting in my room thinking, “Hmmm, now what?” I’m someone who likes being busy; having nothing to do is rare for me (ask my friends). That itch to make something turned into, “Okay, let’s actually do this.”

      Video editing is fun. Programming’s grown on me thanks to two internships and building the <u>DAQ(Data Acquisition System)</u> for my school’s formula electric racecar team - [Bearcats Electric Racing(BER)](https://www.instagram.com/bearcats_electric_racing/). So why not combine the two? Big undertaking, sure. But at the start I was thinking small: a CLI tool just for me. No grand plan.. Also, I was already making social posts for BER, so the use case was real.


      The idea was simple: take a video, pass flags like \`--trim\`, and get clean results. Easy, right? That’s what they all say.


      I started researching. If you’re editing programmatically, there’s the undisputed GOAT: [Ffmpeg](https://www.ffmpeg.org/). But I didn’t want to learn this ffmpeg syntax of **DOOM and DESPAIR**. I wanted something you could use without squinting at docs.

      **Python** was the obvious starting point, familiar, fast to iterate, lots of libraries. CLI tools aren’t difficult* in any language if you know what you’re building.

      Three days in, maybe 30–45 minutes a day, I had a working prototype. No Adobe Premiere Pro crashes, no sluggish timelines, just code doing what I asked. I felt like Frankenstein watching his monster take a step.

      Of course, I immediately wanted more features. That’s just how this goes. And soon “my little CLI” wasn’t little anymore: I built a backend, roped in a childhood friend as co-founder, put a frontend on top, and founded **The Timeline Company**. Scene AI was born (formerly Reduct), and the side-quest became a real thing.

      ## Where it is now

      I’m rebuilding the rough prototype into a codebase that is fast, stable, and easier to maintain. Parts that need raw performance live in \`Rust\`. The rest stay in \`Python\` for flexibility. The refactor is a steep curve, but worth it.

      We’re narrowing focus. Instead of chasing pros, we’re helping beginners, clubs, friends, and anyone who wants to post without wrestling timelines. Simple templates, smart assistants, and clean exports that get you to publish.

      Scene AI is in alpha with a growing waitlist. It’s stable enough to use, and we’re shipping improvements steadily. Expect more this ~~Christmas~~ in 2026.


      ## Final Thoughts

      Scene AI started as me scratching an itch: I like editing, I like building, so why not build the thing I wanted when I was editing? It’s not a moonshot manifesto, it’s a friendly, fast tool that helps you hit publish without spending your entire evening wrangling timelines.

      I care about three things: speed, simplicity, and kindness.
      - Speed, because waiting on a render bar is soul-sucking.
      - Simplicity, because most people don’t want to learn a new cockpit to post a 30-second clip.
      - Kindness, because guardrails, privacy, and a nudge of confidence matter when you’re putting yourself out there.

      If any of this resonates - if you’ve got a club recap, a hackathon demo, a meme that deserves life outside your camera roll, come along. Join the <a href="https://tally.so/r/wk4GLe"> waitlist</a>, DM me ideas, send me weird edge cases.

      I won’t **overpromise**; <u>I’ll ship, listen, and iterate</u>.

      ## Note

      * Difficult is subjective. I can't write assembly, Ruby, Zig or Haskell so don't take my word for it

    `.trim(),
  },
];

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
