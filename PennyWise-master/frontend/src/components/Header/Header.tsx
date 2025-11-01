import React from 'react'
import styles from './Header.module.css'

type HeaderProps = {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={onMenuClick} aria-label="Toggle menu">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4 6H20M4 12H20M4 18H20" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className={styles.brand} onClick={() => window.location.href = '/'}>PennyWise</div>
    </header>
  )
}
