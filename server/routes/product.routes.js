import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { productSchema } from '../validators/product.validator.js';
import * as productController from '../controllers/product/index.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authenticate, validate(productSchema), productController.createProduct);
router.put('/:id', authenticate, validate(productSchema), productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

export default router;