import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { Observable } from 'rxjs';
import { QuestionEntity } from './entities/question.entity';
import { HandlerParams } from './validators/handler-params';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@ApiTags('questions')
@Controller('questions')
@UseInterceptors(HttpInterceptor)
export class QuestionsController {
  constructor(private readonly _questionsService: QuestionsService) {}

  /**
   * Handler to answer to GET /questions route
   * @returns Observable<QuestionEntity[]>
   */
  @ApiOkResponse({
    description: 'Returns all the questions',
    type: QuestionEntity,
  })
  @ApiNotFoundResponse({
    description: 'No questions in the database',
  })
  @Get()
  findAll(): Observable<QuestionEntity[] | void> {
    return this._questionsService.findAll();
  }

  /**
   * Handler to answer to GET /questions/:id route
   *
   * @param {HandlerParams} params list of route params to take question id
   *
   * @returns Observable<QuestionEntity>
   */
  @ApiOkResponse({
    description: 'Returns the question for the given "id"',
    type: QuestionEntity,
  })
  @ApiNotFoundResponse({
    description: 'Question with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the question in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<QuestionEntity> {
    return this._questionsService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /questions route
   *
   *
   * @returns Observable<PersonEntity>
   * @param createQuestionDto
   */
  @ApiCreatedResponse({
    description: 'The question has been successfully created',
    type: QuestionEntity,
  })
  @ApiConflictResponse({
    description: 'The question already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new question',
    type: CreateQuestionDto,
  })
  @Post()
  create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Observable<QuestionEntity> {
    return this._questionsService.create(createQuestionDto);
  }

  /**
   * Handler to answer to PUT /questions/:name route
   *
   * @param {HandlerParams} params list of route params to take tag name
   * @param updateTagDto
   *
   * @returns Observable<QTagEntity>
   */
  @ApiOkResponse({
    description: 'The question has been successfully updated',
    type: QuestionEntity,
  })
  @ApiNotFoundResponse({
    description: 'Question with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The question already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the question in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({
    description: 'Payload to update a question',
    type: UpdateQuestionDto,
  })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Observable<QuestionEntity> {
    return this._questionsService.update(params.id, updateQuestionDto);
  }

  /**
   * Handler to answer to DELETE /questions/:id route
   *
   * @param {HandlerParams} params list of route params to take question id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The question has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Question with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the question in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._questionsService.delete(params.id);
  }
}
