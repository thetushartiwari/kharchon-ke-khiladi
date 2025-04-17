"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/models/Transaction"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface CategoryPieChartProps {
  transactions: Transaction[]
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {}

    transactions.forEach((transaction) => {
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0
      }

      categories[transaction.category] += transaction.amount
    })

    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const COLORS = ["#f97316", "#16a34a", "#0ea5e9", "#8b5cf6"]

  if (transactions.length === 0) {
    return (
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle className="text-green-600 dark:text-green-500">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Add expenses to see category breakdown</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-500">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`₹${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
