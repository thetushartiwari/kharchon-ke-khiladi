import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { IncomeModel } from "@/lib/models/Income"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    await connectToDatabase()
    const income = await IncomeModel.findOne({ sessionId })

    return NextResponse.json({ data: income })
  } catch (error) {
    console.error("Error fetching income:", error)
    return NextResponse.json({ error: "Failed to fetch income" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, amount, sessionId } = body

    if (!name || !amount || !sessionId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Update if exists, create if not
    const income = await IncomeModel.findOneAndUpdate({ sessionId }, { name, amount }, { new: true, upsert: true })

    return NextResponse.json({ data: income }, { status: 201 })
  } catch (error) {
    console.error("Error saving income:", error)
    return NextResponse.json({ error: "Failed to save income" }, { status: 500 })
  }
}
