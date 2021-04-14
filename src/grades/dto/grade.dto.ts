import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Grade } from 'src/database/entities/grade.entity';
import { Stage } from 'src/database/entities/stage.entity';
import { Subject } from 'src/database/entities/subject.entity';

export class GradeDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 10, { message: '年級長度需要小於十' })
  @IsString({ message: '年級型態錯誤' })
  @IsNotEmpty({ message: '年級不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  stage: Stage;

  @ApiProperty({ required: false })
  @IsOptional()
  subjects: Subject[];

  public static from(dto: Partial<GradeDto>) {
    const it = new GradeDto();
    it.id = dto.id;
    it.title = dto.title;
    it.stage = dto.stage;
    it.subjects = dto.subjects;
    return it;
  }

  public static fromEntity(entity: Grade) {
    return this.from({
      id: entity.id,
      title: entity.title,
      stage: entity.stage,
      subjects: entity.subjects,
    });
  }

  public toEntity(user: any = null) {
    const it = new Grade();
    it.title = this.title;
    it.stage = this.stage;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
