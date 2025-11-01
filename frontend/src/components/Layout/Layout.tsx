import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton'
import styles from './Layout.module.css'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Hide FAB when on the Add Expense page
  const hideFab = location.pathname === '/expenses/new'

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={styles.content}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className={styles.main}>
          <Outlet />
        </main>
        {!hideFab && <FloatingActionButton />}
      </div>
    </div>
  )
}