import { Express, Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { endpoint } from '../constant/endpoint';
import passport from 'passport';
import checkRole from '../middleware/checkRole';
import auctionRoutes from './auctionRoutes';

export default (server:Express)=>{
  server.use('/', authRoutes(Router()));
  server.use(endpoint.USER,passport.authenticate('userAuth',{ session: false }),userRoutes(Router()));
  server.use(endpoint.AUCTION, passport.authenticate('userAuth',{ session: false }), checkRole(['Seller']), auctionRoutes(Router()));
  // server.use(endpoint.SELLER, passport.authenticate('userAuth',{ session: false }),checkRole('Seller'),sellerRoutes(Router()));
};