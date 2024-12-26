import { notificationService } from '../services/notification.service.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user.id);
    res.json(notifications);
  } catch (error) {
    logger.error('Failed to get notifications:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const markAsRead = async (req, res) => {
  try {
    await notificationService.markAsRead(req.params.id);
    res.json({ success: true });
  } catch (error) {
    logger.error('Failed to mark notification as read:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};