import express, { Express, urlencoded } from 'express';
import { config } from 'dotenv';
import './config/sequelize';
import './models/User';
import Routes from './routes';
import errorHandling from './middleware/errorHandling';
// import './config/email';
import './middleware/authPassport';
import passport from 'passport';
import './config/cloudinary';
import fileUpload from 'express-fileupload';
const { SERVER_IP,PORT }:any = process.env;
config();
class Server{
  private server:Express;
  constructor(){
    this.server = express();
    this.server.use(urlencoded({ extended: true }));
    this.server.use(passport.initialize());
    // this.server.use(fileUpload());
    Routes(this.server);
    this.server.use(errorHandling);
    this.server.listen(PORT,SERVER_IP,()=>{
      console.log('server is start');

    });
  }
}

new Server();