import prisma from '../../config/database.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            verificationLevel: true
          }
        }
      }
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json(product);
  } catch (error) {
    logger.error('Failed to get product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};