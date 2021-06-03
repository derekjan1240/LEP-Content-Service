import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, Length } from 'class-validator';
import { Classroom } from 'src/database/entities/classroom.entity';
export class CreateClassroomDto {
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

  manager: string;

  // @ApiProperty({ required: true })
  // @IsString({ message: '組別型態錯誤' })
  // @IsNotEmpty({ message: '班級名稱不得為空' })
  // groupList: string;

  // @ApiProperty({ required: true })
  // @ValidateNested({ each: true })
  // @Type(() => QuestionDto)
  // questions: QuestionDto[];

  // @ApiProperty({ required: true })
  // @IsString({ message: '班級學生型態錯誤' })
  // @IsNotEmpty({ message: '班級學生不得為空' })
  // studentList: string;

  public static from(dto: Partial<CreateClassroomDto>) {
    const it = new CreateClassroomDto();
    it.name = dto.name;
    it.description = dto.description;
    it.isAllowAdd = dto.isAllowAdd;
    return it;
  }

  public static fromEntity(entity: Classroom) {
    return this.from({
      name: entity.name,
      description: entity.description,
      isAllowAdd: entity.isAllowAdd,
      manager: entity.manager,
    });
  }

  public toEntity(user: any = null) {
    const it = new Classroom();
    it.name = this.name;
    it.description = this.description;
    it.isAllowAdd = this.isAllowAdd;
    it.studentGroups = null;
    it.studentList = null;
    it.manager = user._id;
    it.createDateTime = new Date();
    it.createdBy = user?._id;
    it.lastChangedBy = user?._id;
    return it;
  }
}
