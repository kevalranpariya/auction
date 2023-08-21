import { Express, Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { endpoint } from '../constant/endpoint';
import passport from 'passport';
import auctionRoutes from './auctionRoutes';
import checkRole from '../middleware/checkRole';
import reviewRoutes from './reviewRoutes';

export default (server:Express)=>{
  server.use('/', authRoutes(Router()));
  server.use(endpoint.USER, passport.authenticate('userAuth',{ session: false }),userRoutes(Router()));
  server.use(endpoint.AUCTION, passport.authenticate('userAuth',{ session: false }), auctionRoutes(Router()));
  server.use(endpoint.REVIEW, passport.authenticate('userAuth',{ session: false }),checkRole(['User']),reviewRoutes(Router()));
};