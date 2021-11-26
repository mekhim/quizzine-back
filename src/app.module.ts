import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsController } from './questions/questions.controller';
import { TagsController } from './tags/tags.controller';
import { QuestionsService } from './questions/questions.service';

@Module({
  imports: [],
  controllers: [AppController, QuestionsController, TagsController],
  providers: [AppService, QuestionsService],
})
export class AppModule {}
