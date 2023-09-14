import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';

const login = async (req: Request, res: Response, _next: NextFunction) => {
  const { username, password } = req.body;
  const userLogged = await UserService.login({ username, password });
  if (userLogged.status === 401) return res.status(401).json(userLogged.data);
  return res.status(200).json({ token: userLogged.data });
};

export default {
  login,
};