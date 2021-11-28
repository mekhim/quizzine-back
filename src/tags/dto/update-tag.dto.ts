import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({
    name: 'image',
    description: "Tag's image",
    example: 'https://randomfruit.me/portraits/apple/55.jpg',
  })
  @IsOptional()
  image: string;
}
