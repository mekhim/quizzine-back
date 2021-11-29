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
import { AuthModule } from './auth/auth.module';
import * as Config from 'config';
import { AppController } from './app.controller';

@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    TagsModule,
    AuthModule,
  ],
  providers: [Logger],
  controllers: [AppController],
})
export class AppModule {}
