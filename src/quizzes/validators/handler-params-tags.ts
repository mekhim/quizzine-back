import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HandlerParamsTags {
  @IsNotEmpty()
  @ApiProperty()
  tags: string[];

  @IsNotEmpty()
  @IsNumber()
  quizSize: number;
}
