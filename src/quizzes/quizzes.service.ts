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
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { QuestionEntity } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';
import { Question } from './quizzes-types';
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
        !!_ && _.length > 0
          ? this.shuffle(this.shuffleAnswers(_)).slice(0, quizSize)
          : [],
      ),
      defaultIfEmpty(undefined),
    );

  submitQuiz = (
    questions: Question[],
    userId: string,
  ): Observable<number[]> => {
    return of(questions).pipe(
      map((questions: Question[]) =>
        questions.map((question: Question) =>
          this._questionsService
            .findOne(question.questionId)
            .pipe(
              map((questionFound: QuestionEntity) =>
                !!questionFound && questionFound.answers[0] === question.answer
                  ? 1
                  : 0,
              ),
            ),
        ),
      ),
      switchMap((_) => combineLatest(_)),
    );
  };

  shuffleAnswers(question: QuestionEntity[]) {
    question.map((_: QuestionEntity) => (_.answers = this.shuffle(_.answers)));
    return question;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
