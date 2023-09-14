import { Request, Response, NextFunction } from 'express';

const validateLoginInput = (req: Request, res: Response, next: NextFunction)
:Response<unknown, Record<string, unknown>> | undefined => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
};

export default { validateLoginInput };