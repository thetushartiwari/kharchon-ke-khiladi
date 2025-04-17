"use client"

import { useEffect, useState } from "react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Transactions } from "@/components/Transactions"
import { IncomeForm } from "@/components/IncomeForm"
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart"
import { CategoryPieChart } from "@/components/CategoryPieChart"
import { BudgetVsExpensesChart } from "@/components/BudgetVsExpensesChart"
import { SearchBar } from "@/components/SearchBar"
import { getSessionId } from "@/lib/utils"
import type { Transaction } from "@/lib/models/Transaction"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [income, setIncome] = useState({ name: "", amount: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const sessionId = getSessionId()

      // Fetch income data
      const incomeRes = await fetch(`/api/income?sessionId=${sessionId}`)
      if (incomeRes.ok) {
        const incomeData = await incomeRes.json()
        if (incomeData.data) {
          setIncome(incomeData.data)
        }
      }

      // Fetch transactions
      const transactionsRes = await fetch(`/api/transactions?sessionId=${sessionId}`)
      if (transactionsRes.ok) {
        const transactionsData = await transactionsRes.json()
        setTransactions(transactionsData.data || [])
        setFilteredTransactions(transactionsData.data || [])
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredTransactions(filtered)
    } else {
      setFilteredTransactions(transactions)
    }
  }, [searchTerm, transactions])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleTransactionAdded = (newTransaction: Transaction) => {
    setTransactions((prev) => [...prev, newTransaction])
  }

  const handleTransactionUpdated = (updatedTransaction: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t)))
  }

  const handleTransactionDeleted = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t._id !== id))
  }

  const handleIncomeUpdated = (newIncome: { name: string; amount: number }) => {
    setIncome(newIncome)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">खर्चों के खिलाड़ी Dashboard</h1>
          <ModeToggle />
        </div>

        <div className="grid gap-8">
          <IncomeForm initialIncome={income} onIncomeUpdated={handleIncomeUpdated} />

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="w-full md:w-2/3">
              <SearchBar onSearch={handleSearch} />
              <Transactions
                transactions={filteredTransactions}
                onTransactionAdded={handleTransactionAdded}
                onTransactionUpdated={handleTransactionUpdated}
                onTransactionDeleted={handleTransactionDeleted}
                isLoading={isLoading}
              />
            </div>

            <div className="w-full md:w-1/3 grid gap-6">
              <CategoryPieChart transactions={transactions} />
              <BudgetVsExpensesChart transactions={transactions} monthlyIncome={income.amount} />
            </div>
          </div>

          <MonthlyExpensesChart transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
