import React from 'react'
import { useExpenses } from '../hooks/useExpenses'
import ExpenseCard from '../components/ExpenseCard/ExpenseCard'

export default function Expenses() {
  const { data, isLoading, error } = useExpenses()

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error('Error details:', error)
    return <div>Error loading expenses</div>
  }
  if (!data) return <div>No expenses found</div>

  // Sort by expense date descending (latest first)
  const sorted = [...data].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  return (
    <section style={{ padding: '1rem' }}>
      <h1>Expenses</h1>
      <div style={{ marginTop: '1rem' }}>
        {sorted.map((e) => (
          <ExpenseCard key={e.id} expense={e} />
        ))}
      </div>
    </section>
  )
}
