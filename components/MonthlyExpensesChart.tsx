"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/models/Transaction"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface MonthlyExpensesChartProps {
  transactions: Transaction[]
}

export function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

      if (!months[monthYear]) {
        months[monthYear] = 0
      }

      months[monthYear] += transaction.amount
    })

    return Object.entries(months)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split(" ")
        const [bMonth, bYear] = b.month.split(" ")

        if (aYear !== bYear) {
          return Number(aYear) - Number(bYear)
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return monthNames.indexOf(aMonth) - monthNames.indexOf(bMonth)
      })
  }, [transactions])

  if (transactions.length === 0) {
    return (
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle className="text-green-600 dark:text-green-500">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Add expenses to see monthly chart</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-500">Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
              <Bar dataKey="amount" name="Expenses" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
