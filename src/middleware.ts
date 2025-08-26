import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log(`[Middleware] Request for ${pathname}`)

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|icon|favicon.ico|opengraph-image|robots.txt|sitemap.xml|_next/static|_next/image|.*chrome.devtools.json$|.*\\.png$).*)',
  ],
}
