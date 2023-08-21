import { config } from 'dotenv';
import mailTransport from '../config/email';
import { sign } from 'jsonwebtoken';
config();

const { EMAIL } = process.env;

export default async(data:any)=>{
  const { SECRET }:any = process.env;
  const verifyToken = await sign(data,SECRET,{ expiresIn: '10m' });
  mailTransport.sendMail({
    from: EMAIL,
    to: data.email,
    subject: 'Live Auction',
    text: 'Hello, Verify your auction account',
    html: `<a href='http://192.168.2.35:4600/verifyAccount/${verifyToken}'>Verify Account</a>`
  });
};