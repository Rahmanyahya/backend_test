import express from 'express'
import { publicRouter } from './router/public.router'
import { ErrorMiddleware } from './middleware/error.middleware'
import { privateRouter } from './router/private.router'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.use(publicRouter)
app.use(privateRouter)

app.use(ErrorMiddleware)

app.listen(3000, () => console.log('Server running on port 3000'))