import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class AuthService {
  async register(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          verificationLevel: true
        }
      });

      const token = this.generateToken(user.id);
      return { user, token };
    } catch (error) {
      logger.error('Registration failed:', error);
      throw new AppError('Registration failed', 500);
    }
  }

  async login(email, password) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AppError('Invalid credentials', 401);
      }

      const token = this.generateToken(user.id);
      
      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          verificationLevel: user.verificationLevel
        },
        token
      };
    } catch (error) {
      logger.error('Login failed:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

export const authService = new AuthService();