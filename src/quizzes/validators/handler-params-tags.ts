import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class HandlerParamsTags {
  @IsNotEmpty()
  @ApiProperty()
  tags: string[];

  @IsInt()
  @Type(() => Number)
  quizSize: number;
}
