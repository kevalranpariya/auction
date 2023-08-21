import { NextFunction,Request,Response } from 'express';
import Auction from '../models/Auction';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import Review from '../models/Review';
import { SUCCESS } from '../middleware/responseHandling';
import User from '../models/User';
import { notFoundMessage } from '../utils/messages';

class ReviewController{
  createReview = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const { id } = req.user as User;
      const { itemID } = req.body;
      const findUserItem = await Auction.findOne({
        where: {
          sold_item: id,
          id: itemID
        }
      });
      if(!findUserItem) throw new errHelper(errorTypes.not_found,notFoundMessage('Item'));
      req.body.userID = id;
      const addReview = await Review.create(req.body);
      return SUCCESS(req,res,addReview);
    } catch (err) {
      return next(err);
    }
  };

  updateReview =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id } = req.params;
      await Review.update(req.body,{
        where: {
          id
        }
      });
      return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };

  deleteReview =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { reviewID } = req.params;
      const { id } = req.user as User;
      await Review.destroy({ where: {
        id: reviewID,
        userID: id
      }});
      return SUCCESS(req,res);
    } catch (err) {
      return next(err);
    }
  };

  viewReview =async (req:Request,res:Response,next:NextFunction) => {
    try {
      const { id } = req.user as User;
      const findAllReview = await Review.findAll({
        where: {
          userID: id
        }
      });
      return SUCCESS(req,res,findAllReview);
    } catch (err) {
      return next(err);
    }
  };
}

export default ReviewController;