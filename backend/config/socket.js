const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Connection handling
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join user to their personal room
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Join landlord to property rooms
    socket.on('join_property', (propertyId) => {
      socket.join(`property_${propertyId}`);
    });

    // Join admin room
    socket.on('join_admin', () => {
      socket.join('admin_room');
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Notification helper functions
const sendNotification = (userId, notification) => {
  if (io) {
    io.to(`user_${userId}`).emit('notification', notification);
  }
};

const sendPropertyUpdate = (propertyId, update) => {
  if (io) {
    io.to(`property_${propertyId}`).emit('property_update', update);
  }
};

const sendAdminNotification = (notification) => {
  if (io) {
    io.to('admin_room').emit('admin_notification', notification);
  }
};

const broadcastNewProperty = (property) => {
  if (io) {
    io.emit('new_property', property);
  }
};

module.exports = {
  initializeSocket,
  getIO,
  sendNotification,
  sendPropertyUpdate,
  sendAdminNotification,
  broadcastNewProperty
};
