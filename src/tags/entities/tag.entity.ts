import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
@Exclude()
export class TagEntity{

  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'name', description: 'Unique name in the database', example: 'fruit' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({ name: 'image', description: 'Tag\'s image', example: 'https://randomfruit.me/portraits/apple/55.jpg' })
  @Expose()
  @Type(() => String)
  image: string;


}
