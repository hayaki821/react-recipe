import {  ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoDto {

  @IsString()
  @ApiProperty({ type: String, example: 'Recipes of good restaurants'  })
  readonly title: string;
}
