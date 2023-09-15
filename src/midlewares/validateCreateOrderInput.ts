import { Request, Response, NextFunction } from 'express';

const validateCreateOrderInput = (req: Request, res: Response, next: NextFunction)
:Response<unknown, Record<string, unknown>> | undefined => {
  const { userId, productIds } = req.body;

  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }
  if (!productIds) {
    return res.status(400).json({ message: '"productIds" is required' });
  }
  
  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }
  if (productIds.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  next(); 
};

export default { validateCreateOrderInput };