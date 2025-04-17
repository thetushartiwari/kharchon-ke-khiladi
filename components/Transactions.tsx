"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { getSessionId } from "@/lib/utils"
import type { Transaction } from "@/lib/models/Transaction"
import { DatePicker } from "@/components/ui/date-picker"

interface TransactionsProps {
  transactions: Transaction[]
  onTransactionAdded: (transaction: Transaction) => void
  onTransactionUpdated: (transaction: Transaction) => void
  onTransactionDeleted: (id: string) => void
  isLoading: boolean
}

export function Transactions({
  transactions,
  onTransactionAdded,
  onTransactionUpdated,
  onTransactionDeleted,
  isLoading,
}: TransactionsProps) {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const resetForm = () => {
    setAmount("")
    setCategory("")
    setDate(new Date())
    setDescription("")
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !category || !date || !description) return

    setIsSubmitting(true)

    try {
      const sessionId = getSessionId()
      const transactionData = {
        amount: Number(amount),
        category,
        date: date?.toISOString(),
        description,
        sessionId,
      }

      if (editingId) {
        // Update existing transaction
        const response = await fetch(`/api/transactions/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        })

        if (response.ok) {
          const data = await response.json()
          onTransactionUpdated(data.data)
          resetForm()
        }
      } else {
        // Create new transaction
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        })

        if (response.ok) {
          const data = await response.json()
          onTransactionAdded(data.data)
          resetForm()
        }
      }
    } catch (error) {
      console.error("Error saving transaction:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (transaction: Transaction) => {
    setAmount(transaction.amount.toString())
    setCategory(transaction.category)
    setDate(new Date(transaction.date))
    setDescription(transaction.description)
    setEditingId(transaction._id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onTransactionDeleted(id)
      }
    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-500">Manage Expenses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-5">
          <div>
            <Input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-orange-200 dark:border-orange-900 focus-visible:ring-green-500"
            />
          </div>
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-orange-200 dark:border-orange-900 focus-visible:ring-green-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Khana Peena">Khana Peena</SelectItem>
                <SelectItem value="Gym">Gym</SelectItem>
                <SelectItem value="Meds">Meds</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <DatePicker
              date={date}
              setDate={setDate}
              className="border-orange-200 dark:border-orange-900 focus-visible:ring-green-500"
            />
          </div>
          <div>
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-orange-200 dark:border-orange-900 focus-visible:ring-green-500"
            />
          </div>
          <div>
            <Button
              type="submit"
              className={`w-full text-white ${
                editingId ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : editingId ? (
                "Update Expense"
              ) : (
                "Add Expense"
              )}
            </Button>
          </div>
        </form>

        <div className="rounded-md border border-green-200 dark:border-green-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No expenses recorded yet. Add your first expense above!
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{format(new Date(transaction.date), "dd MMM yyyy")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">₹{transaction.amount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => handleDelete(transaction._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
