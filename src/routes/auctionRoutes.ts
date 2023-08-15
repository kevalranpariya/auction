import { Router } from 'express';
import { AuctionController } from '../controller';
import { upload } from '../config/cloudinary';

export default (route:Router):Router=>{
  const auctionController = new AuctionController();
  route.post('/addItem',upload.array('photos'), auctionController.addItem);
  return route;
};