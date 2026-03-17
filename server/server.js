const http = require('http');
const socketio = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const socketHandler = require('./socketHandler');
const env = require('./config/env');

/**
 * ??$$$ Main server entry point (HTTP, Socket.io, DB connect)
 */

// Connect to database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io
const io = socketio(server, {
  cors: {
    origin: '*', // Allow all origins to connect via WebSockets
    methods: ['GET', 'POST']
  }
});

// Pass io to socket handler
const { emitToUser, emitToAll } = socketHandler(io);

// Pass emitters to app for use in controllers if needed (using req.app.get('socketHandler'))
app.set('socketHandler', { emitToUser, emitToAll });

const PORT = env.port;

const serverInstance = server.listen(PORT, () => {
  console.log(`Server running in ${env.nodeEnv} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // serverInstance.close(() => process.exit(1));
});
