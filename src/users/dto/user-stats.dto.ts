import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserStatsDto {
  @ApiProperty({
    name: 'exp',
    description: 'Experience',
    example: '200',
  })
  @IsString()
  @IsNotEmpty()
  exp: number;

  @ApiProperty({
    name: 'goodAnswers',
    description: 'number of good answers',
    example: '1000',
  })
  @IsString()
  @IsNotEmpty()
  goodAnswers: number;

  @ApiProperty({
    name: 'totalAnswers',
    description: 'number of answers',
    example: '2000',
  })
  @IsString()
  @IsNotEmpty()
  totalAnswers: number;
}
