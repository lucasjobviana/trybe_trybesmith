import { Router } from 'express';
import orderController from '../controllers/order';
import v from '../midlewares/validateCreateOrderInput';
import checkUserAuthentication from '../midlewares/checkUserAuthentication';

const router = Router();

router.get('/', orderController.getAllOrdersWithProductIds);

router.post('/', checkUserAuthentication, v.validateCreateOrderInput, orderController.createOrder);

export default router;
