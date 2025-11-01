import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            end
            onClick={onClose}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={onClose}
          >
            Expenses
          </NavLink>
        </nav>
      </aside>
    </>
  )
}