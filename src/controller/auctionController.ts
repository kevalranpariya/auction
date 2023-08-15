import { Request, Response, NextFunction } from 'express';
import { SUCCESS } from '../middleware/responseHandling';
import Auction from '../models/Auction';
import nodeSchedule from '../middleware/nodeSchedule';
// import { DATE, TIMESTAPS } from '../utils/dateFormat';
export default class AuctionController{
  addItem =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id }:number|any = req.user;
      req.body.sellerID = id;
      if(req.files){
        const files:Express.Multer.File[]| any = req.files;
        req.body.images = files?.map((item:Express.Multer.File) => item.path);
      }
      // req.body.time_start = new Date(req.body.time_start);
      // req.body.time_end = new Date(req.body.time_end);

      const addItem = await Auction.create(req.body);
      return SUCCESS(req,res,addItem);
    } catch (err) {
      return next(err);
    }
  };
}