import express, { Express, json, urlencoded } from 'express';
import { config } from 'dotenv';
import './config/sequelize';
import './models/User';
import Routes from './routes';
import errorHandling from './middleware/errorHandling';
import './middleware/authPassport';
import passport from 'passport';
import './config/cloudinary';
import './models/Auction';
import './utils/dateFormat';
import nodes from './middleware/nodeSchedule';
nodes();
const { SERVER_IP,PORT }:any = process.env;
config();
class Server{
  private server:Express;
  constructor(){
    this.server = express();
    this.server.use(json());
    this.server.use(urlencoded({ extended: true }));
    this.server.use(passport.initialize());
    Routes(this.server);
    this.server.use(errorHandling);
    this.server.listen(PORT,SERVER_IP);
  }
}

new Server();