import mongoose from "mongoose"

const MONGODB_URI = process.env.DATABASE_URL!

if (!MONGODB_URI) {
  throw new Error("Por favor define la variable de entorno DATABASE_URL")
}

// Caché global para evitar múltiples conexiones
let cached = (global as any).mongoose
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
