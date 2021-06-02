import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  Length,
  IsUUID,
} from 'class-validator';
import { Classroom } from 'src/database/entities/classroom.entity';
import { StudentGroup } from 'src/database/entities/studentGroup.entity';

export class ClassroomDto {
  @ApiProperty({ required: true })
  @IsUUID('all', { message: '習題型態錯誤' })
  id: string;

  @ApiProperty({ required: true })
  @Length(1, 50, { message: '班級名稱需要小於 50' })
  @IsString({ message: '班級名稱型態錯誤' })
  @IsNotEmpty({ message: '班級名稱不得為空' })
  name: string;

  @ApiProperty({ required: true })
  @Length(0, 500, { message: '班級敘述長度需要小於 500' })
  @IsString({ message: '班級敘述型態錯誤' })
  description: string;

  @ApiProperty({ required: true })
  @IsBoolean({ message: '是否開放學生加入型態錯誤' })
  isAllowAdd: boolean;

  @ApiProperty({ required: true })
  @IsString({ message: '班級教師型態錯誤' })
  @IsNotEmpty({ message: '班級教師不得為空' })
  manager: string;

  @ApiProperty({ required: false, nullable: true })
  studentGroups: StudentGroup[];

  @ApiProperty({ required: false, nullable: true })
  studentList: string[];

  public static from(dto: Partial<ClassroomDto>) {
    const it = new ClassroomDto();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    it.isAllowAdd = dto.isAllowAdd;
    it.manager = dto.manager;
    it.studentGroups = dto.studentGroups;
    it.studentList = dto.studentList;
    return it;
  }

  public static fromEntity(entity: Classroom) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      isAllowAdd: entity.isAllowAdd,
      manager: entity.manager,
      studentGroups: entity.studentGroups,
      studentList: entity.studentList.split(','),
    });
  }

  public toEntity(user: any = null) {
    const it = new Classroom();
    it.name = this.name;
    it.description = this.description;
    it.isAllowAdd = this.isAllowAdd;
    it.studentGroups = null;
    it.studentList = null;
    it.manager = user.id;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
