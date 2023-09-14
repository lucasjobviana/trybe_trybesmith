import { Router } from 'express';
import product from '../controllers/product';
import validateCreateProductInput from '../midlewares/validateCreateProductInput';

const router = Router();

router.get('/', product.getAllProducts);

router.post('/', validateCreateProductInput, product.createProduct);

export default router;
