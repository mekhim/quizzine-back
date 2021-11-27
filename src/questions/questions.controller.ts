import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { Observable } from 'rxjs';
import { QuestionEntity } from './entities/question.entity';
import { HandlerParams } from './validators/handler-params';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly _questionsService: QuestionsService) {}

  /**
   * Handler to answer to GET /questions route
   *
   * @param {HandlerParams} params list of route params to take question id
   *
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
}
