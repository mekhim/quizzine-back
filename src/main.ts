import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create(AppModule);

  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag('auth')
    .addTag('users')
    .addTag('tags')
    .addTag('quizzes')
    .addTag(swaggerConfig.tag)
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      QuestionsModule,
      UsersModule,
      TagsModule,
      QuizzesModule,
      AuthModule,
    ],
  });

  SwaggerModule.setup('documentation', app, document);

  // enable CORS for NG Application's calls
  await app.enableCors({ origin: config.cors });

  await app.listen(config.port, config.host);
}
bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
