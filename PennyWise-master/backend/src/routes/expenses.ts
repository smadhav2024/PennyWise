import express from 'express'
import { query } from '../db'

const router = express.Router()

type ExpenseRow = {
  id: string
  title: string
  amount: string
  date: string
  category?: string
}

router.get('/', async (req: express.Request, res: express.Response) => {
  const result = await query('SELECT * FROM expenses ORDER BY date DESC')
  res.json(result.rows)
})

router.post('/', async (req: express.Request, res: express.Response) => {
  const { title, amount, date, category } = req.body
  if (!title || !amount || !date) {
    return res.status(400).json({ error: 'title, amount and date are required' })
  }
  const result = await query(
    'INSERT INTO expenses(title, amount, date, category) VALUES($1, $2, $3, $4) RETURNING *',
    [title, amount, date, category || null]
  )
  res.status(201).json(result.rows[0])
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params
  const { title, amount, date, category } = req.body
  const result = await query(
    'UPDATE expenses SET title=$1, amount=$2, date=$3, category=$4 WHERE id=$5 RETURNING *',
    [title, amount, date, category || null, id]
  )
  if (result.rowCount === 0) return res.status(404).json({ error: 'not found' })
  res.json(result.rows[0])
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params
  const result = await query('DELETE FROM expenses WHERE id=$1', [id])
  if (result.rowCount === 0) return res.status(404).json({ error: 'not found' })
  res.status(204).send()
})

export default router
