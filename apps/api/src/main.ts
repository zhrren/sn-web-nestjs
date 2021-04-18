import {NestFactory} from '@nestjs/core';
import {ApiModule} from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  await app.listen(14042, () => {
    console.log('http://127.0.0.1:14041')
  });
}

bootstrap();
