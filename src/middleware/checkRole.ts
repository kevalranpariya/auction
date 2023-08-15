import { Request, Response, NextFunction } from 'express';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';

export default (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role }:string| any = req.user;
    if (req.user && allowedRoles.includes(role)) {
      return next();
    } else {
      throw new errHelper(errorTypes.forbidden, 'You are not accessible.');
    }
  } catch (err) {
    return next(err);
  }
};