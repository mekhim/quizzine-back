import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserStatsEntity {
  @ApiProperty( { name: 'exp', description: 'number of experience', example: '200'})
  @Expose()
  exp: number;

  @ApiProperty( { name: 'goodAnswers', description: 'number of good answers', example: '42'})
  @Expose()
  goodAnswers: number;

  @ApiProperty( { name: 'totalAnswers', description: 'number of total answers', example:"50" })
  @Expose()
  totalAnswers: number;
}
