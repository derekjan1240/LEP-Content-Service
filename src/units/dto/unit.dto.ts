import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Lectures } from 'src/database/entities/lectures.entity';
import { Units } from 'src/database/entities/units.entity';

export class UnitDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '單元長度需要小於十' })
  @IsString({ message: '單元型態錯誤' })
  @IsNotEmpty({ message: '單元不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lecture: Lectures;

  public static from(dto: Partial<UnitDto>) {
    const it = new UnitDto();
    it.id = dto.id;
    it.title = dto.title;
    it.lecture = dto.lecture;
    return it;
  }

  public static fromEntity(entity: Units) {
    return this.from({
      id: entity.id,
      title: entity.title,
      lecture: entity.lecture,
    });
  }

  public toEntity(user: any = null) {
    const it = new Units();
    it.title = this.title;
    it.lecture = this.lecture;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
