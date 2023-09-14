import { Router } from 'express';
import user from '../controllers/user';
import validateLoginInput from '../midlewares/validateLoginInput';

const router = Router();

router.post('/', validateLoginInput, user.login);

export default router;
