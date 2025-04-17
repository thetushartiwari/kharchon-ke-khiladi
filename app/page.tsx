import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, PieChart, Target } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-orange-500 mb-4">खर्चों के खिलाड़ी</h1>
        <p className="text-xl md:text-2xl text-center text-green-600 dark:text-green-500 mb-12">
          खतरों से बचना है तो खर्चों से बचें ;)
        </p>

        <Link href="/dashboard" passHref>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg mb-16">
            चलिए शुरू करते है
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-orange-500" />
                Track Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Easily record and manage your daily expenses with a simple interface.</CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-6 w-6 text-orange-500" />
                Visualize Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>See where your money goes with intuitive charts and breakdowns.</CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-500" />
                Set Budgets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Create budgets and track your progress to achieve financial goals.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
