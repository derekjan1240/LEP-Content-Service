import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from 'src/database/entities/subject.entity';
import { Lecture } from 'src/database/entities/lecture.entity';
import { LectureDto } from './dto/lecture.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  public async create(dto: CreateLectureDto): Promise<CreateLectureDto> {
    const subject = await this.subjectRepository.findOne(dto.subjectId);
    if (!subject) {
      throw new HttpException(
        `${dto.subjectId} 科目不存在!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.lectureRepository
      .save(dto.toEntity(subject))
      .then(e => CreateLectureDto.fromEntity(e));
  }

  public async findAll(): Promise<LectureDto[]> {
    return await this.lectureRepository
      .find()
      .then(lectures => lectures.map(e => LectureDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<LectureDto> {
    const lecture = await this.lectureRepository.findOne(id);
    if (!lecture) {
      throw new HttpException(`${id} 章節不存在!`, HttpStatus.NOT_FOUND);
    }
    return LectureDto.fromEntity(lecture);
  }
}
