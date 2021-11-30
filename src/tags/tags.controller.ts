import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TagsService } from './tags.service';
import { TagEntity } from './entities/tag.entity';
import { HandlerParams } from './validators/handler-params';
import { QuestionEntity } from '../questions/entities/question.entity';
import { UpdateQuestionDto } from '../questions/dto/update-question.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateQuestionDto } from '../questions/dto/create-question.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';

@ApiTags('tags')
@Controller('tags')
@UseInterceptors(HttpInterceptor)
export class TagsController {
  constructor(private readonly _tagsService: TagsService) {}
  /**
   * Handler to answer to GET /tags route
   * @returns Observable<TagEntity[]>
   */
  @ApiOkResponse({
    description: 'Returns all the tags',
    type: TagEntity,
  })
  @ApiNotFoundResponse({
    description: 'No tags in the database',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Observable<TagEntity[] | void> {
    return this._tagsService.findAll();
  }

  /**
   * Handler to answer to GET /tags/:name route
   *
   * @param {HandlerParams} params list of route params to take tag name
   *
   * @returns Observable<TagEntity>
   */
  @ApiOkResponse({
    description: 'Returns the tag for the given name',
    type: TagEntity,
  })
  @ApiNotFoundResponse({
    description: "Tag with the given name doesn't exist in the database",
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'name',
    description: 'Unique identifier of the tag in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':name')
  @UseGuards(JwtAuthGuard)
  findOne(@Param() params: HandlerParams): Observable<TagEntity> {
    return this._tagsService.findOne(params.name);
  }
  /*
  @Post()
  create(@Body() createTagDto: CreateTagDto): Observable<TagEntity> {
    return this._tagsService.create(createTagDto);
  }
*/
  /**
   * Handler to answer to PUT /tags/:name route
   *
   * @param {HandlerParams} params list of route params to take tag name
   * @param updateTagDto
   *
   * @returns Observable<TagEntity>
   */
  @ApiOkResponse({
    description: 'The tag has been successfully updated',
    type: TagEntity,
  })
  @ApiNotFoundResponse({
    description: 'Tag with the given "name" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The tag already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'name',
    description: 'Unique identifier of the tag in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({
    description: 'Payload to update a tag',
    type: UpdateTagDto,
  })
  @Put(':name')
  @UseGuards(JwtAuthGuard)
  update(
    @Param() params: HandlerParams,
    @Body() updateTagDto: UpdateTagDto,
  ): Observable<TagEntity> {
    return this._tagsService.update(params.name, updateTagDto);
  }

  /**
   * Handler to answer to DELETE /tag/:name route
   *
   * @param {HandlerParams} params list of route params to take tag name
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The tag has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Tag with the given "name" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'name',
    description: 'Unique identifier of the question in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':name')
  @UseGuards(JwtAuthGuard)
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._tagsService.delete(params.name);
  }
}
