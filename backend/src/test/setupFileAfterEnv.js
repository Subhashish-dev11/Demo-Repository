import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer?.stop()
})
