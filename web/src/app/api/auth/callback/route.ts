// this is the page required when the user gets its token and jwt sign

import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url) // gets params inside url
  const code = searchParams.get('code')

  // this is the urltarget stablished with the middleware
  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('./register', {
    code,
  })

  const cookieExpiration = 60 * 60 * 24 * 7
  const { token } = registerResponse.data
  const redirectURL = redirectTo ?? new URL('/memories/new', request.url) // redirects to the root
  // 2nd param creates a cookie which stores the tokennnn
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiration};`,
    },
  })
}
