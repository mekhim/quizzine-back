import { IsNotEmpty, IsString } from 'class-validator';

export class HandlerParamsUsername {
  @IsNotEmpty()
  @IsString()
  username: string;
}
