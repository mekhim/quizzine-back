import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.types';
import { USERS } from './data/users';
import { find, from, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private _users: User[];

  constructor() {
    this._users = [].concat(USERS).map((user) => ({
      ...user,
    }));
  }

  findAll = (): Observable<UserEntity[] | void> =>
    of(this._users).pipe(
      map((_: User[]) =>
        !!_ && !!_.length ? _.map((__: User) => new UserEntity(__)) : undefined,
      ),
    );

  findOne = (id: string): Observable<UserEntity> =>
    from(this._users).pipe(
      find((_: User) => _.id === id),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            ),
      ),
    );
}
