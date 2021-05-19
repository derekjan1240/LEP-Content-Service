import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { Unit } from 'src/database/entities/unit.entity';

export class UnitDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '單元長度需要小於十' })
  @IsString({ message: '單元型態錯誤' })
  @IsNotEmpty({ message: '單元不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @IsInt({ message: '單元權重型態錯誤' })
  @Min(0)
  @Max(100)
  @IsNotEmpty({ message: '單元權重不得為空' })
  order: number;

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

  @ApiProperty({ required: false })
  @IsOptional()
  lecture: Lecture;

  @ApiProperty({ required: false })
  @IsOptional()
  tags: Tag[];

  public static from(dto: Partial<UnitDto>) {
    const it = new UnitDto();
    it.id = dto.id;
    it.title = dto.title;
    it.youtubeId = dto.youtubeId;
    it.description = dto.description;
    it.lecture = dto.lecture;
    it.tags = dto.tags;
    return it;
  }

  public static fromEntity(entity: Unit) {
    return this.from({
      id: entity.id,
      title: entity.title,
      youtubeId: entity.youtube_id,
      description: entity.description,
      lecture: entity.lecture,
      tags: entity.tags,
    });
  }

  public toEntity(user: any = null) {
    const it = new Unit();
    it.title = this.title;
    it.lecture = this.lecture;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
