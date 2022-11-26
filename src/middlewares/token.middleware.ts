/**
 * a simple middleware, you can use for authentication
 */

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException('Token required', HttpStatus.UNAUTHORIZED);
    }
    const authHeader = req.headers.authorization.trim();
    if (authHeader) {
      try {
        const tokenData = this.jwtService.verify(authHeader, {
          secret: 'your secret key',
        });
        const user = await this.userService.findUserById(tokenData.id);

        if (user) {
          req['user'] = user;
          return next();
        }
        throw new HttpException(
          { message: 'Invalid token' },
          HttpStatus.UNAUTHORIZED,
        );
      } catch (error) {
        throw new HttpException(
          { message: 'Invalid token' },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('Token required', HttpStatus.UNAUTHORIZED);
    }
  }
}
