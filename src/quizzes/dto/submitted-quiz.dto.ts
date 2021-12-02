import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class SubmittedQuizDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    name: 'questions',
    description: "Array of questions' id",
    example: '["61a7342542c47e5db40c2884","61a7342542c47e5db40c289f"]',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty()
  questions: string[];

  @ApiProperty({
    name: 'answers',
    description: 'Array of answers',
    example: '["Bonne","84 ans"]',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty()
  answers: string[];
}
