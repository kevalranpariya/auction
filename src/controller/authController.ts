import { Request, Response,NextFunction } from 'express';
import User from '../models/User';
import { SUCCESS } from '../middleware/responseHandling';
import emailSender from '../utils/emailSender';
import { verify } from 'jsonwebtoken';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import accountCheck from '../utils/accountCheck';
import { config } from 'dotenv';
import { notFoundMessage } from '../utils/messages';
config();
export default class AuthController{
  register = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const userRegister = await User.create(req.body);
      const { id,username,email,verify } = userRegister;
      await emailSender({ id,username,email,verify });
      return SUCCESS(req,res,{ id,username,email,verify });
    } catch (err) {
      return next(err);
    }
  };

  verifyAccount =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { token } = req.params;
      const { SECRET }:any = process.env;
      const verifyToken = await verify(token,SECRET);
      const { id } = verifyToken as User;

      const verifyAccount = await User.findByPk(id);
      if(verifyAccount){
        verifyAccount.verify = true;
        verifyAccount.save();
      }else throw new errHelper(errorTypes.not_found, notFoundMessage('Account'));
      SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };

  login = async (req:Request,res:Response,next:NextFunction) => {
    try {
      const data = await accountCheck(req.body);
      SUCCESS(req,res,data);
    } catch (err) {
      return next(err);
    }
  };
}
