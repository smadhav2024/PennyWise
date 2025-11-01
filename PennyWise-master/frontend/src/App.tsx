import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import AddExpense from './pages/AddExpense'
import EditExpense from './pages/EditExpense'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/new" element={<AddExpense />} />
        <Route path="/expenses/edit/:id" element={<EditExpense />} />
      </Route>
    </Routes>
  )
}
