import { Router } from 'express';
import { AuthController } from '../controller';

export default (route:Router):Router=>{
  const authController = new AuthController();
  route.get('/register',authController.register);
  return route;
};