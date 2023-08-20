import { compareSync } from 'bcrypt';
import User from '../models/User';
import errHelper from './errorHelper';
import errorTypes from './errorTypes';
import { generateToken } from '../config/authGenerates';

export default async (data:any)=>{
  const { email, password } = data;
  const checkVerify = await User.findOne({
    where: {
      email: email,
      verify: true
    },
    attributes: [ 'verify','password','email','username','role','id' ]
  });
  if(!checkVerify) throw new errHelper(errorTypes.forbidden,'You can not verify your account');
  const checkPassword = compareSync(password, checkVerify.password);
  if(!checkPassword) throw new errHelper(errorTypes.not_found, 'Password not match!!!');
  const { id,username,role } = checkVerify;
  checkVerify.token = await generateToken({ id,username,role,email });
  return (await checkVerify.save()).token;
};