import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddStatsUserDto {
  @ApiProperty({
    name: 'exp',
    description: 'Experience to add to the user stats',
    example: '200',
  })
  @IsString()
  @IsNotEmpty()
  exp: number;

  @ApiProperty({
    name: 'goodAnswers',
    description: 'number of good answers to add to the user stats',
    example: '6',
  })
  @IsString()
  @IsNotEmpty()
  goodAnswers: number;

  @ApiProperty({
    name: 'totalAnswers',
    description: 'number of answers to add to the user stats',
    example: '10',
  })
  @IsString()
  @IsNotEmpty()
  totalAnswers: number;
}
