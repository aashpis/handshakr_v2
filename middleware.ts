import { NextRequest, NextResponse } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/', '/register'];

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/initiated-handshakes', '/create', '/history', '/received-handshakes'];

// Public assets that bypass middleware
const publicAssets = ['/favicon.ico',  '/hs_icon.png', '/handshakr-banner.png'];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  console.log(`Middleware running for: ${url.pathname}`); //FOR TESTING ONLY

  // Bypass middleware for public assets
  if (publicAssets.some(asset => url.pathname.startsWith(asset))) {
    return NextResponse.next();
  }

  // Allow public pages
  if (publicRoutes.some(route => url.pathname === route || url.pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  // // Check for protected routes
  // if (protectedRoutes.some(route => url.pathname === route || url.pathname.startsWith(`${route}/`))) {
  //   // Read JWT from cookies
  //   const jwt = req.cookies.get("jwtToken")?.value;
  //   if (!jwt) {
  //     // Redirect to login if no valid JWT is found
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

  // }

  // For all other routes, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
