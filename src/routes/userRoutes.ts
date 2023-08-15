import { Router } from 'express';
import { UserController } from '../controller';
import { upload } from '../config/cloudinary';
import checkRole from '../middleware/checkRole';

export default (route:Router):Router=>{
  const userController = new UserController();
  route.get('/profile',checkRole([ 'User','Seller' ]), userController.userProfile);
  route.put('/profileUpdate',checkRole([ 'User','Seller' ]),upload.single('avatar'),userController.profileUpdate);
  route.delete('/deleteProfile',checkRole([ 'User','Seller' ]), userController.deleteProfile);
  route.get('/allAuctionItem', checkRole(['User']),userController.allAuctionItem);
  return route;
};