import { Router } from 'express';
import product from '../controllers/product';
import v from '../midlewares/validateCreateProductInput';

const router = Router();

router.get('/', product.getAllProducts);

router.post('/', v.validateCreateProductInput, product.createProduct);

export default router;
