#!/usr/bin/env node
/* Run SQL init script against DATABASE_URL from .env
   Usage: node scripts/migrate.js
*/
const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')
require('dotenv').config()

const sqlPath = path.join(__dirname, '..', 'sql', 'init.sql')
if (!fs.existsSync(sqlPath)) {
  console.error('init.sql not found at', sqlPath)
  process.exit(1)
}

const sql = fs.readFileSync(sqlPath, 'utf8')
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set in .env')
  process.exit(1)
}

const pool = new Pool({ connectionString })

;(async () => {
  try {
    console.log('Running migrations...')
    await pool.query(sql)
    console.log('Migrations applied successfully')
    process.exit(0)
  } catch (err) {
    console.error('Migration failed:', err)
    process.exit(1)
  } finally {
    await pool.end()
  }
})()
