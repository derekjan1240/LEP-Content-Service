import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stages } from 'src/database/entities/stages.entity';
import { StageDto } from './dto/stage.dto';
import { CreateStageDto } from './dto/create-stage.dto';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stages)
    private readonly stageRepository: Repository<Stages>,
  ) {}

  public async create(dto: CreateStageDto): Promise<CreateStageDto> {
    return this.stageRepository
      .save(dto.toEntity())
      .then(e => CreateStageDto.fromEntity(e));
  }

  public async findAll(): Promise<StageDto[]> {
    return await this.stageRepository
      .find()
      .then(stages => stages.map(e => StageDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<StageDto> {
    const stage = await this.stageRepository.findOne(id);
    if (!stage) {
      throw new HttpException(`${id} 階級不存在!`, HttpStatus.NOT_FOUND);
    }
    return StageDto.fromEntity(stage);
  }
}
