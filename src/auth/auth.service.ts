import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this._usersService
      .findOneByUsername(username)
      .toPromise();
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
