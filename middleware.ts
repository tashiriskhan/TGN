import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase()

  // Catch traffic arriving specifically on the deployment system fallback domain
  if (host.includes('tgn-nine.vercel.app')) {
    
    // Scan for Facebook, Telegram, Twitter, and LinkedIn bots
    const isBot = 
      userAgent.includes('facebookexternalhit') || 
      userAgent.includes('facebookbot') ||
      userAgent.includes('facebot') ||
      userAgent.includes('telegrambot') ||
      userAgent.includes('twitterbot') ||
      userAgent.includes('linkedinbot')

    // If a human user clicked the link, bounce them instantly to the clean custom domain
    if (!isBot) {
      const url = request.nextUrl.clone()
      url.host = 'www.groundnarrative.com'
      url.port = '' // Ensure port is cleared for production URL
      return NextResponse.redirect(url, { status: 308 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/story/:path*',
}
