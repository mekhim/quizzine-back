import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  from,
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  switchMap,
} from 'rxjs';
import { matches } from 'class-validator';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponseInterface } from './dto/login-response.interface';

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

  login(
    username: string,
    password: string,
  ): Observable<LoginResponseInterface> {
    return this._usersService.findOneByUsername(username).pipe(
      mergeMap((userFound: UserEntity) => {
        if (userFound) {
          return from(this.comparePasswords(password, userFound.password)).pipe(
            mergeMap((matches: boolean) => {
              if (matches) {
                return this.generateJWT({
                  ...userFound,
                  password: undefined,
                }).pipe(
                  map((jwt: string) => {
                    return {
                      access_token: jwt,
                      token_type: 'JWT',
                      expires_in: 3000,
                      userId: userFound.id,
                    };
                  }),
                );
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

  register(create: CreateUserDto) {
    return this._usersService.create(create).pipe(
      mergeMap((user: UserEntity) => {
        if (user) {
          return this.login(create.username, create.password);
        } else {
          throw new HttpException('User not found', HttpStatus.CONFLICT);
        }
      }),
    );
  }
}
