import prisma from '../../config/database.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const product = await prisma.post.findUnique({
      where: { id }
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.userId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    await prisma.post.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    logger.error('Failed to delete product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};