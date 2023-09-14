import jwt from 'jsonwebtoken';
import { UserToLogin } from './types/UserToLogin';

const getNewToken = (user: UserToLogin): string => {
  const token = jwt.sign({ data: user }, 'calafjksaoiekalladioadj', {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

export default getNewToken;