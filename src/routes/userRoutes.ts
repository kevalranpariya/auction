import { Router } from 'express';
import { UserController } from '../controller';
import User from '../models/User';

export default (route:Router):Router=>{
  const userController = new UserController();
  route.get('/profile', userController.userProfile);
  route.post('/profileUpdate',userController.profileUpdate);
  return route;
};