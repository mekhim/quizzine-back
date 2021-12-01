import { Injectable, Logger } from '@nestjs/common';
import {
  async,
  combineLatest,
  defaultIfEmpty,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
  pipe,
  reduce,
  tap,
  throwError,
} from 'rxjs';
import { QuestionEntity } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';
import { SubmittedQuizDto } from './dto/submitted-quiz.dto';
import { UserStatsDto } from '../users/dto/user-stats.dto';
import any = jasmine.any;
import { Question } from './quizzes-types';
import { UserStatsEntity } from '../users/entities/user-stats.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly _questionsService: QuestionsService,
    private readonly _UserService: UsersService,
  ) {}
  /**
   * return all the existing questions in the database
   * @returns {Observable<QuestionEntity[] | void>}
   */
  findQuiz = (
    quizSize: number,
    tags: string[],
  ): Observable<QuestionEntity[] | void> =>
    this._questionsService.findManyByTags(tags).pipe(
      map((_: QuestionEntity[]) =>
        !!_ && _.length > 0 ? this.shuffle(_).slice(0, quizSize) : [],
      ),
      defaultIfEmpty(undefined),
    );

  submitQuiz(
    questions: Question[],
    userId: string,
  ): { totalAnswers: number; goodAnswers: number; exp: number } {
    const exp = 0;
    const goodAnswers = 0;
    const totalAnswers = questions.length;

    /*

    questions.map((question: Question) =>
      this._questionsService
        .findOne(question.questionId)
        .pipe(
          map((questionFound: QuestionEntity) =>
            !!questionFound && questionFound.answers[0] === question.answer
              ? 1
              : 0,
          ),
        )
        .subscribe((a) => (goodAnswers += a)),
    );
    */

    return { totalAnswers: totalAnswers, goodAnswers: goodAnswers, exp: exp };
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
