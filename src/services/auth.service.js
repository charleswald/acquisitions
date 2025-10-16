import logger from '../config/logger.js';
import {db} from '../config/database.js';
import {users} from '#models/user.model.js';
import {eq} from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const hashPassword= async (password) => {
  try{
    return bcrypt.hash(password, 10);
  }catch(e){
    logger.error('Error creating hash password',e);
    throw new Error('Error creating hash password');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try{
    return await bcrypt.compare(password, hashedPassword);
  }catch(e){
    logger.error('Error comparing password',e);
    throw new Error('Error comparing password');
  }
};

export const createUser=async ({name,email,password,role='user'}) => {
  try{
    const existingUser = await db.select().from(users).where(eq(users.email,email)).limit(1);
    if(existingUser.length > 0){
      throw new Error('User with this email already exists');
    }

    const hash = await hashPassword(password);

    const [newUser] = await db.insert(users)
      .values({name,email,password:hash,role})
      .returning({id:users.id,name:users.name,email:users.email,created_at:users.created_at,role:users.role});

    logger.info(`User with email ${newUser.email} created successfully.`);

    return newUser;
  }catch(e){
    logger.error('Error creating user',e);
    throw e;
  }
};

export const authenticateUser = async ({email, password}) => {
  try{
    const [user] = await db.select().from(users).where(eq(users.email,email)).limit(1);
        
    if(!user){
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
        
    if(!isPasswordValid){
      throw new Error('Invalid password');
    }

    logger.info(`User with email ${user.email} authenticated successfully.`);
        
    // Return user without password
    const {password: _, ...userWithoutPassword} = user;
    return userWithoutPassword;
  }catch(e){
    logger.error('Error authenticating user',e);
    throw e;
  }
};
