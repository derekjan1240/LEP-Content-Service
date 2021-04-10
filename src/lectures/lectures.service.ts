import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from 'src/database/entities/subjects.entity';
import { Lectures } from 'src/database/entities/lectures.entity';
import { LectureDto } from './dto/lecture.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Subjects)
    private readonly subjectRepository: Repository<Subjects>,
    @InjectRepository(Lectures)
    private readonly lectureRepository: Repository<Lectures>,
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
