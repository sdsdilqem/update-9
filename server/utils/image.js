import sharp from 'sharp';
import { AppError } from './errors.js';

export const optimizeImage = async (buffer, options = {}) => {
  try {
    const {
      width = 800,
      quality = 80,
      format = 'jpeg'
    } = options;

    return sharp(buffer)
      .resize(width, null, { withoutEnlargement: true })
      [format]({ quality })
      .toBuffer();
  } catch (error) {
    throw new AppError('Image optimization failed', 400);
  }
};