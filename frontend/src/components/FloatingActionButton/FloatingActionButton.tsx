import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FloatingActionButton.module.css'

export default function FloatingActionButton() {
  const navigate = useNavigate()

  return (
    <button 
      className={styles.fab} 
      onClick={() => navigate('/expenses/new')}
      aria-label="Add new expense"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 4V20M4 12H20" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}