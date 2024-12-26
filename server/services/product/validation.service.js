import { AppError } from '../../utils/errors.js';

export const validateProductData = (data) => {
  const { title, price, description } = data;
  
  if (!title || title.length < 3) {
    throw new AppError('Title must be at least 3 characters long', 400);
  }
  
  if (!price || isNaN(price) || price <= 0) {
    throw new AppError('Price must be a positive number', 400);
  }
  
  if (!description || description.length < 10) {
    throw new AppError('Description must be at least 10 characters long', 400);
  }
  
  return true;
};