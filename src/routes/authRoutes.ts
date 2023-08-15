import { Router } from 'express';
import { AuthController } from '../controller';

export default (route:Router):Router=>{
  const authController = new AuthController();
  route.post('/register',authController.register);
  route.get('/verifyAccount/:token', authController.verifyAccount);
  route.post('/login', authController.login);
  return route;
};