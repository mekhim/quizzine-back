import { Injectable, Logger } from '@nestjs/common';
import {
  defaultIfEmpty,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
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

@Injectable()
export class QuizzesService {
  constructor(private readonly _questionsService: QuestionsService) {}
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
    let goodAnswers = 0;
    const totalAnswers = questions.length;

    Logger.log(questions[0].questionId);

    questions.map((_: Question) =>
      this._questionsService
        .findOne(_.questionId)
        .pipe(
          tap((__: QuestionEntity) => Logger.log(__.question)),
          map((__: QuestionEntity) =>
            __.answers[0] === _.answer
              ? Logger.log(++goodAnswers)
              : Logger.log(goodAnswers),
          ),
        )
        .subscribe(() => {
          goodAnswers;
        }),
    );

    Logger.log('allo :' + goodAnswers);

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
