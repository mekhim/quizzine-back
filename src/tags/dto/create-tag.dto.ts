import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  constructor(name: string) {
    this.name = name;
  }

  @ApiProperty({
    name: 'name',
    description: "Tag's name",
    example: 'fruit',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
