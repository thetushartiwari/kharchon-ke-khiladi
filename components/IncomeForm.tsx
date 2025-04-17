"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getSessionId } from "@/lib/utils"

interface IncomeFormProps {
  initialIncome: {
    name: string
    amount: number
  }
  onIncomeUpdated: (income: { name: string; amount: number }) => void
}

export function IncomeForm({ initialIncome, onIncomeUpdated }: IncomeFormProps) {
  const [name, setName] = useState(initialIncome.name || "")
  const [amount, setAmount] = useState(initialIncome.amount || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !amount) return

    setIsSubmitting(true)

    try {
      const sessionId = getSessionId()

      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          amount: Number(amount),
          sessionId,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        onIncomeUpdated({ name, amount: Number(amount) })
      }
    } catch (error) {
      console.error("Error saving income:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-500">Set Your Monthly Income</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <div>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-orange-200 dark:border-orange-900 focus-visible:ring-green-500"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Monthly Income (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-orange-200 dark:border-orange-900 focus-visible:ring-green-500"
            />
          </div>
          <div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Income"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
