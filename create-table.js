import { sql } from './postgres-connection.js'
// sql`
//   DROP TABLE IF EXISTS video.videos
// `.then(() => {
//   console.log('tabela deletada')
// })

sql`
  CREATE TABLE video.videos (
    id_video TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    description TEXT,
    duration INTEGER
  );
`.then((result) => {
  console.log('Tabela criada')
})
