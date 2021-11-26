import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserStatsDto } from './user-stats.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({
    name: 'email',
    description: 'Email',
    example: 'michel.berger@gmail.com',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional({ name: 'username', description: 'Username', example: 'Michel' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @ApiPropertyOptional({
    name: 'password',
    description: 'Password',
    example: 'P4S$WorD',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @ApiPropertyOptional({ name: 'stats', description: 'Stats' })
  @IsInstance(UserStatsDto)
  @ValidateNested()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => UserStatsDto)
  stats?: string;
}
