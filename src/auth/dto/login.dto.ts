import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    name: 'username',
    description: "User's name ",
    example: 'Michel',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: 'password',
    description: "User's password ",
    example: 'berger',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
