import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, Length } from 'class-validator';
import { Lectures } from 'src/database/entities/lectures.entity';
import { Subjects } from 'src/database/entities/subjects.entity';

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

  public static from(dto: Partial<CreateLectureDto>) {
    const it = new CreateLectureDto();
    it.title = dto.title;
    it.subjectId = dto.subjectId;
    return it;
  }

  public static fromEntity(entity: Lectures) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(subject: Subjects = null, user: any = null) {
    const it = new Lectures();
    it.title = this.title;
    it.subject = subject;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
