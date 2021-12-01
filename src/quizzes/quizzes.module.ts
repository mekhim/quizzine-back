import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuestionsModule } from '../questions/questions.module';
import { QuizzesController } from './quizzes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [QuestionsModule, UsersModule],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
