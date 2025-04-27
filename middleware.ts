import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Early return for excluded paths
  if (request.nextUrl.pathname.startsWith('/api') ||
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.startsWith('/_static') ||
      request.nextUrl.pathname.startsWith('/_vercel') ||
      /\.[^/]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Define the domains
  const CONSULTING_DOMAIN = 'everythingbagelai.consulting'
  const MAIN_DOMAIN = 'everythingbagelai.com'
  const PREVIEW_DOMAIN = 'vercel.app'

  // Check if we're on the consulting domain
  const isConsultingDomain = hostname === CONSULTING_DOMAIN
  const isMainDomain = hostname === MAIN_DOMAIN
  const isPreviewDomain = hostname.endsWith(PREVIEW_DOMAIN)
  
  // Determine if we're in development
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  // Get the protocol from the request or default to https in production
  const protocol = isDevelopment ? 'http://' : 'https://'

  // Handle domain-specific routing
  if (isConsultingDomain) {
    // If on consulting domain and not accessing consulting page, redirect to main domain
    if (!url.pathname.startsWith('/consulting')) {
      // For preview domains, use the current request's protocol
      const targetDomain = isPreviewDomain ? hostname : MAIN_DOMAIN
      return NextResponse.redirect(new URL(`${protocol}${targetDomain}${url.pathname}`, request.url))
    }
  } else if (isMainDomain || isPreviewDomain) {
    // If on main domain and trying to access consulting, redirect to consulting domain
    if (url.pathname.startsWith('/consulting')) {
      return NextResponse.redirect(new URL(`${protocol}${CONSULTING_DOMAIN}${url.pathname}`, request.url))
    }
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    // Verify environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      return response
    }

    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    // Get session without throwing
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Supabase session error:', error)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
} 