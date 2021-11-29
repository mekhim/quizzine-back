import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Question } from '../quizzes-types';

export class HandlerParamsQuiz {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  questions: Question[];
}
