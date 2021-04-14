import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, Length } from 'class-validator';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Unit } from 'src/database/entities/unit.entity';

export class CreateUnitDto {
  @ApiProperty({ required: true })
  @Length(1, 50, { message: '單元長度需要小於十' })
  @IsString({ message: '單元型態錯誤' })
  @IsNotEmpty({ message: '單元不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '章節錯誤' })
  @IsNotEmpty({ message: '單元必須有章節' })
  lectureId: string;

  public static from(dto: Partial<CreateUnitDto>) {
    const it = new CreateUnitDto();
    it.title = dto.title;
    it.lectureId = dto.lectureId;
    return it;
  }

  public static fromEntity(entity: Unit) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(lecture: Lecture = null, user: any = null) {
    const it = new Unit();
    it.title = this.title;
    it.lecture = lecture;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
