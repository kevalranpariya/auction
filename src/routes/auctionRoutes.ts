import { Router } from 'express';
import { AuctionController } from '../controller';
import { upload } from '../config/cloudinary';
import checkRole from '../middleware/checkRole';

export default (route:Router):Router=>{
  const auctionController = new AuctionController();
  route.post('/addItem',upload.array('photos'), checkRole(['Seller']), auctionController.addItem);
  route.put('/updateItem/:itemId', checkRole(['Seller']), auctionController.updateItem);
  route.delete('/deleteItem/:itemId', checkRole(['Seller']), auctionController.deleleItem);

  route.post('/addBid', checkRole(['User']), auctionController.addBid);
  return route;
};