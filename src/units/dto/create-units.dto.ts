import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, Length } from 'class-validator';
import { Lectures } from 'src/database/entities/lectures.entity';
import { Units } from 'src/database/entities/units.entity';

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

  public static fromEntity(entity: Units) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(lecture: Lectures = null, user: any = null) {
    const it = new Units();
    it.title = this.title;
    it.lecture = lecture;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
