import { Express, Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { endpoint } from '../constant/endpoint';
import passport from 'passport';

export default (server:Express)=>{
  server.use('/', authRoutes(Router()));
  server.use(endpoint.USER,passport.authenticate('userAuth',{ session: false }),userRoutes(Router()));
};