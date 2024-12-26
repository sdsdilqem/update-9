import prisma from '../../config/database.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';
import { getPaginationData, formatPaginatedResponse } from '../../utils/pagination.js';

export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, sort } = req.query;
    const filters = { ...(category && { categoryId: category }) };
    
    const pagination = getPaginationData(page, limit);
    
    const [products, total] = await Promise.all([
      prisma.post.findMany({
        where: filters,
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
              verificationLevel: true
            }
          }
        },
        orderBy: sort ? { [sort]: 'desc' } : { createdAt: 'desc' },
        ...pagination
      }),
      prisma.post.count({ where: filters })
    ]);

    res.json(formatPaginatedResponse(products, total, page, limit));
  } catch (error) {
    logger.error('Failed to list products:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};