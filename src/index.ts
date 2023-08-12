import express, { Express, urlencoded } from 'express';
import { config } from 'dotenv';
import './config/sequelize';
import './models/User';
import Routes from './routes';

const { SERVER_IP,PORT }:any = process.env;
config();
class Server{
  private server:Express;
  constructor(){
    this.server = express();
    this.server.use(urlencoded({ extended: true }));
    Routes(this.server);
    this.server.listen(PORT,SERVER_IP);
  }
}

new Server();