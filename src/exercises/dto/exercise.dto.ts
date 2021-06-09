import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Exercise } from 'src/database/entities/exercise.entity';
import { Question } from 'src/database/entities/question.entity';

export class ExerciseDto {
  @ApiProperty({ required: true })
  @IsUUID('all', { message: '習題型態錯誤' })
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '習題標題長度需要小於 50' })
  @IsString({ message: '習題型態錯誤' })
  @IsNotEmpty({ message: '習題不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @Length(0, 500, { message: '習題備註長度需要小於 500' })
  @IsString({ message: '習題型態錯誤' })
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  questions: Question[];

  public static from(dto: Partial<ExerciseDto>) {
    const it = new ExerciseDto();
    it.id = dto.id;
    it.title = dto.title;
    it.description = dto.description;
    it.questions = dto.questions;
    return it;
  }

  public static fromEntity(entity: Exercise, withAnswer: Boolean) {
    return this.from({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      questions: entity.questions.map(question => {
        return {
          ...question,
          choices: question.choices.map(choice => {
            return {
              ...choice,
              isCorrectAnswer: withAnswer ? choice.isCorrectAnswer : null,
            };
          }),
        };
      }),
    });
  }

  public toEntity(user: any = null) {
    const it = new Exercise();
    it.title = this.title;
    it.description = this.description;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
