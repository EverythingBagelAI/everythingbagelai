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
  const isConsultingDomain = hostname.includes('everythingbagelai.consulting')
  const isMainDomain = hostname.includes('everythingbagelai.com') || hostname.includes('vercel.app')

  // Handle domain-specific routing
  if (isConsultingDomain) {
    // If on consulting domain but not on consulting page, redirect to consulting
    if (!url.pathname.startsWith('/consulting')) {
      return NextResponse.redirect(new URL('/consulting', request.url))
    }
  } else if (isMainDomain) {
    // If on main domain and trying to access consulting, redirect to consulting domain
    if (url.pathname.startsWith('/consulting')) {
      return NextResponse.redirect(new URL(`https://everythingbagelai.consulting${url.pathname}`, request.url))
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