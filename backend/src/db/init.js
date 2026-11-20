import mongoose from 'mongoose'

export async function initDatabase(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured')
  if (mongoose.connection.readyState === 1) return mongoose.connection
  await mongoose.connect(databaseUrl)
  console.info('Successfully connected to MongoDB')
  return mongoose.connection
}
