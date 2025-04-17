import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { TransactionModel } from "@/lib/models/Transaction"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    await connectToDatabase()
    const transactions = await TransactionModel.find({ sessionId }).sort({ date: -1 })

    return NextResponse.json({ data: transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, category, date, description, sessionId } = body

    if (!amount || !category || !date || !description || !sessionId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    await connectToDatabase()

    const transaction = new TransactionModel({
      amount,
      category,
      date,
      description,
      sessionId,
    })

    await transaction.save()

    return NextResponse.json({ data: transaction }, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
