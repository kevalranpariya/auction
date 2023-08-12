import { Express, Router } from 'express';
import auth from './auth';

export default (server:Express)=>{
  server.use('/', auth(Router()));
};