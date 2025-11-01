import React from 'react'
import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'
import ExpenseCard from './ExpenseCard'

const expense = { id: '1', title: 'Test', amount: 12.5, date: new Date().toISOString() }

test('renders expense data', () => {
  render(<ExpenseCard expense={expense} />)
  expect(screen.getByText('Test')).toBeInTheDocument()
  expect(screen.getByText('₹12.50')).toBeInTheDocument()
})
