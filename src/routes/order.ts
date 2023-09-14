import { Router } from 'express';
import orderController from '../controllers/order';

const router = Router();

router.get('/', orderController.getAllOrdersWithProductIds);

export default router;
