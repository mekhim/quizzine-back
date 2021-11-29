import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class SubmittedQuizDto {
  QUIZZES_SIZE = 10;

  @ArrayMinSize(10)
  @ArrayMaxSize(10)
  @IsArray()
  @IsNotEmpty()
  quiz: string[][];
}
