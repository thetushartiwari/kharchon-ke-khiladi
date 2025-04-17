import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { TransactionModel } from "@/lib/models/Transaction"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { amount, category, date, description, sessionId } = body

    if (!amount || !category || !date || !description || !sessionId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    await connectToDatabase()

    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true },
    )

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ data: transaction })
  } catch (error) {
    console.error("Error updating transaction:", error)
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await connectToDatabase()

    const transaction = await TransactionModel.findByIdAndDelete(id)

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Transaction deleted successfully" })
  } catch (error) {
    console.error("Error deleting transaction:", error)
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 })
  }
}
