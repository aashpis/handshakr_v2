import { NextRequest, NextResponse } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/', '/register'];

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard', 
  '/create', 
  '/initiated-handshakes', 
  '/received-handshakes',
  '/history'
];

// Static files/extensions to bypass middleware
const staticFiles = [
  '/favicon.ico',
  '/hs_icon.png',
  '/handshakr-banner.png'
];
const staticExtensions = [
  '.png', '.ico', '.svg', '.css', '.js', '.json'
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bypass middleware for static files
  if (staticFiles.some(file => pathname === file) || 
      staticExtensions.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();
  }

  console.log(`Middleware running for: ${pathname}`); // FOR TESTING ONLY

  // Allow public pages
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
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
