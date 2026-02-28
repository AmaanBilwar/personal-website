"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PreviewLinkProps = React.ComponentProps<"a"> & {
  previewImage: string;
  previewAlt: string;
};

function PreviewLink({
  previewImage,
  previewAlt,
  className,
  children,
  ...props
}: PreviewLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a className={className} {...props}>
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent sideOffset={10} className="p-1 bg-black border border-white/20">
        <img src={previewImage}
          alt={previewAlt}
          className="w-44 h-28 object-cover rounded-sm"
        />
      </TooltipContent>
    </Tooltip>
  );
}

const page = () => {
  return (
    <main className="relative w-full min-h-screen bg-white">
      <div className="flex flex-col justify-center min-h-screen py-8 lg:pt-16 lg:pb-0 text-black">
        <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-24 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
                hi im{" "}
                <img
                  src="/badge.png"
                  alt="Badge"
                  className="inline-block align-middle mr-4 sm:mr-6 md:mr-8 h-24 sm:h-32 md:h-40 lg:h-48 xl:h-64 rotate-12"
                  style={{ verticalAlign: "middle" }}
                />
              </h1>

              {/* About Section */}
              <section className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  about:
                </h2>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                  <li>junior - computer engineering at ucincinnati</li>
                  <li>
                    <a
                      className="underline"
                      href="https://doc.rust-lang.org/book/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      rust
                    </a>
                    ,{" "}
                    <a
                      className="underline"
                      href="https://www.helix-db.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      helixdb
                    </a>
                    ,{" "}
                    <a
                      className="underline"
                      href="https://github.com/AmaanBilwar/nvim-configs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      nvim
                    </a>
                    ,{" "}
                    <a
                      className="underline"
                      href="https://github.com/tmux/tmux/wiki"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      tmux
                    </a>
                    ,{" "}
                    <a
                      className="underline"
                      href="https://zed.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      zed,
                    </a>{" "}
                    <a
                      className="underline"
                      href="https://github.com/jesseduffield/lazygit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      lazygit
                    </a>{" "}
                    enjoyer
                  </li>
                  <li>
                    web lead for{" "}
                    <PreviewLink
                      className="underline"
                      href="https://www.revolutionuc.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      previewImage="/hack.jpg"
                      previewAlt="RevolutionUC preview"
                    >
                      RevolutionUC 2026
                    </PreviewLink>
                  </li>
                  <li>
                    built a data acquisition & telemetry system for{" "}
                    <PreviewLink
                      className="underline"
                      href="https://www.bearcatsracing.org/ev-home"
                      target="_blank"
                      rel="noopener noreferrer"
                      previewImage="/bearcats.jpg"
                      previewAlt="Bearcats Electric Racing preview"
                    >
                      Bearcats Electric Racing
                    </PreviewLink>
                  </li>
                </ul>
              </section>

              {/* Experience Section */}
              <section className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  experience:
                </h2>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    2x swe intern @{" "}
                    <PreviewLink
                      target="_blank"
                      href="https://www.honeywell.com/us/en"
                      rel="noopener noreferrer"
                      className="underline"
                      previewImage="/atl.jpg"
                      previewAlt="Honeywell preview"
                    >
                      Honeywell
                    </PreviewLink>
                  </li>
                  <li>
                    ai engineering intern @{" "}
                    <a className="underline" href="https://story.com">
                      Story.com{" "}
                    </a>
                  </li>
                </ul>
              </section>

              {/* Hackathons Section */}
              <section className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  hackathons:
                </h2>
                <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                  <li>
                    <PreviewLink
                      className="underline"
                      href="https://www.linkedin.com/posts/amaanbilwar_we-won-at-calhacks-because-of-a-non-team-activity-7388631874379800576-3N91?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6CRZEBddecKFUeZqS7s8HAXqDXvhaUCB8"
                      target="_blank"
                      rel="noopener noreferrer"
                      previewImage="/cal.webp"
                      previewAlt="CalHacks preview"
                    >
                      CalHacks
                    </PreviewLink>{" "}
                    — Snapchat AR glasses track winner
                  </li>
                  <li>
                    <PreviewLink
                      className="underline"
                      href="https://devpost.com/software/realitycheck-t35pxd"
                      target="_blank"
                      rel="noopener noreferrer"
                      previewImage="/rev.jpg"
                      previewAlt="RevolutionUC hackathon preview"
                    >
                      RevolutionUC 
                    </PreviewLink>{" "}
                    — most technically impressive + best use of AWS
                  </li>
                </ul>
              </section>

              {/* Social Links */}
            <div className="flex flex-row items-center justify-start gap-2 sm:gap-3 md:gap-4 pt-4 pb-12">
                {[
                  {
                    label: "GitHub",
                    href: "https://github.com/amaanbilwar",
                    Icon: Github,
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/amaanbilwar/",
                    Icon: Linkedin,
                  },
                  {
                    label: "Twitter",
                    href: "https://twitter.com/bilwaramaan",
                    Icon: Twitter,
                  },
                  {
                    label: "Email",
                    href: "mailto:bilwarad@mail.uc.edu",
                    Icon: Mail,
                  },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-md hover:bg-black/10 active:bg-black/20 transition-all duration-300 cursor-pointer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-5 h-5 text-black" />
                  </a>
                ))}
            </div>
          </div>
          </div>
        </div>
    </main>
  );
};

export default page;
