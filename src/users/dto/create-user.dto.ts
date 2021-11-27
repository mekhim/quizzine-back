import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'michel.berger@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ name: 'username', description: 'Username', example: 'Michel' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'P4s$WoRd!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
