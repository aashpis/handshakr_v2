import { NextRequest, NextResponse } from 'next/server';

// // Public routes that don't require authentication
// const publicRoutes = ['/', '/register'];

// // Protected routes that require authentication
// const protectedRoutes = [
//   '/dashboard',
//   '/initiated-handshakes',
//   '/create',
//   '/history',
//   '/received-handshakes'
// ];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

//   // Skip middleware for any file in public folder (has extension)
//   if (pathname.includes('.') && !pathname.endsWith('/')) {
//     return NextResponse.next();
//   }

  console.log(`Middleware running for: ${pathname}`); // FOR TESTING ONLY

//   // Allow public pages
//   if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
//     return NextResponse.next();
  // }
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

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for:
//      * - api/ (API routes)
//      * - _next/ (Next.js internals)
//      * - files in public/ folder (anything with an extension)
//      * - common metadata files
//      * - health check endpoints
//      */
//     '/((?!api/|_next/|favicon.ico|sitemap.xml|robots.txt|.*\\..*$).*)',
//   ]
// }