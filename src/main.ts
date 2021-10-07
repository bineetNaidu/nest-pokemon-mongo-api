import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PORT } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
