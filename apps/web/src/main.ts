import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import secureSession from 'fastify-secure-session';
import {join} from 'path';
import {AppModule} from './app.module';
import {Logger} from "@app/core/logging/logger.service";

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: logger
    }
  );
  app.useStaticAssets({
    root: join(__dirname, '../../..', 'apps/web/static'),
    prefix: '/static/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '../../..', 'apps/web/views'),
  });
  await app.register(secureSession, {
    secret: 'verylogphebiggerthanthirtytwocarashars',
    salt: 'BVDbspDmq9RhDx6n',
  });

  await app.listen(14041, (error, address) => {
    if (error) {
      logger.log(error)
    }
    logger.log(`Application is running on: ${address}`);
  });
}

bootstrap();

