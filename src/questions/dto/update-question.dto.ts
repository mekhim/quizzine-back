import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    name: 'question',
    description: 'Question',
    example: 'Comment est votre blanquette ?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    name: 'answers',
    description: 'Array of answers, the first is the right answer',
    example: '["oui","non","pourquoi pas"]',
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  @IsNotEmpty()
  answers: string[];

  @ApiProperty({
    name: 'tags',
    description: 'Questions themes',
    example: '["viande","Gastronomie française"]',
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @IsNotEmpty()
  tags: string[];
}
