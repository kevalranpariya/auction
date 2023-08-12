import { Request, Response,NextFunction } from 'express';
import User from '../models/User';
export default class AuthController{
  register = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const userRegister = await User.create(req.body);
      return res.json({ userRegister });
    } catch (err) {
      console.log(err);
    }
  };
}