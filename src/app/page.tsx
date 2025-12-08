"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

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
                <li>junior studying computer engineering at UC</li>
                <li>i love building, music, and dancing</li>
                <li>
                  <span className="line-through">building an ai browser</span>{" "}
                  im not writing all that c++, more of a{" "}
                  <a href="https://doc.rust-lang.org/book/">🦀</a> guy
                </li>
                <li>web dev lead @ RevolutionUC</li>
                <li>data acquisition & telemetry @ Bearcats Electric Racing</li>
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
                  <a
                    target="_blank"
                    href="https://www.honeywell.com/us/en"
                    className="underline"
                  >
                    Honeywell
                  </a>
                </li>
                <li>
                  ai engineering intern @{" "}
                  <a
                    href="https://www.story.com/"
                    target="_blank"
                    className="underline"
                  >
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
                  RevolutionUC — most technically impressive, best use of AWS
                </li>
                <li>CalHacks — Snapchat AR glasses track winner</li>
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
