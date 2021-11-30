import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionEntity } from '../questions/entities/question.entity';
import { Observable } from 'rxjs';
import { QuizzesService } from './quizzes.service';
import { HandlerParamsTags } from './validators/handler-params-tags';
import { SubmittedQuizDto } from './dto/submitted-quiz.dto';
import { HandlerParamsQuiz } from './validators/handler-params-quiz';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly _quizzesService: QuizzesService) {}
  /**
   * Handler to answer to GET /quiz/:tags route
   *
   * @param {HandlerParamsTags} params list of route params to take quiz tags
   *
   * @returns Observable<QuestionEntity[]>
   */
  @ApiOkResponse({
    description: 'Returns a quiz for the given tags',
    type: [QuestionEntity],
  })
  @ApiNotFoundResponse({
    description:
      'There is not enough question with theses tags in the database to create a quiz',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiQuery({
    name: 'tags',
    description:
      'Tags of the question in the database. Minimum 1 tag and maximum 3 tags',
    type: [String],
    allowEmptyValue: false,
  })
  @Get()
  getQuiz(
    @Query() params: HandlerParamsTags,
  ): Observable<QuestionEntity[] | void> {
    return this._quizzesService.findQuiz(
      params.quizSize,
      Array.isArray(params.tags) && params.tags.length > 3
        ? params.tags.slice(0, 2)
        : params.tags,
    );
  }

  @Post()
  submitQuiz(@Body() handlerParamsQuiz: HandlerParamsQuiz): {
    totalAnswers: number;
    goodAnswers: number;
    exp: number;
  } {
    return this._quizzesService.submitQuiz(
      handlerParamsQuiz.questions,
      handlerParamsQuiz.userId,
    );
  }
}
