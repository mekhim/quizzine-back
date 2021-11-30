import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from, lastValueFrom, Observable, switchMap } from 'rxjs';
import { matches } from 'class-validator';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await lastValueFrom(
      this._usersService.findOneByUsername(username),
    );

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  generateJWT(user: UserEntity): Observable<string> {
    return from(this._jwtService.signAsync({ user }));
  }

  login(username: string, password: string) {
    return this._usersService.findOneByUsername(username).pipe(
      switchMap((userFound: UserEntity) => {
        if (userFound) {
          return from(this.comparePasswords(password, userFound.password)).pipe(
            switchMap((matches: boolean) => {
              if (matches) {
                return this.generateJWT({ ...userFound, password: undefined });
              } else {
                throw new HttpException(
                  'Login was not successfull',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }
}
