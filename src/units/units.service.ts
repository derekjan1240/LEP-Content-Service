import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lectures } from 'src/database/entities/lectures.entity';
import { Units } from 'src/database/entities/units.entity';
import { UnitDto } from './dto/unit.dto';
import { CreateUnitDto } from './dto/create-units.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Units)
    private readonly unitRepository: Repository<Units>,
    @InjectRepository(Lectures)
    private readonly lectureRepository: Repository<Lectures>,
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

  public async findAll(): Promise<UnitDto[]> {
    return await this.unitRepository
      .find()
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
