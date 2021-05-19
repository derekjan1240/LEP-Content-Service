import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsInt,
  Length,
} from 'class-validator';
import { Unit } from 'src/database/entities/unit.entity';
import { Tag } from 'src/database/entities/tag.entity';

export class TagDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 100, { message: '標題長度需要小於 100' })
  @IsString({ message: '標題型態錯誤' })
  @IsNotEmpty({ message: '標題不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @IsInt({ message: '時間型態錯誤' })
  @IsNotEmpty({ message: '時間不得為空' })
  time: number;

  @ApiProperty({ required: false })
  @IsOptional()
  unit: Unit;

  public static from(dto: Partial<TagDto>) {
    const it = new TagDto();
    it.id = dto.id;
    it.title = dto.title;
    it.time = dto.time;
    it.unit = dto.unit;
    return it;
  }

  public static fromEntity(entity: Tag) {
    return this.from({
      id: entity.id,
      title: entity.title,
      time: entity.time,
      unit: entity.unit,
    });
  }

  public toEntity(user: any = null) {
    const it = new Tag();
    it.title = this.title;
    it.time = this.time;
    it.unit = this.unit;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
