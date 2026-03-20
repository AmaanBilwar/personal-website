export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "git-101",
    title: "Saving you from your Git troubles",
    author: "Amaan",
    date: "2026-2-25",
    content: `

    # Table of contents

- [Well Well Well](#well-well-well)
- [Merge Conflicts](#merge-conflicts)
- [Rebasing](#rebasing)
- [Cherry picking](#cherry-picking)
- [Digestive Commits](#digestive-commits)
- [Sane & Non AI PRs](#sane--non-ai-prs)

# Well well well
    We've all been there. Learning how to program, learn about git & github, save code for free. Everything's so much fun at the start. and then
    <br />
    <b>BOOM.</b>
    <img src="https://i.pinimg.com/736x/87/8d/a6/878da673016277904bd8c0002396cce7.jpg" style="max-width: 300px;" />
    <br />
    <b>Its all over.</b>
    <br />
    <br />
    Let me save you this trouble of experiencing this downfall.
    So what do you actually need to know to save yourself from what I'm going to call in this blog, "<b>Your Git Troubles</b>"?

<code>P.S. the things im going to be talking about are helpful but i wouldn't have felt that they were useful if it weren't for the tools i was using when going through these "phases". LazyGit is gonna be life saver for you lot, it does look intimidating at first but trust me <b>it'll change your life.</b></code>
    # Merge Conflicts

      Let's address the elephant in the room! (elephant sound effect!)

      If you were expecting some magical way of resolving merge conflicts using agentic coding, vibe-coding or LLMs, let me break it to you, it's not as easy as it sounds.
      <br />

      I know this because me and friends were trying to solve the same problem, resolving merge conflicts with [soarailabs](https://soarailabs.com).
      <br />
      If you're interested in learning how we tried to tackle this, let me know.
      <br />



 # Rebasing
<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*LFtbSIWWXBrcHMD9.jpg" style="max-width: 300px;" />

If you want the short version: rebasing is a cleaner, better way to merge. Skip to the next section if that's all you need. But if you want to understand *why*, keep reading.

## What is Rebasing?

Imagine you're working on a feature branch called 'feat-login'. Meanwhile, 'main' has moved forward with commits from other teammates. Instead of merging 'main' into your branch (which creates a messy merge commit), rebasing essentially replays your commits on top of the current 'main'.

Merge puts your changes off to the side with a note. Rebase moves them straight on top. Same result, cleaner history.

## Why It's Important to Rebase

**1. Cleaner Commit History**

When you merge, you get those ugly "Merge branch ''feat-login'' into 'main'" commits cluttering your history. With rebasing, your commits stack linearly on top of 'main'. Your git log actually tells a story instead of a web of merge points.

**2. Fewer Merge Conflicts**

This is the big one nobody talks about enough. When you regularly rebase onto 'main', you're constantly resolving conflicts in small doses. If you wait until the end and merge, you might have to untangle conflicts from weeks of divergent work all at once. Rebase daily, conflict in small pieces.

**3. Instant Feedback**

If 'main' changed something your feature relies on, you'll know *immediately* when you rebase not weeks later during a panic merge before release. It's like getting regular check-ups instead of waiting for a disaster.

## Why I Prefer It Over Merging

I'll keep it simple:

With merging, you get merge commits cluttering your history and conflicts piling up. With rebasing, you get a clean linear history and conflicts resolved early as you go.

For personal projects or teams with good communication, rebasing is the way to go. Your future self will thank you when 'git log' actually makes sense.

 # Cherry picking
Now, let me tell you when i first realized how powerful git rebase was. I was aware about this feature way before but never understood where I would personally use.

let's use the example that happened to me some time ago, which made me realize how good git cherry picking actually is.


 let me set the scene first. HelixDB, goated graph database written in rust from scratch. It has vector search and keyword search inherently built but i wanted to combine both and use the RRF reranker they have, so as any OSS contributor would think, I decided to write it myself.

 i was also writing another feature for helixdb before this which was passing multiple params in their 'Embed' function. 'Embed' lets you pass params that you can query directly via HQL, the language helixdb uses.


 i wrote the Embed feature and asked if anyone has ever asked for this to be a thing? HelixDB CTO and my good friend, Xav said "nope, never."  so i figured that this would probably be something only i use so there's no point in making a PR for this feature.

 Accidentally, i checked out from the feat/embed branch that i had created to work on the RRF feature, without much thought. I wrote the feautre out and it was pretty decent how it turned out and I started testing. BANG. Testing goes smoothly as well.


 I later realize my RRF feature relies on a lot of changed made during Embed feature work, and if thats not a feature thats going to be merged my RRF stuff wont work.

 **OH NO**

So you're telling me that everything i wrote for the past 2 days for RRF is  built  on top of something that will never be merged meaning my work was useless.


**FML**.

 "wait a minute i read about some way to reapply only specific commits onto a branch, whats that about?"

 i start my lil googling, and yes i google when everyone would rather go to chatgippity or perplexity slop. i love holding onto nostalgia what can i say?

i soon read about <b>"git cherry picking"</b>

"git-cherry-pick - Apply the changes introduced by some existing commits" is what it said. So you're telling me that i can take any branch and slap any commit onto there and shabang it works?!!!!

long story short, i basically yoinked commits from on top of the othee feature branch, checked out a new branch from main and slapped thosee commits on to the new (now clean) feature branch. and made the pr. heres the [link](https://github.com/AmaanBilwar/helix-db/commits/feat/new-hybrid-search/) so you can go check it out lmao 
 # Digestive Commits

Small, focused commits are the difference between a git history you can read and one that makes you want to rip your hair out.

Think of commits like saving a document. You wouldn't write 5000 words, save once, then call it a day. You'd save after each paragraph, each thought. Same goes for code.

## Why It Matters

**1. Reviewing is easier**

Nobody wants to review a PR with 47 files changed. But 3-4 focused commits, each doing one thing? That's reviewable in 10 minutes.

**2. Reverting is surgical**

Made a mistake? With small commits, you can undo just the bad part. With a massive commit, you're either reverting everything or digging through code to find what broke.

**3. You actually know what you did**

When you're writing a commit message and can't summarize what changed in one sentence, that's a sign. The commit is doing too much. Split it up.

## The Rule of Thumb

If your commit message has "and" in it, it should probably be two commits. "Added login form and validation" = two commits. "Fixed bug in auth middleware" = one commit, **good**.

Keep commits to one logical change. A feature addition, a bug fix, a refactor, a docs update. That's it. When in doubt, make it smaller.

 # Sane & Non AI PRs

 OSS can be incredible—open‑sourcing the Linux kernel helped put Linux everywhere. Yet open source feels harder now: AI‑assisted coding has led to repo standards being ignored.

 As a result, some projects stop accepting PRs. The ones hurt aren’t OpenClaw automation farms, but learners trying to contribute to real‑world code.

 Projects like [ghostty](https://github.com/ghostty-org/ghostty) use systems like [Vouch](https://github.com/mitchellh/vouch) so 'main'tainers can approve candidates and revoke “AI slop” PRs.

 [Zed](https://github.com/zed-industries/zed/) (I love Zed) encourages contributors to open discussions, rank shared issues, and then implement them. It also has a [Guild](https://zed.dev/community/zed-guild) to learn Rust and ship large, performant work (I’m in cohort 1-yay!).

 The point is stop using AI to make PRs(I recommend learning about the codebase with AI and being confortable in navigating where different parts of the project live in the codebase first), that's the least you can do to respect the proejct you want to contribute on, gain knowledge and respect from 'main'tainers.

 Another thing I've learnt is your PR should be small and digestable. Maintainers shouldn't push it to the side because you remove 3k lines and added 7k lines. PRs with smaller changes are easier to review, don't break things that often and have less edge cases.

 **If I can tell that a PR is AI SLOP, trust me they can fs.**

 `,
  },
  {
    slug: "introducing-jia",
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

      I’m rebuilding the rough prototype into a codebase that is fast, stable, and easier to 'main'tain. Parts that need raw performance live in \`Rust\`. The rest stay in \`Python\` for flexibility. The refactor is a steep curve, but worth it.

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
