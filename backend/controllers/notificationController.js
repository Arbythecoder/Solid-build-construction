const Notification = require('../models/Notification');
const asyncHandler = require('../middleware/async');
const { sendNotification } = require('../config/socket');

// Get user's notifications
exports.getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, unreadOnly = false } = req.query;

  const query = { recipient: req.user.id };
  if (unreadOnly === 'true') {
    query.read = false;
  }

  const skip = (page - 1) * limit;

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Notification.countDocuments(query);
  const unreadCount = await Notification.countDocuments({
    recipient: req.user.id,
    read: false
  });

  res.status(200).json({
    success: true,
    data: notifications,
    pagination: {
      current: parseInt(page),
      pages: Math.ceil(total / limit),
      total
    },
    unreadCount
  });
});

// Mark notification as read
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user.id },
    { read: true, readAt: new Date() },
    { new: true }
  );

  if (!notification) {
    return res.status(404).json({
      success: false,
      error: 'Notification not found'
    });
  }

  res.status(200).json({
    success: true,
    data: notification
  });
});

// Mark all notifications as read
exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user.id, read: false },
    { read: true, readAt: new Date() }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

// Delete notification
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    recipient: req.user.id
  });

  if (!notification) {
    return res.status(404).json({
      success: false,
      error: 'Notification not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// Create and send notification (internal use)
exports.createNotification = async ({ recipient, type, title, message, data }) => {
  const notification = await Notification.create({
    recipient,
    type,
    title,
    message,
    data
  });

  // Send real-time notification via Socket.io
  sendNotification(recipient.toString(), {
    id: notification._id,
    type,
    title,
    message,
    data,
    createdAt: notification.createdAt
  });

  return notification;
};

// Get unread count
exports.getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({
    recipient: req.user.id,
    read: false
  });

  res.status(200).json({
    success: true,
    count
  });
});
