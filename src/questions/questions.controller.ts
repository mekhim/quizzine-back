import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { Observable } from 'rxjs';
import { QuestionEntity } from './entities/question.entity';
import { HandlerParams } from './validators/handler-params';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly _questionsService: QuestionsService) {}

  @Get()
  findAll(): Observable<QuestionEntity[] | void> {
    return this._questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<QuestionEntity> {
    return this._questionsService.findOne(params.id);
  }
}
