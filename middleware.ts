import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/register'];
const protectedRoutes = [
  '/dashboard',
  '/initiated-handshakes',
  '/create',
  '/history',
  '/received-handshakes'
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check cookies
  const jwtCookie = req.cookies.get('jwtCookie')?.value;
  const xsrfToken = req.cookies.get('XSRF-TOKEN')?.value;

  // Protected route: must have valid auth
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    console.log("[MIDDLEWARE] - protected route, checking cookies");

    if (!jwtCookie || !xsrfToken) {
      const loginUrl = new URL('/', req.url);
      
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);

      
      // Clear cookies
       res.cookies.set('jwtCookie', '', {
        path: '/',
        expires: new Date(0),
      });
 
      res.cookies.set('XSRF-TOKEN', '', {
        path: '/',
        expires: new Date(0),
      });

      return res;
    }
  }
  
  // Public route: already logged in
  if (publicRoutes.includes(pathname) && jwtCookie && xsrfToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
