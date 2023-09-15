import { Router } from 'express';
import user from '../controllers/user';
import v from '../midlewares/validateLoginInput';

const router = Router();

router.post('/', v.validateLoginInput, user.login);

router.post('/new', user.create);

export default router;
