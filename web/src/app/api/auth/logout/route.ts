import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url) // redirects to the root

  // 2nd param creates a cookie which stores the tokennnn
  return NextResponse.redirect(redirectURL, {
    headers: {
      // there's no "Delete-Cookie", the cookie is set w no age and no content
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}
