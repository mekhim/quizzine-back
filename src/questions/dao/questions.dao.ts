import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@Injectable()
export class QuestionsDao {
  constructor(
    @InjectModel(Question.name)
    private readonly _questionModel: Model<QuestionDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns QuestionModel[] or undefined
   * @return {Observable<Question[] | void>}
   */
  findAll = (): Observable<Question[] | void> =>
    from(this._questionModel.find({})).pipe(
      filter((docs: QuestionDocument[]) => !!docs && docs.length > 0),
      map((docs: QuestionDocument[]) =>
        docs.map((_: QuestionDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one question of the data base matching id in parameter
   * @param {string} id of the question in the data base
   * @return {Observable<Question | void>}
   */
  findById = (id: string): Observable<Question | void> =>
    from(this._questionModel.findById(id)).pipe(
      filter((doc: QuestionDocument) => !!doc),
      map((doc: QuestionDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if question already exists with index and add it to the db
   * @param {CreateQuestionDto} question to create
   * @return {Observable<Question>}
   */
  save = (question: CreateQuestionDto): Observable<Question> =>
    from(new this._questionModel(question).save()).pipe(
      map((doc: QuestionDocument) => doc.toJSON()),
    );

  /**
   * Update a question in the db
   * @param {string} id
   * @param {UpdateQuestionDto} question
   * @return {Observable<Question | void>}
   */
  findByIdAndUpdate = (
    id: string,
    question: UpdateQuestionDto,
  ): Observable<Question | void> =>
    from(
      this._questionModel.findByIdAndUpdate(id, question, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: QuestionDocument) => !!doc),
      map((doc: QuestionDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete a question in the db
   * @param {string} id
   * @return {Observable<Question | void>}
   */
  findByIdAndRemove = (id: string): Observable<Question | void> =>
    from(this._questionModel.findByIdAndRemove(id)).pipe(
      filter((doc: QuestionDocument) => !!doc),
      map((doc: QuestionDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
