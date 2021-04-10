import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stages } from 'src/database/entities/stages.entity';
import { Grades } from 'src/database/entities/grades.entity';
import { GradeDto } from './dto/grade.dto';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Stages)
    private readonly stageRepository: Repository<Stages>,
    @InjectRepository(Grades)
    private readonly gradeRepository: Repository<Grades>,
  ) {}

  public async create(dto: CreateGradeDto): Promise<CreateGradeDto> {
    const stage = await this.stageRepository.findOne(dto.stageId);
    if (!stage) {
      throw new HttpException(
        `${dto.stageId} 階級不存在!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.gradeRepository
      .save(dto.toEntity(stage))
      .then(e => CreateGradeDto.fromEntity(e));
  }

  public async findAll(): Promise<GradeDto[]> {
    return await this.gradeRepository
      .find()
      .then(grades => grades.map(e => GradeDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<GradeDto> {
    const grade = await this.gradeRepository.findOne(id);
    if (!grade) {
      throw new HttpException(`${id} 年級不存在!`, HttpStatus.NOT_FOUND);
    }
    return GradeDto.fromEntity(grade);
  }
}
