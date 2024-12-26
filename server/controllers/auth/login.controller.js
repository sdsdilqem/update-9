import { verifyUser, generateToken } from '../../services/auth.service.js';
import { AppError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await verifyUser(email, password);
    const token = generateToken(user.id);
    
    logger.info(`User logged in: ${email}`);
    
    res.json({ token });
  } catch (error) {
    logger.error('Login error:', error);
    throw new AppError('Invalid credentials', 401);
  }
};