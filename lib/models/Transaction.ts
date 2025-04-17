import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface Transaction extends Document {
  _id: string
  amount: number
  category: string
  date: string
  description: string
  sessionId: string
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Khana Peena", "Gym", "Meds", "Others"],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
)

export const TransactionModel: Model<Transaction> =
  mongoose.models.Transaction || mongoose.model<Transaction>("Transaction", TransactionSchema)
