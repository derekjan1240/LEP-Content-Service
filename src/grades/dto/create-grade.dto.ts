import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';
import { Subject } from 'src/database/entities/subject.entity';
import { Grade } from 'src/database/entities/grade.entity';
import { Stage } from 'src/database/entities/stage.entity';

export class CreateGradeDto {
  @ApiProperty({ required: true })
  @Length(1, 10, { message: '年級長度需要小於十' })
  @IsString({ message: '年級型態錯誤' })
  @IsNotEmpty({ message: '年級不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '階級錯誤' })
  @IsNotEmpty({ message: '年級必須有階級' })
  stageId: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '科目錯誤', each: true })
  @IsOptional()
  subjectIds: string[];

  public static from(dto: Partial<CreateGradeDto>) {
    const it = new CreateGradeDto();
    it.title = dto.title;
    it.stageId = dto.stageId;
    return it;
  }

  public static fromEntity(entity: Grade) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(stage: Stage = null, subjects: Subject[], user: any = null) {
    const it = new Grade();
    it.title = this.title;
    it.stage = stage;
    it.subjects = subjects;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
