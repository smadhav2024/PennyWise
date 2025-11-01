import { useQuery } from '@tanstack/react-query'
import { fetchExpenses } from '../services/api'

export function useExpenses() {
  return useQuery(['expenses'], fetchExpenses, {
    staleTime: 1000 * 60 // 1 minute
  })
}
