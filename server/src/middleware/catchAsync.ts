import { Response, Request, NextFunction } from 'express';

export const catchAsync = (func: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next).catch(next));
  }
}

// export function asyncWrapper(asyncRouteHandler: any) {
//   // this is what will be called by express.js
//   return function routeHandler(req: Request, res: Response, next: NextFunction) {
//     // because it's an async function it will always return a promise
//     // – just call it with express' callback parameters
//     return (
//       asyncRouteHandler(req, res, next)
//         // catch any error that might happen in our async function
//         .catch(next)
//     );
//   };
// }

// const asyncWrapper = fn => (...args) => fn(...args).catch(args[2]);
