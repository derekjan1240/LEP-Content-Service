import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Classroom } from 'src/database/entities/classroom.entity';
import { StudentGroup } from 'src/database/entities/studentGroup.entity';

export class StudentGroupDto {
  @ApiProperty({ required: true })
  @Length(1, 50, { message: '組別名稱需要小於 50' })
  @IsString({ message: '組別名稱型態錯誤' })
  @IsNotEmpty({ message: '組別名稱不得為空' })
  name: string;

  @ApiProperty({ required: true })
  @IsString({ message: '組別成員型態錯誤' })
  @IsNotEmpty({ message: '組別成員不得為空' })
  members: string;

  public static from(dto: Partial<StudentGroupDto>) {
    const it = new StudentGroupDto();
    it.name = dto.name;
    it.members = dto.members;
    return it;
  }

  public toEntity(classroom: Classroom, user: any = null) {
    const it = new StudentGroup();
    it.name = this.name;
    it.members = this.members;
    it.classroom = classroom;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
