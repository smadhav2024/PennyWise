import type { Expense } from '../types/expense'
import { API_URL } from '../config'

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export async function fetchExpenses(): Promise<Expense[]> {
  const response = await fetch(`${API_URL}/expenses`)
  return handleResponse<Expense[]>(response)
}

export async function createExpense(payload: {
  title: string
  amount: number | string
  date: string
  category?: string
}): Promise<Expense> {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleResponse<Expense>(response)
}

export async function updateExpense(id: string, payload: Partial<Expense>): Promise<Expense> {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleResponse<Expense>(response)
}

export async function deleteExpense(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete')
}
