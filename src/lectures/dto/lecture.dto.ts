import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsInt,
  Length,
  Min,
  Max,
} from 'class-validator';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Subject } from 'src/database/entities/subject.entity';
import { Unit } from 'src/database/entities/unit.entity';

export class LectureDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsInt()
  @Min(0)
  @Max(100)
  order: number;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '章節長度需要小於五十' })
  @IsString({ message: '章節型態錯誤' })
  @IsNotEmpty({ message: '章節不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  subject: Subject;

  @ApiProperty({ required: false })
  @IsOptional()
  units: Unit[];

  public static from(dto: Partial<LectureDto>) {
    const it = new LectureDto();
    it.id = dto.id;
    it.order = dto.order;
    it.title = dto.title;
    it.subject = dto.subject;
    it.units = dto.units;
    return it;
  }

  public static fromEntity(entity: Lecture) {
    return this.from({
      id: entity.id,
      order: entity.order,
      title: entity.title,
      subject: entity.subject,
      units: entity.units,
    });
  }

  public toEntity(user: any = null) {
    const it = new Lecture();
    it.title = this.title;
    it.subject = this.subject;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
