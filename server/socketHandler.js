const redis = require('./config/redis');

// ??$$$ Socket.io event handling logic for real-time updates
const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinUserRoom', ({ userId }) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room: ${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Helper function to emit to a specific user
  const emitToUser = (userId, event, data) => {
    io.to(userId.toString()).emit(event, data);
  };

  // Helper function to emit to all users
  const emitToAll = (event, data) => {
    io.emit(event, data);
  };

  return { emitToUser, emitToAll };
};

module.exports = socketHandler;
