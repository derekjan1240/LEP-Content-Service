import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from 'src/database/entities/grade.entity';
import { Subject } from 'src/database/entities/subject.entity';
import { SubjectDto } from './dto/subject.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  public async create(dto: CreateSubjectDto): Promise<CreateSubjectDto> {
    const grade = await this.gradeRepository.findOne(dto.gradeId);
    if (!grade) {
      throw new HttpException(
        `${dto.gradeId} 年級不存在!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.subjectRepository
      .save(dto.toEntity(grade))
      .then(e => CreateSubjectDto.fromEntity(e));
  }

  public async findAll(): Promise<SubjectDto[]> {
    return await this.subjectRepository
      .find()
      .then(subjects => subjects.map(e => SubjectDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<SubjectDto> {
    const subject = await this.subjectRepository.findOne(id);
    if (!subject) {
      throw new HttpException(`${id} 科目不存在!`, HttpStatus.NOT_FOUND);
    }
    return SubjectDto.fromEntity(subject);
  }
}
