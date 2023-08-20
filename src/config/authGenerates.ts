import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
config();
export const generateToken = async(playload:object)=>{
  const { Scerat }:any = process.env;
  const token = await sign(playload, Scerat);
  return token;
};

