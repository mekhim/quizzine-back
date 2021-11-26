import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    name: 'question',
    description: 'Question',
    example: 'Comment est votre blanquette ?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    name: 'answers',
    description: 'Array of answers, the first is the right answer',
    example: '["oui","non","pourquoi pas"]',
  })
  @IsString({ each: true })
  answers: string[];

  @ApiProperty({
    name: 'tags',
    description: 'Questions themes',
    example: '["viande","Gastronomie française"]',
  })
  @IsString({ each: true })
  tags: string[];
}
