import prisma from '../config/database.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class NotificationService {
  async createNotification({ userId, type, title, content }) {
    try {
      return await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          content
        }
      });
    } catch (error) {
      logger.error('Failed to create notification:', error);
      throw new AppError('Failed to create notification', 500);
    }
  }

  async getUserNotifications(userId) {
    try {
      return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      logger.error('Failed to get notifications:', error);
      throw new AppError('Failed to get notifications', 500);
    }
  }

  async markAsRead(notificationId) {
    try {
      await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true }
      });
    } catch (error) {
      logger.error('Failed to mark notification as read:', error);
      throw new AppError('Failed to mark notification as read', 500);
    }
  }
}

export const notificationService = new NotificationService();