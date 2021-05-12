import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from 'src/database/entities/stage.entity';
import { StageDto } from './dto/stage.dto';
import { CreateStageDto } from './dto/create-stage.dto';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  public async create(dto: CreateStageDto): Promise<CreateStageDto> {
    return this.stageRepository
      .save(dto.toEntity())
      .then(e => CreateStageDto.fromEntity(e));
  }

  public async findAll(): Promise<StageDto[]> {
    return await this.stageRepository
      .find({
        relations: ['grades', 'grades.subjects'],
      })
      .then(stages => stages.map(e => StageDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<StageDto> {
    const stage = await this.stageRepository.findOne(id, {
      relations: ['grades', 'grades.subjects'],
    });
    if (!stage) {
      throw new HttpException(`${id} 階級不存在!`, HttpStatus.NOT_FOUND);
    }
    return StageDto.fromEntity(stage);
  }
}
