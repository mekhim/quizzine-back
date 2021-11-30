import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuestionsModule } from '../questions/questions.module';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [QuestionsModule],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
