import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { formatCurrencyCompact } from '../../utils/currency'

type Point = { date: string; total: number }
type Props = { data: Point[] }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short' })
}

export default function Sparkline({ data }: Props) {
  if (!data) return null
  return (
    <div style={{ width: '100%', height: 120 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 40 }}>
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            stroke="#94b896ff"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrencyCompact(value)}
            stroke="#9db894ff"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrencyCompact(value), 'Total']}
            labelFormatter={formatDate}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#3ef63bff" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
