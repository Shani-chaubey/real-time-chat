import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { connectDB } from './utils/features.js'
import { errorMiddleware } from './middlewares/error.js'
import userRoute from './routes/user.routes.js'
import chatRoute from './routes/chat.routes.js'

dotenv.config()

const MongoURI = process.env.MONGODB
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

connectDB(MongoURI)

app.use('/user', userRoute)
app.use('/chat', chatRoute)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
}) 