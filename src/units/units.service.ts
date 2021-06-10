import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Unit } from 'src/database/entities/unit.entity';
import { UnitDto } from './dto/unit.dto';
import { CreateUnitDto } from './dto/create-units.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  public async create(dto: CreateUnitDto): Promise<CreateUnitDto> {
    const lecture = await this.lectureRepository.findOne(dto.lectureId);
    if (!lecture) {
      throw new HttpException(
        `${dto.lectureId} 科目不存在!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.unitRepository
      .save(dto.toEntity(lecture))
      .then(e => CreateUnitDto.fromEntity(e));
  }

  public async findAll(query: Query): Promise<UnitDto[]> {
    return await this.unitRepository
      .find({ where: query })
      .then(units => units.map(e => UnitDto.fromEntity(e)));
  }

  public async findByIds(ids: string[]): Promise<UnitDto[]> {
    return await this.unitRepository
      .findByIds(ids, { relations: ['lecture'] })
      .then(units => units.map(e => UnitDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<UnitDto> {
    const unit = await this.unitRepository.findOne(id);
    if (!unit) {
      throw new HttpException(`${id} 單元不存在!`, HttpStatus.NOT_FOUND);
    }
    return UnitDto.fromEntity(unit);
  }
}
