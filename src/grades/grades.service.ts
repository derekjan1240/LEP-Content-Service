import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from 'src/database/entities/stage.entity';
import { Grade } from 'src/database/entities/grade.entity';
import { GradeDto } from './dto/grade.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
import { Subject } from 'src/database/entities/subject.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  public async create(
    dto: CreateGradeDto,
    subjects: Subject[],
  ): Promise<CreateGradeDto> {
    const stage = await this.stageRepository.findOne(dto.stageId);
    if (!stage) {
      throw new HttpException(
        `${dto.stageId} 階級不存在!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.gradeRepository
      .save(dto.toEntity(stage, subjects))
      .then(e => CreateGradeDto.fromEntity(e));
  }

  public async findAll(): Promise<GradeDto[]> {
    return await this.gradeRepository
      .find()
      .then(grades => grades.map(e => GradeDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<GradeDto> {
    const grade = await this.gradeRepository.findOne(id, {
      relations: ['subjects'],
    });
    if (!grade) {
      throw new HttpException(`${id} 年級不存在!`, HttpStatus.NOT_FOUND);
    }
    return GradeDto.fromEntity(grade);
  }
}
