import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from '../schemas/tag.schema';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, mergeMap, Observable } from 'rxjs';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import {
  Question,
  QuestionDocument,
} from '../../questions/schemas/question.schema';

@Injectable()
export class TagsDao {
  constructor(
    @InjectModel(Tag.name) private readonly _tagModel: Model<TagDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns TagModel[] or undefined
   * @return {Observable<Tag[] | void>}
   */
  findAll = (): Observable<Tag[] | void> =>
    from(this._tagModel.find({})).pipe(
      filter((docs: TagDocument[]) => !!docs && docs.length > 0),
      map((docs: TagDocument[]) => docs.map((_: TagDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one tag of the data base matching name in parameter
   * @param {string} name of the tag in the data base
   * @return {Observable<Tag | void>}
   */
  findByName = (name: string): Observable<Tag | void> =>
    from(this._tagModel.find({ name: name })).pipe(
      filter((doc: TagDocument) => !!doc),
      map((doc: TagDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if tag already exists with name and add it to the db
   * @param {CreateTagDto} tag to create
   * @return {Observable<Tag>}
   */
  save = (tag: CreateTagDto): Observable<Tag | void> =>
    from(new this._tagModel(tag).save()).pipe(
      map((doc: TagDocument) => doc.toJSON()),
    );

  /**
   * Update a tag in the db
   * @param {string} name
   * @param tag
   * @return {Observable<Tag | void>}
   */
  findByNameAndUpdate = (
    name: string,
    tag: UpdateTagDto,
  ): Observable<Tag | void> =>
    from(
      this._tagModel.findOneAndUpdate({ name: name }, tag, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: TagDocument) => !!doc),
      map((doc: TagDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete a tag in the db
   * @param {string} name
   * @return {Observable<Tag | void>}
   */
  findByNameAndRemove = (name: string): Observable<Tag | void> =>
    from(this._tagModel.findOneAndRemove({ name: name })).pipe(
      filter((doc: TagDocument) => !!doc),
      map((doc: TagDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
