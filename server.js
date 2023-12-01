import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()
// Request Body

server.post('/videos', async (request, reply) => {
  const {title, description, duration}= request.body
  await database.create({
    title,
    description,
    duration
  })
  console.log(database.list())
  return reply.status(201).send() //201 created
})

server.get('/videos', async (request) => {
  const search = request.query.search //search é o query parameter via GET
  const videos = await database.list(search)
  return videos
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body
  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send() //Deu certo mas resposta vazia
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})