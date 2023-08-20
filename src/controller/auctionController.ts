import { Request, Response, NextFunction } from 'express';
import { SUCCESS } from '../middleware/responseHandling';
import Auction from '../models/Auction';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import User from '../models/User';
import { v2 as cloudInary } from 'cloudinary';
export default class AuctionController{
  addItem =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id } = req.user as User;
      req.body.sellerID = id;
      if(req.files){
        const files = req.files as Express.Multer.File[];
        req.body.images = await Promise.all(files.map(async (item: Express.Multer.File) => {
          const uploadResult = await cloudInary.uploader.upload(item.path);
          return { url: uploadResult.url, public_id: uploadResult.public_id };
        }));
      }
      req.body.highest_bid = req.body.starting_bid;
      const addItem = await Auction.create(req.body);
      return SUCCESS(req,res,addItem);
    } catch (err) {
      return next(err);
    }
  };

  updateItem = async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { itemId } = req.params;
      const { id } = req.user as User;
      const findAuction = await Auction.findByPk(itemId);
      if(req.files){
        if (findAuction?.images.length) {
          await Promise.all(findAuction.images.map(async item => {
            await cloudInary.uploader.destroy(item.public_id as string);
          }));
        }
        const files = req.files as Express.Multer.File[];
        req.body.images = await Promise.all(files.map(async (item: Express.Multer.File) => {
          const uploadResult = await cloudInary.uploader.upload(item.path);
          return { url: uploadResult.url, public_id: uploadResult.public_id };
        }));
      }
      await Auction.update(req.body,{
        where: {
          id: itemId,
          sellerID: id
        }
      });
      return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };

  deleleItem =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { itemId } = req.params;
      const { id } = req.user as User;
      const findItem = await Auction.findByPk(itemId);
      if(findItem?.images.length){
        await Promise.all(findItem.images.map(async item => {
          await cloudInary.uploader.destroy(item.public_id as string);
        }));
      }
      const destroyItem = await Auction.destroy({
        where: {
          id: itemId,
          sellerID: id
        }
      });
      if(!destroyItem) throw new errHelper(errorTypes.bad_request,'something went wrong');
      return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };
}

