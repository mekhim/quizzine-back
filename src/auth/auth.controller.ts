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

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<LoginResponseInterface> {
    return this._authService.login(loginDto.username, loginDto.password).pipe(
      map((jwt: string) => {
        return {
          acces_token: jwt,
          token_type: 'JWT',
          expires_in: 3000,
        };
      }),
    );
  }
}
