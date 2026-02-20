import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu className="justify-end text-black" viewport={false}>
      <NavigationMenuList className="justify-end gap-1 sm:gap-2 p-2 sm:p-4">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-none text-black hover:!text-black hover:bg-black/20 hover:rounded-none"
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
