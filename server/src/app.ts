import express, { Request, Response } from "express";

// Routers
import eventsRouter from './routes/events'
import folderRouter from './routes/folders'
import notesRouter from './routes/notes'
import authRouter from './routes/auth'
import userRouter from './routes/user'

// () Imports
import cookieParser from 'cookie-parser'
import cors from 'cors'

// () Setting up variables
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// () Routes
app.get("/", (req : Request, res : Response)=>{
    res.json('Home page')
})

app.use("/api/folders", folderRouter)
app.use("/api/events", eventsRouter)
app.use("/api/notes", notesRouter)
app.use("/api/auth",  authRouter)
app.use("/api/user",  userRouter)

// () Export app
export default app