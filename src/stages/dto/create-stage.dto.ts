import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Stages } from 'src/database/entities/stages.entity';

export class CreateStageDto {
  @ApiProperty({ required: true })
  @Length(1, 10, { message: '階級長度需要小於十' })
  @IsString({ message: '階級型態錯誤' })
  @IsNotEmpty({ message: '階級不得為空' })
  title: string;

  public static from(dto: Partial<CreateStageDto>) {
    const it = new CreateStageDto();
    it.title = dto.title;
    return it;
  }

  public static fromEntity(entity: Stages) {
    return this.from({
      title: entity.title,
    });
  }

  public toEntity(user: any = null) {
    const it = new Stages();
    it.title = this.title;
    it.createDateTime = new Date();
    it.createdBy = user?.id;
    it.lastChangedBy = user?.id;
    return it;
  }
}
