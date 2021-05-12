import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, Length } from 'class-validator';
import { Subject } from 'src/database/entities/subject.entity';
import { Grade } from 'src/database/entities/grade.entity';

export class CreateSubjectDto {
  @ApiProperty({ required: true })
  @Length(1, 50, { message: '科目長度需要小於五十' })
  @IsString({ message: '科目型態錯誤' })
  @IsNotEmpty({ message: '科目不得為空' })
  title: string;

  // @ApiProperty({ required: true })
  // @IsUUID('all', { message: '年級錯誤' })
  // @IsNotEmpty({ message: '科目必須有年級' })
  // gradeId: string;

  public static from(dto: Partial<CreateSubjectDto>) {
    const it = new CreateSubjectDto();
    it.title = dto.title;
    // it.gradeId = dto.gradeId;
    return it;
  }

  public static fromEntity(entity: Subject) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(grade: Grade = null, user: any = null) {
    const it = new Subject();
    it.title = this.title;
    // it.grade = grade;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
