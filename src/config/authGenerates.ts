import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
config();
export const generateToken = async(playload:object)=>{
  const { SECRET }:any = process.env;
  const token = await sign(playload, SECRET);
  return token;
};

