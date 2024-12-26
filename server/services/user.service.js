import prisma from '../config/database.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class UserService {
  async getProfile(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          verificationLevel: true,
          trustScore: true,
          createdAt: true
        }
      });

      if (!user) {
        throw new AppError('İstifadəçi tapılmadı', 404);
      }

      return user;
    } catch (error) {
      logger.error('Failed to get user profile:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async updateProfile(userId, data) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          verificationLevel: true,
          trustScore: true,
          createdAt: true
        }
      });
    } catch (error) {
      logger.error('Failed to update user profile:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          avatar: true,
          verificationLevel: true,
          trustScore: true,
          createdAt: true,
          _count: {
            select: {
              posts: true
            }
          }
        }
      });

      if (!user) {
        throw new AppError('İstifadəçi tapılmadı', 404);
      }

      return user;
    } catch (error) {
      logger.error('Failed to get user by username:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async getUserProducts(userId) {
    try {
      return await prisma.post.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
              verificationLevel: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      logger.error('Failed to get user products:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}

export const userService = new UserService();