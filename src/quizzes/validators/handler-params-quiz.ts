import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Question } from '../quizzes-types';
import { ApiProperty } from '@nestjs/swagger';

export class HandlerParamsQuiz {
  @ApiProperty({
    name: 'userId',
    description: "User's id",
    example: '61a7342542c47e5db40c28a2',
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    name: 'questions',
    description: "Array of questions' id and answers",
    example: [
      {
        questionId: '61a7342542c47e5db40c2884',
        answer: 'Bonne',
      },
      {
        questionId: '61a7342542c47e5db40c2885',
        answer: "L'ananas",
      },
    ],
  })
  @IsArray()
  questions: Question[];
}
