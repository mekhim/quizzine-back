import { Logger, Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionsDao } from './dao/questions.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    TagsModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, Logger, QuestionsDao],
})
export class QuestionsModule {}
