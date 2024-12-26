import prisma from '../../config/database.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';
import { processImageUrls } from '../../services/product/image.service.js';

export const createProduct = async (req, res) => {
  try {
    const { images, ...productData } = req.body;
    const userId = req.user.id;

    const imageUrls = processImageUrls.serialize(images);

    const product = await prisma.post.create({
      data: {
        ...productData,
        imageUrls,
        userId,
        status: 'AVAILABLE'
      },
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

    res.status(201).json(product);
  } catch (error) {
    logger.error('Failed to create product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};