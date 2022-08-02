import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request, request, Response, response } from 'express';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { DurationInterceptor } from './interceptors/duration.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const corsOption = {
    origin: ['http://localhost:4200'],
  };
  dotenv.config();
  app.enableCors(corsOption);
  app.use(morgan('dev'));
  app.use((req: Request, res: Response, next) => {
    console.log('le middelware dans main');
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new DurationInterceptor());
  await app.listen(PORT);
}
bootstrap();
