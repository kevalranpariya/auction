import { Request, Response, NextFunction } from 'express';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import { notAccessMessage } from '../utils/messages';

export default (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role }:string| any = req.user;
    if (req.user && allowedRoles.includes(role)) {
      return next();
    } else {
      throw new errHelper(errorTypes.forbidden, notAccessMessage('URL'));
    }
  } catch (err) {
    return next(err);
  }
};