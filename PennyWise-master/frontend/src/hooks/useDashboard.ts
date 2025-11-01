import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchExpenses } from '../services/api'
import type { Expense } from '../types/expense'

function parseAmount(a: number | string) {
  const n = typeof a === 'number' ? a : parseFloat(String(a))
  return Number.isFinite(n) ? n : 0
}

export function useDashboard() {
  const query = useQuery(['expenses'], fetchExpenses, { staleTime: 1000 * 60 })

  const computed = useMemo(() => {
    const data: Expense[] = query.data || []
    // totals
    const totalAll = data.reduce((s, e) => s + parseAmount(e.amount), 0)

    const now = new Date()
    const thisMonth = data.filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    })
    const totalThisMonth = thisMonth.reduce((s, e) => s + parseAmount(e.amount), 0)

    // last 7 days average
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(now.getDate() - 6) // include today (7 days)
    const inLast7 = data.filter((e) => new Date(e.date) >= new Date(sevenDaysAgo.setHours(0,0,0,0)))
    const totalLast7 = inLast7.reduce((s, e) => s + parseAmount(e.amount), 0)
    const avgPerDay7 = +(totalLast7 / 7).toFixed(2)

    // top categories
    const catMap: Record<string, number> = {}
    data.forEach((e) => {
      const cat = e.category || 'Uncategorized'
      catMap[cat] = (catMap[cat] || 0) + parseAmount(e.amount)
    })
    const topCategories = Object.entries(catMap)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3)

    // recent (latest expense date first)
    const recent = [...data].sort((a, b) => {
      const ta = new Date(a.date).getTime()
      const tb = new Date(b.date).getTime()
      return tb - ta
    }).slice(0, 5)

    // last 7 days series (daily totals)
    const series: { date: string; total: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const key = d.toISOString().split('T')[0]
      const dayTotal = data
        .filter((e) => new Date(e.date).toISOString().split('T')[0] === key)
        .reduce((s, e) => s + parseAmount(e.amount), 0)
      series.push({ date: key, total: dayTotal })
    }

    return {
      totalAll,
      totalThisMonth,
      avgPerDay7,
      topCategories,
      recent,
      last7Series: series
    }
  }, [query.data])

  return { ...query, aggregates: computed }
}

export default useDashboard
