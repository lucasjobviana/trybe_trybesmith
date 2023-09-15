import bcrypt from 'bcryptjs';
import UserModel, { } from '../database/models/user.model';
import { UserToLogin } from '../types/UserToLogin';
import { ServiceResponse } from '../types/ServiceResponse';
import getNewToken from '../auth';

const login = async (user: UserToLogin): Promise<ServiceResponse<string>> => {
  const userCreated = await UserModel.findOne({ 
    where: { username: user.username }, 
  });

  console.log(userCreated, user);
  console.log(user.password, userCreated?.dataValues.password);
  console.log(bcrypt.compareSync(user.password, userCreated?.dataValues.password || 'sd'));

  if (!userCreated 
    || !bcrypt.compareSync(user.password, userCreated.dataValues.password)) { 
    return { status: 401, data: { message: 'Username or password invalid' } }; 
  }

  return { status: 200, data: getNewToken(user) };
};

const create = async (user: UserToLogin): Promise<boolean> => {
  const newUser = await UserModel.create({
    username: user.username,
    password: bcrypt.hashSync(user.password, 10),
    vocation: 'paladino',
    level: 1,
  });
  if (!newUser) return false;
  return true;
};

export default {
  login,
  create,
};