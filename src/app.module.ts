import { Logger, Module } from '@nestjs/common';
import { QuestionsController } from './questions/questions.controller';
import { TagsController } from './tags/tags.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsDao } from './questions/dao/questions.dao';
import { UsersModule } from './users/users.module';
import { TagsService } from './tags/tags.service';
import { TagsModule } from './tags/tags.module';
import { QuizzesController } from './quizzes/quizzes.controller';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';
import * as Config from 'config';
import { AuthService } from './auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guards';

@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    TagsModule,
    AuthModule,
    QuizzesModule,
  ],
  providers: [Logger],
})
export class AppModule {}
