import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, Length } from 'class-validator';
import { Grades } from 'src/database/entities/grades.entity';
import { Stages } from 'src/database/entities/stages.entity';

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

  public static from(dto: Partial<CreateGradeDto>) {
    const it = new CreateGradeDto();
    it.title = dto.title;
    it.stageId = dto.stageId;
    return it;
  }

  public static fromEntity(entity: Grades) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(stage: Stages = null, user: any = null) {
    const it = new Grades();
    it.title = this.title;
    it.stage = stage;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
