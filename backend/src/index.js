import 'dotenv/config'
import { app } from './app.js'
import { initDatabase } from './db/init.js'

const PORT = Number(process.env.PORT) || 3000
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('DATABASE_URL is missing. Add it to backend/.env')
  process.exit(1)
}

try {
  await initDatabase(DATABASE_URL)
  const server = app.listen(PORT, () => console.log(`Blog API running at http://localhost:${PORT}`))

  const shutdown = async () => {
    server.close()
    const mongoose = await import('mongoose')
    await mongoose.default.disconnect()
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
} catch (error) {
  console.error('Could not start the application:', error.message)
  process.exit(1)
}
