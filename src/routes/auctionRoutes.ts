import { Router } from 'express';
import { AuctionController } from '../controller';
import { upload } from '../config/cloudinary';
import checkRole from '../middleware/checkRole';

export default (route:Router):Router=>{
  const auctionController = new AuctionController();
  route.post('/addItem',upload.array('photos'), checkRole(['Seller']), auctionController.addItem);
  route.put('/updateItem/:itemId',upload.array('photos'), checkRole(['Seller']), auctionController.updateItem);
  route.delete('/deleteItem/:itemId', checkRole(['Seller']), auctionController.deleteItem);
  return route;
};