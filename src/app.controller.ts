import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { TestException } from './exceptions-handler/test.exception';
import { TestExceptionFilter } from './exceptions-handler/test.exception-filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get("exception")
  @UseFilters(TestExceptionFilter)
  exceptionFilterExample() {
    throw new TestException();
  }
}
