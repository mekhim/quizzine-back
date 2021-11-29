import {
  ConflictException,
  Injectable,
  Logger,
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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly _usersDao: UsersDao) {}

  findAll = (): Observable<UserEntity[] | void> =>
    this._usersDao.find().pipe(
      filter((_: User[]) => !!_),
      map((_: User[]) => _.map((__: User) => new UserEntity(__))),
      defaultIfEmpty(undefined),
    );

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

  findOneByUsername = (username: string): Observable<UserEntity> =>
    this._usersDao.findByUsername(username).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () =>
                new NotFoundException(
                  `User with username '${username}' not found`,
                ),
            ),
      ),
    );

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

  private _addUser = (user: CreateUserDto): Observable<CreateUserDto> =>
    of({
      ...user,
      image: 'https://randomuser.me/api/portraits/lego/6.jpg',
      stats: this._defaultStats(),
      password: bcrypt.hashSync(user.password, 10),
      isAdmin: false,
    });

  private _defaultStats = (): Stats => {
    const stats = {
      exp: 0,
      goodAnswers: 0,
      totalAnswers: 0,
    };
    return stats;
  };
}
