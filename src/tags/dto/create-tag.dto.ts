import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsInt, Length } from 'class-validator';
import { Unit } from 'src/database/entities/unit.entity';
import { Tag } from 'src/database/entities/tag.entity';

export class CreateTagDto {
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
  @IsUUID('all', { message: '單元錯誤' })
  @IsNotEmpty({ message: 'Tag 必須有單元' })
  unitId: string;

  public static from(dto: Partial<CreateTagDto>) {
    const it = new CreateTagDto();
    it.title = dto.title;
    it.time = dto.time;
    it.unitId = dto.unitId;
    return it;
  }

  public static fromEntity(entity: Tag) {
    return this.from({
      title: entity.title,
      time: entity.time,
    });
  }

  public toEntity(unit: Unit = null, user: any = null) {
    const it = new Tag();
    it.title = this.title;
    it.time = this.time;
    it.unit = unit;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
