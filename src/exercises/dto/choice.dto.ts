import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, Length } from 'class-validator';

export class ChoiceDto {
  @ApiProperty({ required: true })
  @Length(1, 500, { message: '選項長度需要小於 500' })
  @IsString({ message: '選項型態錯誤' })
  @IsNotEmpty({ message: '選項不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @IsBoolean({ message: '選項型態錯誤' })
  @IsNotEmpty({ message: '是否為答案不得為空' })
  isCorrectAnswer: boolean;
}
