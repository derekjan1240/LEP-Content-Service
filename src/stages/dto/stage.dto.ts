import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Stage } from 'src/database/entities/stage.entity';
import { Grade } from 'src/database/entities/grade.entity';

export class StageDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 10, { message: '階級長度需要小於十' })
  @IsString({ message: '階級型態錯誤' })
  @IsNotEmpty({ message: '階級不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  grades: Grade[];

  public static from(dto: Partial<StageDto>) {
    const it = new StageDto();
    it.id = dto.id;
    it.title = dto.title;
    it.grades = dto.grades;
    return it;
  }

  public static fromEntity(entity: Stage) {
    return this.from({
      id: entity.id,
      title: entity.title,
      grades: entity.grades,
      // grades: entity.grades.sort(
      //   (a, b) => a.createDateTime.getTime() - b.createDateTime.getTime(),
      // ),
    });
  }

  public toEntity(user: any = null) {
    const it = new Stage();
    it.title = this.title;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
