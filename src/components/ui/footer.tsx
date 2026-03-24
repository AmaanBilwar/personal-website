import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type FooterProps = React.ComponentProps<"footer"> & {
  children: React.ReactNode;
};

export function Footer({ className, ...props }: Omit<FooterProps, "children">) {
  return (
    <footer className={cn("relative border-t text-white", className)} {...props}>
      {/* Bottom white gradient overlay */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/25 to-transparent"
      /> */}
      <div className="relative mx-auto max-w-5xl px-4">
        <div className="relative grid grid-cols-1 border-x md:grid-cols-2 md:divide-x">
          <div>
            <SocialCard title="Twitter" href="#" />
            <LinksGroup
              title="Community"
              links={[
                { title: "Forum", href: "#" },
                { title: "Events", href: "#" },
                { title: "Partners", href: "#" },
                { title: "Affiliates", href: "#" },
                { title: "Career", href: "#" },
              ]}
            />
          </div>
          <div>
            <SocialCard title="Instagram" href="#" />
            <LinksGroup
              title="Press"
              links={[
                { title: "Investors", href: "#" },
                { title: "Terms of Use", href: "#" },
                { title: "Privacy Policy", href: "#" },
                { title: "Cookie Policy", href: "#" },
                { title: "Legal", href: "#" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center border-t p-3">
        <p className="text-white/70 text-xs">
          © {new Date().getFullYear()} Amaan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

interface LinksGroupProps {
  title: string;
  links: { title: string; href: string }[];
}
function LinksGroup({ title, links }: LinksGroupProps) {
  return (
    <div className="p-2">
      <h3 className="text-white/80 mt-2 mb-4 text-xs font-medium tracking-wider uppercase">
        {title}
      </h3>
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <a href={link.href} className="text-white/70 hover:text-white text-xs">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialCard({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="hover:bg-accent hover:text-accent-foreground flex items-center justify-between border-t border-b p-2 text-sm md:border-t-0"
    >
      <span className="font-medium">{title}</span>
      <ArrowRight className="h-4 w-4 transition-colors" />
    </a>
  );
}
