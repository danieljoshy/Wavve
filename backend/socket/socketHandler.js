const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id)

    // Join a personal room using userId
    socket.on('join', (userId) => {
      socket.join(userId)
      console.log(`User ${userId} joined their room`)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id)
    })
  })
}

module.exports = socketHandler
