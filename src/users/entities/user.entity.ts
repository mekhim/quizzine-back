import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatsEntity } from './user-stats.entity';

@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the databse',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'image',
    description: 'Image URL',
    example: 'https://randomuser.me/portraits/men/55.jpg',
  })
  @Expose()
  @Type(() => String)
  image: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'michel.berger@gmail.com',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({ name: 'username', description: 'Username', example: 'Michel' })
  @Expose()
  @Type(() => String)
  @ApiProperty({ name: 'stats', description: 'Stats' })
  @Expose()
  @Type(() => UserStatsEntity)
  stats: UserStatsEntity;

  @ApiProperty({ name: 'admin', description: 'User: 0 Admin:1', example: '1' })
  @Expose()
  @Type(() => Boolean)
  admin: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
