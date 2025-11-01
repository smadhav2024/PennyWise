import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import expensesRouter from './routes/expenses'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/expenses', expensesRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
