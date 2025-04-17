import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface Income extends Document {
  _id: string
  name: string
  amount: number
  sessionId: string
  createdAt: Date
  updatedAt: Date
}

const IncomeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
)

export const IncomeModel: Model<Income> = mongoose.models.Income || mongoose.model<Income>("Income", IncomeSchema)
