import { Module } from '@nestjs/common';
import { QuestionsController } from './questions/questions.controller';
import { TagsController } from './tags/tags.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';
import { QuestionsDao } from './questions/dao/questions.dao';

@Module({
  imports: [
    QuestionsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}
