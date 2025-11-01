import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { formatCurrencyCompact } from '../../utils/currency'

type Props = {
  data: { category: string; total: number }[]
}

const COLORS = ['#45d58bff', '#1ca4c6ff', '#2171cdff', '#f97316', '#fba55fff']

export default function CategoryPie({ data }: Props) {
  if (!data || data.length === 0) return <div>No category data</div>

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrencyCompact(value)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
