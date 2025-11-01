import React from 'react'
import { Link } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import ExpenseCard from '../components/ExpenseCard/ExpenseCard'
import styles from './Dashboard.module.css'
import { formatCurrencyCompact } from '../utils/currency'
import CategoryPie from '../components/charts/CategoryPie'
import Sparkline from '../components/charts/Sparkline'

export default function Dashboard() {
  const { aggregates, isLoading, error } = useDashboard()

  if (isLoading) return <div>Loading dashboard...</div>
  if (error) return <div>Error loading dashboard</div>

  const { totalAll, totalThisMonth, avgPerDay7, topCategories, recent } = aggregates

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <Link to="/expenses/new" className={styles.addButton}>Add Expense</Link>
      </div>

      <div className={styles.kpis}>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Total (this month)</div>
          <div className={styles.kpiValue}>{formatCurrencyCompact(totalThisMonth)}</div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Total (all time)</div>
          <div className={styles.kpiValue}>{formatCurrencyCompact(totalAll)}</div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Avg / day (7d)</div>
          <div className={styles.kpiValue}>{formatCurrencyCompact(avgPerDay7)}</div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Top category</div>
          <div className={styles.kpiValue}>{topCategories[0]?.category || '—'}</div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Spending (last 7 days)</div>
          <Sparkline data={aggregates.last7Series} />
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Top categories</div>
          <CategoryPie data={topCategories} />
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2>Recent expenses</h2>
        <div className={styles.recentList}>
          {recent.length === 0 && <div>No recent expenses</div>}
          {recent.map((e: any) => (
            <ExpenseCard key={e.id} expense={e} />
          ))}
        </div>
      </div>
    </section>
  )
}
