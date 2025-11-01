import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Expense } from '../../types/expense'
import { formatCurrency } from '../../utils/currency'
import { deleteExpense } from '../../services/api'
import styles from './ExpenseCard.module.css'

export default function ExpenseCard({ expense }: { expense: Expense }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: deleteMutation } = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses'])
    },
    onError: (err: any) => alert(String(err))
  })

  const handleEdit = () => {
    navigate(`/expenses/edit/${expense.id}`)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteMutation(expense.id)
    }
  }

  const amountNum = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount as string)
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.title}>{expense.title}</div>
          <div className={styles.date}>{new Date(expense.date).toLocaleDateString()}</div>
        </div>
      </div>
        <div className={styles.amountContainer}>
          <span className={styles.amount}>{formatCurrency(amountNum)}</span>
          {expense.category && <span className={styles.category}>{expense.category}</span>}
        </div>
      <div className={styles.actions}>
        <button onClick={handleEdit} className={`${styles.button} ${styles.edit}`}>Edit</button>
        <button onClick={handleDelete} className={`${styles.button} ${styles.delete}`}>Delete</button>
      </div>
    </article>
  )
}