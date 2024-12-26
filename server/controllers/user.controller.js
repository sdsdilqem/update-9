import { userService } from '../services/user.service.js';
import { validateUserProfile } from '../validators/user.validator.js';
import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await userService.getProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    logger.error('Failed to get profile:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error, value } = validateUserProfile(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const updatedProfile = await userService.updateProfile(req.user.id, value);
    res.json(updatedProfile);
  } catch (error) {
    logger.error('Failed to update profile:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    res.json(user);
  } catch (error) {
    logger.error('Failed to get user:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const products = await userService.getUserProducts(req.params.userId);
    res.json(products);
  } catch (error) {
    logger.error('Failed to get user products:', error);
    throw new AppError(error.message, error.statusCode || 500);
  }
};