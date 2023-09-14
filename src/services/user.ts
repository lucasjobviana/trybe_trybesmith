import bcrypt from 'bcryptjs';
import UserModel, { } from '../database/models/user.model';
import { UserToLogin } from '../types/UserToLogin';
import { ServiceResponse } from '../types/ServiceResponse';
import getNewToken from '../auth';

const login = async (user: UserToLogin): Promise<ServiceResponse<string>> => {
  const userCreated = await UserModel.findOne({ 
    where: { username: user.username }, 
  });

  if (!userCreated 
    || !bcrypt.compareSync(user.password, userCreated.dataValues.password)) { 
    return { status: 401, data: { message: 'Username or password invalid' } }; 
  }

  return { status: 200, data: getNewToken(user) };
};

export default {
  login,
};