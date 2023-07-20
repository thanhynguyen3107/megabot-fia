import {Request, Response, Errback, NextFunction} from 'express';
import {HTTP_STATUS} from '~/common/constant';

interface IMiddleware {
  reqInterceptor: (req: Request, res: Response, next: NextFunction) => void;
  errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => void;
}

const middleware = {} as IMiddleware;

middleware.reqInterceptor = (req, res, next) => {
  next();
};

middleware.errorHandler = (err, req, res, next) => {
  return res.json({
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error: {
      message: err.message
    }
  });
};

export const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default middleware;
