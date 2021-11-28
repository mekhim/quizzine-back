import { Logger, Module } from '@nestjs/common';
import { TagsDao } from './dao/tags.dao';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { TagsController } from './tags.controller';
import { CreateTagDto } from './dto/create-tag.dto';

@Module({
  exports: [TagsService],
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagsDao, TagsService, Logger],
})
export class TagsModule {}
