import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class QuestionEntity {
  constructor(partial: Partial<QuestionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'question',
    description: 'Question',
    example: 'Comment est votre blanquette ?',
  })
  @Expose()
  @Type(() => String)
  question: string;

  @ApiProperty({
    name: 'answers',
    description: 'Array of answers, the first is the right answer',
    example: '["oui","non","pourquoi pas"]',
  })
  @Expose()
  @Type(() => String)
  answers: string[];

  @ApiProperty({
    name: 'tags',
    description: 'Questions themes',
    example: '["viande","Gastronomie française"]',
  })
  @Expose()
  @Type(() => String)
  tags: string[];

  @ApiProperty({
    name: 'date',
    description: 'Date of last modification/creation',
    example: '101343600000',
  })
  @Expose()
  @Type(() => Number)
  date: number;
}
