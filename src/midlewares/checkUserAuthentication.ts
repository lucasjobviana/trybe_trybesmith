import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ServiceError from '../services/serviceError';

const checkUserAuthentication = (req: Request, res: Response, next: NextFunction):void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ServiceError('Token not found');
  }
  const token = authorization.split(' ')[1];
  try {
    const user = jwt.verify(token, 'calafjksaoiekalladioadj');
    req.body.user = user;
  } catch (error) {
    throw new ServiceError('Invalid token');
  }

  

  next();
};
export default checkUserAuthentication;
