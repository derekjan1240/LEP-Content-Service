import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Unit } from 'src/database/entities/unit.entity';

export class CreateUnitDto {
  @ApiProperty({ required: true })
  @IsInt({ message: '單元權重型態錯誤' })
  @Min(0)
  @Max(100)
  @IsNotEmpty({ message: '單元權重不得為空' })
  order: number;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '單元長度需要小於 10' })
  @IsString({ message: '單元型態錯誤' })
  @IsNotEmpty({ message: '單元不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @Length(1, 100, { message: 'Youtube ID 長度需要小於 100' })
  @IsString({ message: 'Youtube ID 型態錯誤' })
  @IsNotEmpty({ message: 'Youtube ID 不得為空' })
  youtubeId: string;

  @ApiProperty({ required: true })
  @Length(1, 1000, { message: '敘述長度需要小於 1000' })
  @IsString({ message: '敘述型態錯誤' })
  @IsNotEmpty({ message: '敘述不得為空' })
  description: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '章節錯誤' })
  @IsNotEmpty({ message: '單元必須有章節' })
  lectureId: string;

  public static from(dto: Partial<CreateUnitDto>) {
    const it = new CreateUnitDto();
    it.order = dto.order;
    it.title = dto.title;
    it.description = dto.description;
    it.youtubeId = dto.youtubeId;
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
    it.order = this.order;
    it.title = this.title;
    it.description = this.description;
    it.youtube_id = this.youtubeId;
    it.lecture = lecture;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
