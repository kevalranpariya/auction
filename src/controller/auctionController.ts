import { Request, Response, NextFunction } from 'express';
import { SUCCESS } from '../middleware/responseHandling';
import Auction from '../models/Auction';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import Bid from '../models/Bid';
import { setBidTimer, stopBidTimer } from '../middleware/bidTimerHandler';
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
      const { id }:any = await req.user;
      // const findItem = await Auction.findByPk(id);
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
      const { id }:any = req.user;
      // const findItem = await Auction.findByPk()÷
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

  addBid =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id }: any = req.user;
      req.body.userID = id;
      const { itemID } = req.body;
      await Bid.prototype.bidChecker(req.body);
      const addBid = await Bid.create(req.body);
      stopBidTimer;
      setBidTimer(itemID);
      SUCCESS(req,res,addBid);
    } catch (err) {
      return next(err);
    }
  };
}

