import { Request, Response } from 'express';

export const logger = (req: Request, res: Response, next) => {
  // console.log('adresse ip => ', req.ip);
  next();
};
