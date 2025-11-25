import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  createdAt: string;
}

export const useSocket = () => {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) return;

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    // Join user's personal room
    socket.emit('join', user.id);

    // Join admin room if admin
    if (user.role === 'admin') {
      socket.emit('join_admin');
    }

    // Listen for notifications
    socket.on('notification', (notification: Notification) => {
      showNotification(notification);
    });

    // Listen for admin notifications
    socket.on('admin_notification', (notification: Notification) => {
      showNotification(notification);
    });

    // Listen for new properties (broadcast)
    socket.on('new_property', (property: any) => {
      toast.success(`New property listed: ${property.title}`, {
        duration: 5000,
        icon: '🏠'
      });
    });

    // Listen for property updates
    socket.on('property_update', (update: any) => {
      toast.success(update.message, {
        duration: 4000
      });
    });

    // Connection status
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const showNotification = (notification: Notification) => {
    const icon = getNotificationIcon(notification.type);

    toast(notification.message, {
      duration: 5000,
      icon,
      style: {
        background: '#fff',
        color: '#333',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    });
  };

  const getNotificationIcon = (type: string): string => {
    switch (type) {
      case 'inquiry_received':
        return '💬';
      case 'property_approved':
        return '✅';
      case 'property_rejected':
        return '❌';
      case 'payment_received':
        return '💰';
      case 'new_message':
        return '📩';
      case 'property_viewed':
        return '👁️';
      default:
        return '🔔';
    }
  };

  const joinPropertyRoom = useCallback((propertyId: string) => {
    socketRef.current?.emit('join_property', propertyId);
  }, []);

  const leavePropertyRoom = useCallback((propertyId: string) => {
    socketRef.current?.emit('leave_property', propertyId);
  }, []);

  return {
    socket: socketRef.current,
    joinPropertyRoom,
    leavePropertyRoom
  };
};

export default useSocket;
