import logger from '../config/logger.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET||'change-secret-soon';

const JWT_EXPIRES_IN='1d';

export const jwttoken={
  sign:(payload)=> {
    try{
      return jwt.sign(payload, JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
    }catch (e) {
      logger.error('Error occurred',e);
      throw new Error('Unable to retrieve token');
    }
  },

  verify: (token) => {
    try{
      return jwt.verify(token, JWT_SECRET);
    }catch (e) {
      logger.error('Error occurred ',e);
      throw new Error('Unable to verify token');
    }
  }
};