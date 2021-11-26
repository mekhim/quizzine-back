import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ name: 'email', description: 'Email', example: 'michel.berger@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty( { name: 'username', description: 'Username', example: 'Michel'})
  @IsString()
  @IsNotEmpty()
  username: string;
}