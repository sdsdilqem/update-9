import prisma from '../config/database.js';
import { AppError } from '../utils/errors.js';
import { notificationService } from './notification.service.js';

class MessageService {
  async getUserConversations(userId) {
    try {
      const conversations = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        },
        orderBy: {
          createdAt: 'desc'
        },
        distinct: ['senderId', 'receiverId'],
        include: {
          sender: {
            select: {
              username: true,
              avatar: true
            }
          },
          receiver: {
            select: {
              username: true,
              avatar: true
            }
          }
        }
      });

      return this.formatConversations(conversations, userId);
    } catch (error) {
      throw new AppError('Failed to get conversations', 500);
    }
  }

  async getConversationMessages(userId, otherUserId) {
    try {
      return await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: userId }
          ]
        },
        orderBy: {
          createdAt: 'asc'
        },
        include: {
          sender: {
            select: {
              username: true,
              avatar: true
            }
          }
        }
      });
    } catch (error) {
      throw new AppError('Failed to get messages', 500);
    }
  }

  async createMessage({ senderId, receiverId, content }) {
    try {
      const message = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          content
        },
        include: {
          sender: {
            select: {
              username: true,
              avatar: true
            }
          }
        }
      });

      // Send notification to receiver
      await notificationService.createNotification({
        userId: receiverId,
        type: 'MESSAGE',
        title: 'Yeni mesaj',
        content: `${message.sender.username} size mesaj göndərdi`
      });

      return message;
    } catch (error) {
      throw new AppError('Failed to send message', 500);
    }
  }

  async markConversationAsRead(userId, otherUserId) {
    try {
      await prisma.message.updateMany({
        where: {
          receiverId: userId,
          senderId: otherUserId,
          isRead: false
        },
        data: {
          isRead: true
        }
      });
    } catch (error) {
      throw new AppError('Failed to mark messages as read', 500);
    }
  }

  private formatConversations(conversations, userId) {
    return conversations.map(conv => {
      const isUserSender = conv.senderId === userId;
      const otherUser = isUserSender ? conv.receiver : conv.sender;
      
      return {
        id: `${Math.min(conv.senderId, conv.receiverId)}-${Math.max(conv.senderId, conv.receiverId)}`,
        otherUserId: isUserSender ? conv.receiverId : conv.senderId,
        username: otherUser.username,
        avatar: otherUser.avatar,
        lastMessage: conv.content,
        timestamp: conv.createdAt,
        isRead: conv.isRead
      };
    });
  }
}

export const messageService = new MessageService();