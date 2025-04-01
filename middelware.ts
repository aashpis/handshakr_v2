
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API } from './app/lib/definitions'


//TODO: make sure all placeholders match backend shape

// public routes, no auth needed 
const publicRoutes = ['/login', '/register', '/']
// routes that require auth
const protectedRoutes = ["/dashboard", "/handshakes", "/history"];


// Middleware function
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const cookieStore = await cookies(); // Await the cookies() call
  const jwt = cookieStore.get("jwt_token")?.value; // Read JWT from httpOnly cookie

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!jwt) {
      // Redirect to login if user is not authenticated
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Fetch CSRF token from backend
      //QUESTION: store it locally instead
      //TODO: Match backend shape
      const csrfRes = await fetch(`${API.BASE}${API.CSRF_TOKEN}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `access_token=${jwt}`, // Send JWT in cookies
        },
      });

      if (!csrfRes.ok) {
        throw new Error("Failed to fetch CSRF token"); 
      }

      //store CSRF
      //TODO: match backend shape
      const { csrfToken } = await csrfRes.json();

      // Attach JWT and CSRF to request headers
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("Authorization", `Bearer ${jwt}`);
      requestHeaders.set("X-CSRF-Token", csrfToken);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    //if auth error, redirect to login  
    } catch (error) {
      console.error("Middleware auth error:", error); 
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}