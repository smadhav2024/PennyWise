import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { updateExpense, fetchExpenses } from '../services/api'
import styles from './AddExpense.module.css' // Reuse AddExpense styles

export default function EditExpense() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    date: '',
    category: ''
  })

  // Get the current expense data
  const { data: expenses } = useQuery(['expenses'], fetchExpenses)
  const currentExpense = expenses?.find(e => e.id === id)

  // Set form data when expense is loaded
  useEffect(() => {
    if (currentExpense) {
      setExpense({
        title: currentExpense.title,
        amount: String(currentExpense.amount),
        date: new Date(currentExpense.date).toISOString().split('T')[0],
        category: currentExpense.category || ''
      })
    }
  }, [currentExpense])

  const { mutate } = useMutation(
    (data: any) => updateExpense(id!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses'])
        navigate('/expenses')
      },
      onError: (err: any) => alert(String(err))
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      title: expense.title,
      amount: parseFloat(String(expense.amount)),
      date: expense.date,
      category: expense.category || undefined
    })
  }

  if (!currentExpense) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <h1>Edit Expense</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            min="0"
            step="0.01"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className={styles.submit}>
          Update Expense
        </button>
      </form>
    </div>
  )
}