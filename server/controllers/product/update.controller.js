import prisma from '../../config/database.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';
import { processImageUrls } from '../../services/product/image.service.js';

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { images, ...updateData } = req.body;
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

    if (images) {
      updateData.imageUrls = processImageUrls.serialize(images);
    }

    const updatedProduct = await prisma.post.update({
      where: { id },
      data: updateData,
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

    res.json(updatedProduct);
  } catch (error) {
    logger.error('Failed to update product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};