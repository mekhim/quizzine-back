import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { QuestionEntity } from './entities/question.entity';
import {
  catchError,
  defaultIfEmpty,
  filter,
  finalize,
  map,
  mergeMap,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { QuestionsDao } from './dao/questions.dao';
import { Question as Q } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { TagsService } from '../tags/tags.service';
import { CreateTagDto } from '../tags/dto/create-tag.dto';
import { Error } from 'mongoose';
import { TagEntity } from '../tags/entities/tag.entity';
@Injectable()
export class QuestionsService {
  constructor(
    private readonly _questionsDao: QuestionsDao,
    private readonly _tagsSercice: TagsService,
  ) {}

  /**
   * return all the existing questions in the database
   * @returns {Observable<QuestionEntity[] | void>}
   */
  findAll = (): Observable<QuestionEntity[] | void> =>
    this._questionsDao.findAll().pipe(
      filter((_: Q[]) => !!_),
      map((_: Q[]) => _.map((__: Q) => new QuestionEntity(__))),
      defaultIfEmpty(undefined),
    );

  findManyByTags = (tags: string[]): Observable<QuestionEntity[] | void> =>
    this._questionsDao.findManyByTags(tags).pipe(
      filter((_: Q[]) => !!_),
      map((_: Q[]) => _.map((__: Q) => new QuestionEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Return a question of the database matching id in parameter
   * @param {string } id of the question
   * @return {Observable<QuestionEntity>}
   */
  findOne = (id: string): Observable<QuestionEntity> =>
    this._questionsDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Q) =>
        !!_
          ? of(new QuestionEntity(_))
          : throwError(
              () => new NotFoundException(`Question with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if question already exists and add it in the data base
   * @param question to create
   * @returns {Observable<QuestionEntity>}
   */
  create = (question: CreateQuestionDto): Observable<QuestionEntity> =>
    this._addDateQuestion(question).pipe(
      mergeMap((_: CreateQuestionDto) => this._questionsDao.save(_)),
      catchError((e) =>
        e.code === 11000
          ? throwError(new ConflictException())
          : throwError(new UnprocessableEntityException()),
      ),
      map((_: Q) => new QuestionEntity(_)),
      mergeMap((_: QuestionEntity) => this._createTagsQuestion(_)),
    );

  /**
   * Update a question in the data base
   * @param {string} id of the question to update
   * @param question data to update
   * @returns {Observable<QuestionEntity>}
   */
  update = (
    id: string,
    question: UpdateQuestionDto,
  ): Observable<QuestionEntity> =>
    this._addDateQuestion(question).pipe(
      mergeMap((_: CreateQuestionDto) =>
        this._questionsDao.findByIdAndUpdate(id, _),
      ),
      catchError((e) =>
        e.code === 11000
          ? throwError(new ConflictException())
          : throwError(new UnprocessableEntityException()),
      ),
      mergeMap((_: Q) =>
        !!_
          ? of(new QuestionEntity(_))
          : throwError(
              () => new NotFoundException(`Question with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Deletes one question in the data base
   * @param {string} id of the question to delete
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._questionsDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Q) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Question with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Add the current date to a question
   * @param question which will receive the current date
   * @return {Observable<CreateQuestionDto>}
   * @private
   */
  private _addDateQuestion = (
    question: CreateQuestionDto,
  ): Observable<CreateQuestionDto> =>
    of({
      ...question,
      date: new Date().getTime(),
    });

  /**
   * add tags of the question that are not already in the db
   * @param question whose tags are added in the database
   */
  private _createTagsQuestion = (
    question: QuestionEntity,
  ): Observable<QuestionEntity> =>
    of(question).pipe(
      map((_: QuestionEntity) =>
        _.tags.map((__: string) =>
          this._tagsSercice.create(new CreateTagDto(__)).subscribe(),
        ),
      ),
      map(() => question),
    );

  /**
   * Function to parse date and return timestamp
   * @param {string} date to parse
   * @returns {number} timestamp
   * @private
   */
  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
