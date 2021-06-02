import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StudentGroupDto } from './student-group.dto';

export class CreateStudentGroupDto {
  @ApiProperty({ required: true })
  @IsString({ message: '班級型態錯誤' })
  @IsNotEmpty({ message: '組別必須被班級擁有' })
  classroomId: string;

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @Type(() => StudentGroupDto)
  groups: StudentGroupDto[];

  public static from(dto: Partial<CreateStudentGroupDto>) {
    const it = new CreateStudentGroupDto();
    it.classroomId = dto.classroomId;
    it.groups = dto.groups;
    return it;
  }
}
