import 'dotenv/config'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import multipart from '@fastify/multipart'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()
app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '::',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
