import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ChoiceDto } from './choice.dto';

export enum QuestionType {
  CHOICE = 'choiceAnswer',
  TEXT = 'textAnswer',
}

export class QuestionDto {
  @ApiProperty({ required: true })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @ApiProperty({ required: true })
  @Length(1, 500, { message: '題目標題長度需要小於 500' })
  @IsString({ message: '題目型態錯誤' })
  @IsNotEmpty({ message: '題目不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @Length(0, 500, { message: '題目備註長度需要小於 500' })
  @IsString({ message: '題目型態錯誤' })
  description: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '單元錯誤' })
  @IsNotEmpty({ message: '題目必須關聯單元' })
  unitId: string;

  @ApiProperty({ required: false })
  @ValidateIf(question => question.tagId !== '')
  @IsUUID('all', { message: '標籤錯誤' })
  @IsOptional()
  tagId: string;

  @ApiProperty({ required: false })
  @ValidateIf(question => question.type === QuestionType.CHOICE)
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  choices: ChoiceDto[];
}
