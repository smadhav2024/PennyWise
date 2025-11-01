import { Pool, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL || ''

if (!connectionString) {
  console.warn('DATABASE_URL is not set; database calls will fail until configured.')
}

export const pool = new Pool({ connectionString })

export async function query(text: string, params?: any[]): Promise<any> {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}
