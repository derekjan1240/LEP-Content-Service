import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Subjects } from 'src/database/entities/subjects.entity';
import { Grades } from 'src/database/entities/grades.entity';
import { Lectures } from 'src/database/entities/lectures.entity';

export class SubjectDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '科目長度需要小於五十' })
  @IsString({ message: '科目型態錯誤' })
  @IsNotEmpty({ message: '科目不得為空' })
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  grade: Grades;

  @ApiProperty({ required: false })
  @IsOptional()
  lectures: Lectures[];

  public static from(dto: Partial<SubjectDto>) {
    const it = new SubjectDto();
    it.id = dto.id;
    it.title = dto.title;
    it.grade = dto.grade;
    it.lectures = dto.lectures;
    return it;
  }

  public static fromEntity(entity: Subjects) {
    return this.from({
      id: entity.id,
      title: entity.title,
      grade: entity.grade,
      lectures: entity.lectures,
    });
  }

  public toEntity(user: any = null) {
    const it = new Subjects();
    it.title = this.title;
    it.grade = this.grade;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
