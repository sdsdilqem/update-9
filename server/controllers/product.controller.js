import { productService } from '../services/product/product.service.js';
import { validateProduct } from '../validators/product.validator.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const createProduct = async (req, res) => {
  try {
    const { error, value } = validateProduct(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const product = await productService.createProduct(value, req.user.id);
    res.status(201).json(product);
  } catch (error) {
    logger.error('Failed to create product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, ...filters } = req.query;
    const products = await productService.getProducts(filters, Number(page), Number(limit));
    res.json(products);
  } catch (error) {
    logger.error('Failed to get products:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    logger.error('Failed to get product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { error, value } = validateProduct(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const product = await productService.updateProduct(req.params.id, value, req.user.id);
    res.json(product);
  } catch (error) {
    logger.error('Failed to update product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    logger.error('Failed to delete product:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};