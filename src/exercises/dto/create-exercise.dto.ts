import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Exercise } from 'src/database/entities/exercise.entity';
import { Question } from 'src/database/entities/question.entity';
import { QuestionDto } from './question.dto';

export class CreateExerciseDto {
  @ApiProperty({ required: true })
  @Length(1, 50, { message: '習題標題長度需要小於 50' })
  @IsString({ message: '習題型態錯誤' })
  @IsNotEmpty({ message: '習題不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @Length(0, 500, { message: '習題備註長度需要小於 500' })
  @IsString({ message: '習題型態錯誤' })
  description: string;

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  public static from(dto: Partial<CreateExerciseDto>) {
    const it = new CreateExerciseDto();
    it.title = dto.title;
    it.description = dto.description;
    it.questions = dto.questions;
    return it;
  }

  public static fromEntity(entity: Exercise) {
    return this.from({
      title: entity.title,
      description: entity.description,
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
