import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TokenMiddleware } from 'src/middlewares/token.middleware';
import { SimpleMiddleware } from 'src/middlewares/simple.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TokenMiddleware).forRoutes(UsersController);
    /*
    // Method- 1
    // if you want to use multiple middleware for every api in this resource

    consumer.apply(TokenMiddleware, SimpleMiddleware).forRoutes(UsersController);

    */
    

    /*
    // Method- 2
    // if you want to use multiple middleware for different routes you can use this

    consumer.apply(TokenMiddleware).exclude(
    {
    path: "/users"
    method: RequestMethod.GET
    }
    ).forRoutes(UsersController)

    consumer.apply(SimpleMiddleware).forRoutes({
    path: "/users",
    method: RequestMethod.GET
    })

    */

  }
}
