import { createUser, generateToken } from '../../services/auth.service.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = generateToken(user.id);
    
    logger.info(`New user registered: ${user.email}`);
    
    res.status(201).json({ token });
  } catch (error) {
    logger.error('Registration error:', error);
    throw new AppError('Registration failed', 400);
  }
};