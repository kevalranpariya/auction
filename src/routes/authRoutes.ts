import { Router,Request,Response } from 'express';
import { AuthController } from '../controller';

export default (route:Router):Router=>{
  const authController = new AuthController();
  route.post('/register',authController.register);
  route.get('/verifyAccount/:token', authController.verifyAccount);
  route.post('/login', authController.login);

  route.get('/userLogin',(req:Request,res:Response)=>{
    res.render('login');
  });
  route.get('/chat',(req:Request,res:Response)=>{
    res.render('chat');
  });
  return route;
};