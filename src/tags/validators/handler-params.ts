import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsNotEmpty()
  name: string;
}
