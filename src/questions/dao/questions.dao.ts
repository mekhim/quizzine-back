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

  findAll = (): Observable<Question[] | void> =>
    from(this._questionModel.find({})).pipe(
      filter((docs: QuestionDocument[]) => !!docs && docs.length > 0),
      map((docs: QuestionDocument[]) =>
        docs.map((_: QuestionDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  findOne = (id: string): Observable<Question | void> =>
    from(this._questionModel.findById(id)).pipe(
      filter((doc: QuestionDocument) => !!doc),
      map((doc: QuestionDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  save = (question: CreateQuestionDto): Observable<Question> =>
    from(new this._questionModel(question).save()).pipe(
      map((doc: QuestionDocument) => doc.toJSON()),
    );

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

  findByIdAndRemove = (id: string): Observable<Question | void> =>
    from(this._questionModel.findByIdAndRemove(id)).pipe(
      filter((doc: QuestionDocument) => !!doc),
      map((doc: QuestionDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
