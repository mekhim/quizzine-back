import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty( {
    name: 'image',
    description: "Tag's image",
    example: 'https://randomfruit.me/portraits/apple/55.jpg',
  })
  image: string;
}
