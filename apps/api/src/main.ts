import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import {ApiModule} from './api.module';
import {Logger} from "@app/core/logging/logger.service";

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter(),
    {
      logger: logger
    }
  );

  await app.listen(14042, (error, address) => {
    if (error) {
      logger.log(error)
    }
    logger.log(`Application is running on: ${address}`);
  });
}

bootstrap();

