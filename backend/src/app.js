import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { postsRoutes } from './routes/posts.js'

export const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL?.split(',').map((item) => item.trim()) || true }))
app.use(express.json({ limit: '1mb' }))

app.get('/', (_req, res) => res.json({ message: 'Blog API is running successfully' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }))

postsRoutes(app)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})
