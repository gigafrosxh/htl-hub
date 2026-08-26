import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configuredOrigins = configService.get<string>('CORS_ORIGINS', '');
  const allowedOrigins = configuredOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      const isLocalDevelopmentOrigin =
        origin === undefined ||
        /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
      const isConfiguredOrigin = origin !== undefined && allowedOrigins.includes(origin);

      callback(null, isLocalDevelopmentOrigin || isConfiguredOrigin);
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('HTL Hub API')
    .setDescription('API for the HTL Hub Multi tool')
    .setVersion(configService.getOrThrow<string>('app.version'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();