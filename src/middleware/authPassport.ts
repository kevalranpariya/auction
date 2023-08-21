import { config } from 'dotenv';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User from '../models/User';
import { Request } from 'express';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import { notFoundMessage } from '../utils/messages';
config();

interface UserInterface{
    id: number,
    username: string,
    role: string,
    email: string
}

const { SECRET } = process.env;
passport.use('userAuth',new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  passReqToCallback: true
},async(req:Request,user:UserInterface,done:VerifiedCallback)=>{
  try {
    const { id } = user;
    const findUser = await User.findByPk(id,{ attributes: [ 'id','username','email','role','token' ] });
    const token = findUser?.token;
    const bearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (bearerToken == token) {
      return done(null, findUser ?? false);
    }
    else {
      throw new errHelper(errorTypes.unauthorized, notFoundMessage('Token'));
    }
  } catch (err) {
    done(err,false);
  }
}));

export default passport;