import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from '@nestjs/common';

import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer
          .apply([LoggerMiddleware])
          .with('firstParam', { second: 'param' })
          .forRoutes( // By route
              { path: '/cats', method: RequestMethod.GET },
              { path: '/cats', method: RequestMethod.POST },
              { path: '/cats/async', method: RequestMethod.GET },
          );
          //.forRoutes(CatsController) // Or by controller
    }
}
