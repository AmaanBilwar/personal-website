import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROOT_DOMAIN = "amaandoes.tech";
const BLOG_SUBDOMAIN = "blog";
const PROJECT_SUBDOMAIN = "projects"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Strip port if present (e.g. blog.amaandoes.tech:3000)
  const [hostWithoutPort] = hostname.split(":");

  const hostParts = hostWithoutPort.split(".");

  // Check if it's localhost (with or without subdomain)
  const isLocalhost =
    hostWithoutPort === "localhost" ||
    hostWithoutPort.startsWith("127.0.0.1") ||
    hostWithoutPort.startsWith("0.0.0.0") ||
    hostWithoutPort.endsWith(".localhost");

  // Handle localhost subdomain testing (e.g., blog.localhost:3000)
  if (isLocalhost) {
    // Check if it's a subdomain on localhost (e.g., blog.localhost)
    if (hostParts.length > 1 && hostParts[hostParts.length - 1] === "localhost") {
      const subdomain = hostParts[0];
      
      // Route blog subdomain to /blog
      if (subdomain === BLOG_SUBDOMAIN) {
        const pathname = url.pathname;
        
        if (pathname === "/" || pathname === "") {
          url.pathname = "/blog";
        } else if (!pathname.startsWith("/blog")) {
          url.pathname = `/blog${pathname}`;
        }
        
        return NextResponse.rewrite(url);
      }
      
      // Route projects subdomain to /projects
      if (subdomain === PROJECT_SUBDOMAIN) {
        const pathname = url.pathname;
        
        if (pathname === "/" || pathname === "") {
          url.pathname = "/projects";
        } else if (!pathname.startsWith("/projects")) {
          url.pathname = `/projects${pathname}`;
        }
        
        return NextResponse.rewrite(url);
      }
    }
    
    // Regular localhost (no subdomain) - serve normally
    return NextResponse.next();
  }

  // Only apply subdomain logic for the configured root domain.
  if (!hostWithoutPort.endsWith(ROOT_DOMAIN)) {
    return NextResponse.next();
  }

  // amaandoes.tech or www.amaandoes.tech should behave as the main site.
  if (hostParts.length <= 2 || hostParts[0] === "www") {
    return NextResponse.next();
  }

  const subdomain = hostParts[0];

  // Route blog subdomain traffic to the /blog app directory.
  if (subdomain === BLOG_SUBDOMAIN) {
    const pathname = url.pathname;

    if (pathname === "/" || pathname === "") {
      url.pathname = "/blog";
    } else if (!pathname.startsWith("/blog")) {
      url.pathname = `/blog${pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // Route projects subdomain traffic to the /projects app directory.
  if (subdomain === PROJECT_SUBDOMAIN) {
    const pathname = url.pathname;

    if (pathname === "/" || pathname === "") {
      url.pathname = "/projects";
    } else if (!pathname.startsWith("/projects")) {
      url.pathname = `/projects${pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // Fallback: all other subdomains behave like the main site for now.
  return NextResponse.next();
}

export const config = {
  // Run middleware on all non-static, non-API routes.
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};

