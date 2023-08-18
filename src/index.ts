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
import autoSchedule from './middleware/autoSchedule';
import './models/Bid';
import SocketIO from './socket.io';
import { createServer,Server } from 'node:http';
import cors from 'cors';
import path from 'node:path';
autoSchedule();
// import { EventEmitter } from 'events';
const { SERVER_IP,PORT }:any = process.env;
config();
class app{
  private server:Express;
  declare app:Server;
  constructor(){
    this.server = express();
    this.app = createServer(this.server);
    SocketIO(this.app);
    this.server.set('view engine','ejs');
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.use(cors());
    this.server.use(json());
    this.server.use(urlencoded({ extended: true }));
    this.server.use(passport.initialize());
    Routes(this.server);
    this.server.use(errorHandling);
    this.app.listen(PORT,SERVER_IP);
  }
}

new app();