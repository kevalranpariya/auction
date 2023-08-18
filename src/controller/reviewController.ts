import { NextFunction,Request,Response } from 'express';

class ReviewController{
  createReview = (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body);
  };
}

export default ReviewController;