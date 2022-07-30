import { HelmetMiddleware } from '@nest-middlewares/helmet';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middelwares/first.middleware';
import { logger } from './middelwares/logger.middelware';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware, logger)
      .forRoutes(
        {
          path: 'todo',
          method: RequestMethod.GET,
        },
        {
          path: 'todo*',
          method: RequestMethod.DELETE,
        },
      )
      .apply(logger)
      .forRoutes('')
      .apply(HelmetMiddleware)
      .forRoutes('');
  }
}
