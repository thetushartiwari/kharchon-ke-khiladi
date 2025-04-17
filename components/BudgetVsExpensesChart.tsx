"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/models/Transaction"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

interface BudgetVsExpensesChartProps {
  transactions: Transaction[]
  monthlyIncome: number
}

export function BudgetVsExpensesChart({ transactions, monthlyIncome }: BudgetVsExpensesChartProps) {
  const comparisonData = useMemo(() => {
    if (transactions.length === 0 || !monthlyIncome) return []

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
      .map(([month, expenses]) => ({
        month,
        expenses,
        budget: monthlyIncome,
      }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split(" ")
        const [bMonth, bYear] = b.month.split(" ")

        if (aYear !== bYear) {
          return Number(aYear) - Number(bYear)
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return monthNames.indexOf(aMonth) - monthNames.indexOf(bMonth)
      })
  }, [transactions, monthlyIncome])

  if (transactions.length === 0 || !monthlyIncome) {
    return (
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle className="text-green-600 dark:text-green-500">Budget vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            {!monthlyIncome
              ? "Set your monthly income to see budget comparison"
              : "Add expenses to see budget comparison"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-500">Budget vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
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
              <Bar dataKey="expenses" name="Expenses" fill="#f97316" />
              <Bar dataKey="budget" name="Budget" fill="#16a34a" />
              <ReferenceLine y={0} stroke="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
