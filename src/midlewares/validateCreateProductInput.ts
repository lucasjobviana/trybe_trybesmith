import { Request, Response, NextFunction } from 'express';

const validateCreateProductInput = (req: Request, res: Response, next: NextFunction)
:Response<unknown, Record<string, unknown>> | undefined => {
  const { name, price } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }
  next();
};

export default { validateCreateProductInput };