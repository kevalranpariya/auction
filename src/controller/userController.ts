import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { SUCCESS } from '../middleware/responseHandling';
import cloudInary from '../config/cloudinary';

export default class UserController{

  userProfile =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id }:number | any = req.user;
      const userDetail = await User.findByPk(id,{ attributes: [ 'id','username','role','email','number' ] });
      return SUCCESS(req,res,userDetail);
    } catch (err) {
      return next(err);
    }
  };

  profileUpdate =async (req:Request,res:Response,next:NextFunction) => {
    try {
      console.log(req.body);
    //   console.log((req.files as { fil: File }).fil);
    console.log(req.files)

      // console.log(req)
    //   const name = req.files;
    //   const result = cloudInary.uploader.upload(req.files);
    //   const { id }:number | any = req.user;
    //   await User.update(req.body,{
    //     where: {
    //       id
    //     }
    //   });
    //   return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };
}