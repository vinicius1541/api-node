import { randomUUID } from "node:crypto"
import { sql } from './postgres-connection.js'
export class DatabasePostgres {
  #videos = new Map()

  async list(search = '') {
    let videos
    if ( search ) {
      videos = await sql`
        SELECT * FROM video.videos WHERE title ILIKE ${'%' + search + '%'}
      `
    } else {
      videos = await sql`
        SELECT * FROM video.videos
      `
    }
    return videos
  }

  async create(video) {
    const videoId = randomUUID()
    const { title, description, duration } = video
    await sql`
      INSERT INTO video.videos (id_video, title, description, duration)
      VALUES (${videoId}, ${title}, ${description}, ${duration})
    `
  }

  async update(id, video) {
    const { title, description, duration } = video
    console.log(video)
    await sql`
      UPDATE video.videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id_video = ${id}
    `
  }

  async delete(id) {
    await sql`
      DELETE FROM video.videos WHERE id_video = ${id}
    `
  }
}