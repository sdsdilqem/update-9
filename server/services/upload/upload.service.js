import { uploadToStorage } from './storage.service.js';
import { optimizeImage } from '../../utils/image.js';
import { AppError } from '../../utils/errors.js';

export const uploadImages = async (images) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const optimized = await optimizeImage(image);
      return uploadToStorage(optimized);
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    throw new AppError('Image upload failed', 400);
  }
};