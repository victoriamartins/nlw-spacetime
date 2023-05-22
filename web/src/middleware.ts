import { NextRequest, NextResponse } from 'next/server'

const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    console.log('## Redirecionando para a home ##')

    return NextResponse.redirect(redirectUrl, {
      headers: {
        // http only doest show the cookie on browser
        'Set-Cookie': `redirectTo=${request.url}; Path=/; max-age=30; HttpOnly;`,
      },
    })
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/memories/:path*',
}
