import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { HandlerParams } from './validators/handler-params';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { HandlerParamsUsername } from './validators/handler-params-username';

@ApiTags('users')
@Controller('users')
@UseInterceptors(HttpInterceptor)
export class UsersController {
  /**
   * Class constructor
   * @param _usersService
   */
  constructor(private readonly _usersService: UsersService) {}

  /**
   * Returns all existing users in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  @ApiOkResponse({
    description: 'Returns an array of user',
    type: UserEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No user exists in database' })
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._usersService.findAll();
  }
  /*

  @ApiOkResponse({
    description: 'Returns the user for the given "id"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._usersService.findOne(params.id);
  }
*/
  @Get(':username')
  findOneByName(
    @Param() params: HandlerParamsUsername,
  ): Observable<UserEntity> {
    Logger.log('coucou');
    return this._usersService.findOneByUsername(params.username);
  }

  /**
   * Handler to answer to POST /user route
   *
   * @param createUserDto data to create
   *
   * @returns Observable<UserEntity>
   */

  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: UserEntity,
  })
  @ApiConflictResponse({
    description: 'The user already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new user',
    type: CreateUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this._usersService.create(createUserDto);
  }

  /**
   * Handler to answer to PUT /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   * @param updateUserDto data to update
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'The user has been successfully updated',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The user already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a user', type: UpdateUserDto })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateUserDto,
  ): Observable<UserEntity> {
    return this._usersService.update(params.id, updateUserDto);
  }

  /**
   * Handler to answer to DELETE /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._usersService.delete(params.id);
  }
}
