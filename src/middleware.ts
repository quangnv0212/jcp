import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const privatePaths = ['/', '/manage', '/'];
const publicPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const { pathname } = request.nextUrl;

  // user not logged in
  if (!accessToken || !refreshToken) {
    if (privatePaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // user logged in
  if (accessToken && refreshToken) {
    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Add config to specify which paths to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ...privatePaths,
    ...publicPaths,
  ],
};
