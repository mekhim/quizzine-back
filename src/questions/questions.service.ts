import { Injectable, NotFoundException } from '@nestjs/common';
import { QUESTIONS } from '../data/questions';
import { QuestionEntity } from './entities/question.entity';
import { find, from, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { Question } from './questions.type';

@Injectable()
export class QuestionsService {
  private _questions: Question[];

  constructor() {
    this._questions = [].concat(QUESTIONS).map((question) => ({
      ...question,
      date: this._parseDate(question.date),
    }));
  }

  findAll = (): Observable<QuestionEntity[] | void> =>
    of(this._questions).pipe(
      map((_: Question[]) =>
        !!_ && !!_.length
          ? _.map((__: Question) => new QuestionEntity(__))
          : undefined,
      ),
    );

  findOne = (id: string): Observable<QuestionEntity> =>
    from(this._questions).pipe(
      find((_: Question) => _.id === id),
      mergeMap((_: Question) =>
        !!_
          ? of(new QuestionEntity(_))
          : throwError(
              () => new NotFoundException(`Question with id '${id}' not found`),
            ),
      ),
    );
  /**
   * Function to parse date and return timestamp
   *
   * @param {string} date to parse
   *
   * @returns {number} timestamp
   *
   * @private
   */
  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
