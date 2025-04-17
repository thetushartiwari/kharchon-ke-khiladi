import mongoose from "mongoose"

const MONGODB_URI = "mongodb+srv://thenightsun:Password55@kkk.bk90zhe.mongodb.net/?retryWrites=true&w=majority&appName=KKK"

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
