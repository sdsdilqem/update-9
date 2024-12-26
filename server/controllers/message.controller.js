import { messageService } from '../services/message.service.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const getConversations = async (req, res) => {
  try {
    const conversations = await messageService.getUserConversations(req.user.id);
    res.json(conversations);
  } catch (error) {
    logger.error('Failed to get conversations:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const getConversation = async (req, res) => {
  try {
    const messages = await messageService.getConversationMessages(
      req.user.id,
      req.params.userId
    );
    res.json(messages);
  } catch (error) {
    logger.error('Failed to get conversation:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const message = await messageService.createMessage({
      senderId: req.user.id,
      receiverId: req.params.userId,
      content: req.body.content
    });
    res.status(201).json(message);
  } catch (error) {
    logger.error('Failed to send message:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const markAsRead = async (req, res) => {
  try {
    await messageService.markConversationAsRead(
      req.user.id,
      req.params.userId
    );
    res.json({ success: true });
  } catch (error) {
    logger.error('Failed to mark messages as read:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};