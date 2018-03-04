import {
  Middleware,
  NestMiddleware,
  ExpressMiddleware
} from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    console.log('[LoggerMiddleware] Arguments:', args);

    return (req, res, next) => {
      console.log('Request...');
      next();
    };
  }
}

/** DEFFERRED MIDDLEWARE pattern

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  async resolve(...args: any[]): Promise<ExpressMiddleware> {
    await someAsyncFn();
    return async (req, res, next) => {
      await someAsyncFn();
      next();
    };
  }
}

*/

/** FUNCTIONAL MIDDLEWARE pattern
(LoggerMiddleware has no members, no additional methods, no dependencies)

export const loggerMiddleware = (req, res, next) => {
  console.log(`Request...`);
  next();
};

*/
