const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db')
const socketHandler = require('./socket/socketHandler')

// Routes
const authRoutes = require('./routes/authroutes')
const userRoutes = require('./routes/usersroutes')
const roomRoutes = require('./routes/roomsroutes')

// Config
dotenv.config()
connectDB()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)

// Health check
app.get('/', (req, res) => {
  res.send('Wavve API is running 🌊')
})

// Socket.io
socketHandler(io)

// Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})