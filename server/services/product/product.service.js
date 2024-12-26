import prisma from '../../config/database.js';
import { AppError } from '../../utils/errors.js';
import { processImageUrls } from './image.service.js';
import logger from '../../utils/logger.js';

class ProductService {
  async createProduct(data, userId) {
    try {
      const { images, ...productData } = data;
      const imageUrls = processImageUrls.serialize(images);

      return await prisma.post.create({
        data: {
          ...productData,
          imageUrls,
          userId
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
    } catch (error) {
      logger.error('Failed to create product:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async getProducts(filters = {}, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      
      const products = await prisma.post.findMany({
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
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      });

      const total = await prisma.post.count({ where: filters });

      return {
        data: products,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      logger.error('Failed to get products:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async getProductById(id) {
    try {
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

      return product;
    } catch (error) {
      logger.error('Failed to get product:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async updateProduct(id, data, userId) {
    try {
      const product = await this.getProductById(id);
      
      if (product.userId !== userId) {
        throw new AppError('Unauthorized', 403);
      }

      const { images, ...updateData } = data;
      if (images) {
        updateData.imageUrls = processImageUrls.serialize(images);
      }

      return await prisma.post.update({
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
    } catch (error) {
      logger.error('Failed to update product:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  async deleteProduct(id, userId) {
    try {
      const product = await this.getProductById(id);
      
      if (product.userId !== userId) {
        throw new AppError('Unauthorized', 403);
      }

      await prisma.post.delete({ where: { id } });
    } catch (error) {
      logger.error('Failed to delete product:', error);
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}

export const productService = new ProductService();