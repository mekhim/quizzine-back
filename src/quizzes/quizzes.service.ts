import { Injectable, Logger } from '@nestjs/common';
import { defaultIfEmpty, filter, from, map, Observable, of, tap } from 'rxjs';
import { QuestionEntity } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';
import { SubmittedQuizDto } from './dto/submitted-quiz.dto';
import { UserStatsDto } from '../users/dto/user-stats.dto';

@Injectable()
export class QuizzesService {
  QUIZZES_SIZE = 10;

  constructor(private readonly _questionsService: QuestionsService) {}
  /**
   * return all the existing questions in the database
   * @returns {Observable<QuestionEntity[] | void>}
   */
  findQuiz = (tags: string[]): Observable<QuestionEntity[] | void> =>
    this._questionsService.findManeByTags(tags).pipe(
      map((_: QuestionEntity[]) =>
        !!_ && _.length >= this.QUIZZES_SIZE
          ? this.shuffle(_).slice(0, this.QUIZZES_SIZE)
          : [],
      ),
      defaultIfEmpty(undefined),
    );
  /*
  submitQuiz = (quiz : SubmittedQuizDto): Observable<UserStatsDto> =>
    of(quiz.quiz).pipe(
      map( (_:string[][]) => _.)
    )
 */

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
