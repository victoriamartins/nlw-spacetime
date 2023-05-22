import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token', // url
      null, // request body
      {
        // request configs
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json', // kind of file used to answear
        },
      },
    )
    const { access_token } = accessTokenResponse.data // accesss token by githubs api

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }) // get with the access token

    // users validation

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })
    // here are the users data: followes, repos etc, but since its parsing
    // according to userSchema, we get only id, login, name and avatar
    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        // info that will be inside token, generally non
        // sensible info since its not encripted
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id, // whose token it is
        expiresIn: '7 days',
      },
    )

    return {
      token, // this token stores username and all i need to display the frontend
    }
  })
}
