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
import { FaneModule } from './fane/fane.module';
import { TradeModule } from './trade/trade.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
dotenv.config();

@Module({
  imports: [
    TodoModule,
    FaneModule,
    TradeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
    }),
  ],
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
