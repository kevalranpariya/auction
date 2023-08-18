import { Router } from 'express';
import { ReviewController } from '../controller';

export default (route:Router):Router=>{
  const reviewController = new ReviewController();
  route.post('/createReview',reviewController.createReview;
};