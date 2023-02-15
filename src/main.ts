import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,

  });

  // global middleware and security checkup
  app.disable('x-powered-by');
  app.enableCors();
  app.enableVersioning();
  app.enableShutdownHooks();

  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());

  await app.listen(3000);

}
bootstrap();
