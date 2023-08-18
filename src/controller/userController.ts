import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { SUCCESS } from '../middleware/responseHandling';
import { v2 as cloudInary } from 'cloudinary';
import Auction from '../models/Auction';

export default class UserController{

  userProfile =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id }:number | any = req.user;
      const userDetail = await User.findByPk(id,{ attributes: [ 'id','username','role','email' ] });
      return SUCCESS(req,res,userDetail);
    } catch (err) {
      return next(err);
    }
  };

  profileUpdate =async (req:Request,res:Response,next:NextFunction) => {
    try {
      // console.log(req.file)
      if(req.file){
        req.body.avatar = req.file.path;
      }
      const { id }:number | any = req.user;
      await User.update(req.body,{
        where: {
          id
        }
      });
      return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };

  deleteProfile =async (req:Request,res:Response,next:NextFunction) => {
    try {
      // const { id }:number| any = req.user;
      // const findUser = await User.findByPk(id);
      // const avatar = findUser?.avatar;
      // if(avatar){
      //   // const imageURL = await avatar.split('/');
      //   // const publicID = imageURL[imageURL.length-1];
      // }

      // await User.destroy({
      //   where: {
      //     id: id
      //   }
      // });
      return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };

  allAuctionItem =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const allItem = await Auction.findAll({});
      return SUCCESS(req,res,allItem);
    } catch (err) {
      return next(err);
    }

  };

  auctionItem =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id } = req.params;
      const auctionItem = await Auction.findOne({ where: {
        id: id,
        status: 'active'
      }});
      return SUCCESS(req,res,auctionItem);
    } catch (err) {
      return next(err);
    }
  };
}
