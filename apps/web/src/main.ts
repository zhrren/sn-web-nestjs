import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import secureSession from 'fastify-secure-session';
import {join} from 'path';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
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

  await app.listen(14041, () => {
    console.log('http://127.0.0.1:14041')
  });
}

bootstrap();

