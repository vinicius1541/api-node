import 'dotenv/config'
import postgres from 'postgres'
//process.env é onde fica guardado as variaveis que estao no env
const { PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD } = process.env
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`

export const sql = postgres(URL)