import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  catchError,
  defaultIfEmpty,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { UsersDao } from './dao/users.dao';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Stats } from './users.types';

@Injectable()
export class UsersService {
  /**
   * Class constructor
   *
   * @param {UsersDao} _usersDao instance of DAO
   */
  constructor(private readonly _usersDao: UsersDao) {}

  /**
   * Returns all existing user in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll = (): Observable<UserEntity[] | void> =>
    this._usersDao.find().pipe(
      filter((_: User[]) => !!_),
      map((_: User[]) => _.map((__: User) => new UserEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findOne = (id: string): Observable<UserEntity> =>
    this._usersDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if user already exists and add it in user list
   * @param user to create
   * @returns {Observable<UserEntity>}
   */
  create = (user: CreateUserDto): Observable<UserEntity> =>
    this._addUser(user).pipe(
      mergeMap((_: CreateUserDto) => this._usersDao.save(_)),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `User with username'${user.username}' and email '${user.email}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: User) => new UserEntity(_)),
    );

  /**
   * Update a user in user list
   * @param {string} id of the user to update
   * @param user data to update
   *
   * @returns {Observable<UserEntity>}
   */
  update = (id: string, user: UpdateUserDto): Observable<UserEntity> =>
    this._usersDao.findByIdAndUpdate(id, user).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `User with username'${user.username}' and email '${user.email}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Deletes one user in people list
   *
   * @param {string} id of the user to delete
   *
   * @returns {Observable<void>}
   */

  delete = (id: string): Observable<void> =>
    this._usersDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Add user with good data in user list
   *
   * @param user to add
   *
   * @returns {Observable<CreateUserDto>}
   *
   * @private
   */
  private _addUser = (user: CreateUserDto): Observable<CreateUserDto> =>
    of({
      ...user,
      image: 'https://randomuser.me/api/portraits/lego/6.jpg',
      stats: this._defaultStats(),
      isAdmin: false,
    });

  /**
   * Function to create default stats
   *
   * @returns {Stats}
   *
   * @private
   */
  private _defaultStats = (): Stats => {
    const stats = {
      exp: 0,
      goodAnswers: 0,
      totalAnswers: 0,
    };
    return stats;
  };
}
