import { NextRequest, NextResponse } from 'next/server';

// Public routes, no auth needed
const publicRoutes = ['/', '/register'];

// Routes that require auth
const protectedRoutes = ["/dashboard", "/pending", "/create","/history", "/unconfirmed"];

// Public assets that bypass middleware
const publicAssets = ['/favicon.ico'];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  console.log(`Middleware running for: ${req.nextUrl.pathname}`);
  
  
  // check if public asset to bypass
  if (publicAssets.some(asset => url.pathname.startsWith(asset))) {
    return NextResponse.next();
  }
  
  // direct to public routes, no auth needed
  if (publicRoutes.some(route => url.pathname === route || url.pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  // check if protected route
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    // Read JWT directly from request cookies
    const jwt = req.cookies.get("jwt_token")?.value;
    
    if (!jwt) {
      // Redirect to login if no valid JWT
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // add jwt to header
    // TODO: do I need to add csrf?
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", `Bearer ${jwt}`);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // For all other routes, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except those starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico, images with common extensions
    '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$).*)',
  ],
};
