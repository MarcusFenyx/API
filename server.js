import express from 'express'
import { PrismaClient, PrismaMongoDBAdapter } from './generated/prisma'
import { MongoClient } from 'mongodb'

const app = express()
app.use(express.json())

const mongoClient = new MongoClient(process.env.DATABASE_URL)
await mongoClient.connect()
const adapter = new PrismaMongoDBAdapter(mongoClient)
const prisma = new PrismaClient({ adapter })

app.post('/usuarios', async (req, res) => {
    const user = await prisma.user.create({ data: req.body })
    res.status(201).json(user)
})

app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
}) 

app.listen(3000)