import { AppError } from '../../utils/errors.js';

export const processImageUrls = {
  serialize: (images) => {
    try {
      return JSON.stringify(images);
    } catch (error) {
      throw new AppError('Failed to process image URLs', 400);
    }
  },

  deserialize: (imageUrls) => {
    try {
      return JSON.parse(imageUrls);
    } catch (error) {
      return [];
    }
  }
};