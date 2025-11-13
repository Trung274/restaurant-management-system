import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// ROUTE CONFIGURATION
// ============================================

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/forgot-password',
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = [
  '/login',
  '/forgot-password',
];

// Protected route prefixes (routes that require authentication)
const protectedPrefixes = [
  '/dashboard',
  '/kitchen',
  '/customers',
  '/menu',
  '/orders',
  '/reports',
  '/revenue',
  '/settings',
  '/staff',
  '/tables',
  '/admin',
];

// ============================================
// MIDDLEWARE LOGIC
// ============================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get authentication tokens from cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  const isAuthenticated = !!(accessToken && refreshToken);

  // Check if the current route is protected
  const isProtectedRoute = protectedPrefixes.some(prefix => 
    pathname.startsWith(prefix)
  );

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // ============================================
  // REDIRECT LOGIC
  // ============================================

  // 1. Authenticated user tries to access auth pages (login, etc.)
  //    → Redirect to dashboard
  if (isAuthenticated && authRoutes.includes(pathname)) {
    console.log(`[Middleware] Authenticated user accessing ${pathname} → Redirect to /dashboard`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Unauthenticated user tries to access protected routes
  //    → Redirect to login with return URL
  if (!isAuthenticated && isProtectedRoute) {
    console.log(`[Middleware] Unauthenticated user accessing ${pathname} → Redirect to /login`);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. All other cases → Allow access
  return NextResponse.next();
}

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files with extensions (images, css, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};