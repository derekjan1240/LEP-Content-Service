import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, Length } from 'class-validator';
import { Grade } from 'src/database/entities/grade.entity';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Subject } from 'src/database/entities/subject.entity';

export class CreateLectureDto {
  @ApiProperty({ required: true })
  @Length(1, 50, { message: '章節長度需要小於五十' })
  @IsString({ message: '章節型態錯誤' })
  @IsNotEmpty({ message: '章節不得為空' })
  title: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '科目錯誤' })
  @IsNotEmpty({ message: '章節必須有科目' })
  subjectId: string;

  @ApiProperty({ required: true })
  @IsUUID('all', { message: '年級錯誤' })
  @IsNotEmpty({ message: '章節必須有年級' })
  gradeId: string;

  public static from(dto: Partial<CreateLectureDto>) {
    const it = new CreateLectureDto();
    it.title = dto.title;
    it.subjectId = dto.subjectId;
    it.gradeId = dto.gradeId;
    return it;
  }

  public static fromEntity(entity: Lecture) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(subject: Subject = null, grade: Grade, user: any = null) {
    const it = new Lecture();
    it.title = this.title;
    it.subject = subject;
    it.grade = grade;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
