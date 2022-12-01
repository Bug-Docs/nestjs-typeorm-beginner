import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import adminConfig from './config/admin';
import { UsersModule } from './users/users.module';
import { APILogMiddleware } from './middlewares/log.middleware';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions-handler/global.exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    adminConfig,

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(APILogMiddleware).forRoutes('*');
  }
}
