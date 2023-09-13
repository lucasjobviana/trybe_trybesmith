import { Router } from 'express';
import product from '../controllers/product';

const router = Router();

router.get('/', product.getAllProducts);

router.post('/', product.createProduct);

export default router;
