import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TagsDao } from './dao/tags.dao';
import {
  catchError,
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
import { TagEntity } from './entities/tag.entity';
import { Tag as T } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Question as Q } from '../questions/schemas/question.schema';

@Injectable()
export class TagsService {
  constructor(private readonly _tagsDao: TagsDao) {}

  /**
   * return all the existing tags in the database
   * @returns {Observable<TagEntity[] | void>}
   */
  findAll = (): Observable<TagEntity[] | void> =>
    this._tagsDao.findAll().pipe(
      filter((_: T[]) => !!_),
      map((_: T[]) => _.map((__: T) => new TagEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * return all the existing tags in the database
   * @returns {Observable<TagEntity[] | void>}
   */
  findOne = (name: string): Observable<TagEntity> =>
    this._tagsDao.findByName(name).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: T) =>
        !!_
          ? of(new TagEntity(_))
          : throwError(
              () => new NotFoundException(`tag with name '${name}' not found`),
            ),
      ),
    );

  /**
   * Check if tag already exists and add it in the data base
   * @param tag to create
   * @returns {Observable<TagEntity>}
   */
  create = (tag: CreateTagDto): Observable<TagEntity> =>
    this._addTag(tag).pipe(
      mergeMap((_: CreateTagDto) => this._tagsDao.save(_)),
      catchError((e) =>
        e.code === 11000
          ? of(null)
          : throwError(() => new UnprocessableEntityException()),
      ),
      map((_: T) => new TagEntity(_)),
    );

  /**
   * Update a tag in the data base
   * @param {string} name of the tag to update
   * @param tag data to update
   * @returns {Observable<TagEntity>}
   */
  update = (name: string, tag: UpdateTagDto): Observable<TagEntity> =>
    this._tagsDao.findByNameAndUpdate(name, tag).pipe(
      catchError(() => throwError(new UnprocessableEntityException())),
      mergeMap((_: T) =>
        !!_
          ? of(new TagEntity(_))
          : throwError(
              () => new NotFoundException(`Tag with name '${name}' not found`),
            ),
      ),
    );
  /**
   * Add image field  to a new tag
   * @param tag which will receive the image field
   * @return {Observable<CreateTagDto>}
   * @private
   */
  private _addTag = (tag: CreateTagDto): Observable<CreateTagDto> =>
    of({
      ...tag,
      image: 'image/tag/default.png',
    });

  /**
   * Deletes one tag in the data base
   * @param {string} name of the tag to delete
   * @returns {Observable<void>}
   */
  delete = (name: string): Observable<void> =>
    this._tagsDao.findByNameAndRemove(name).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: T) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Tag with name '${name}' not found`),
            ),
      ),
    );
}
