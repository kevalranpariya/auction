import { Router } from 'express';
import { ReviewController } from '../controller';

export default (route:Router):Router=>{
  const reviewController = new ReviewController();
  route.post('/createReview',reviewController.createReview);
  route.put('/updateReview/:id',reviewController.updateReview);
  route.delete('/deleteReview/:reviewID', reviewController.deleteReview);
  route.get('/viewReview', reviewController.viewReview);
  return route;
};