import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Observable, map } from 'rxjs';
import { LoginResponseInterface } from './dto/login-response.interface';
import { JwtAuthGuard } from './jwt-auth.guards';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { CreateQuestionDto } from '../questions/dto/create-question.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiOkResponse({
    description: 'Returns the token for the given username/password',
  })
  @ApiNotFoundResponse({
    description: "User with the username doesn't exist in the database",
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<LoginResponseInterface> {
    return this._authService.login(loginDto.username, loginDto.password).pipe(
      map((resp: LoginResponseInterface) => {
        return resp;
      }),
    );
  }

  @ApiOkResponse({
    description: 'Returns the token for the given created user',
  })
  @ApiConflictResponse({
    description: 'The user already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post('register')
  register(@Body() create: CreateUserDto): Observable<LoginResponseInterface> {
    return this._authService.register(create).pipe(
      map((resp: LoginResponseInterface) => {
        return resp;
      }),
    );
  }
}
