export type Expense = {
  id: string
  title: string
  amount: number | string
  date: string // ISO
  category?: string
  created_at?: string
}
