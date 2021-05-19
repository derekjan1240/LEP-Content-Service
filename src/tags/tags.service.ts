import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/database/entities/tag.entity';
import { Unit } from 'src/database/entities/unit.entity';
import { TagDto } from './dto/tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  public async create(dto: CreateTagDto): Promise<CreateTagDto> {
    const unit = await this.unitRepository.findOne(dto.unitId);
    if (!unit) {
      throw new HttpException(
        `${dto.unitId} 單元不存在!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.tagRepository
      .save(dto.toEntity(unit))
      .then(e => CreateTagDto.fromEntity(e));
  }

  public async findAll(): Promise<TagDto[]> {
    return await this.tagRepository
      .find()
      .then(tags => tags.map(e => TagDto.fromEntity(e)));
  }

  public async findOne(id: string): Promise<TagDto> {
    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new HttpException(`${id} Tag 不存在!`, HttpStatus.NOT_FOUND);
    }
    return TagDto.fromEntity(tag);
  }
}
