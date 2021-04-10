import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StageDto } from './dto/stage.dto';
import { CreateStageDto } from './dto/create-stage.dto';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}
  @Post()
  public async create(@Body() dto: CreateStageDto): Promise<CreateStageDto> {
    const stage = CreateStageDto.from(dto);
    return this.stagesService.create(stage);
  }

  @Get()
  public async findAll(): Promise<StageDto[]> {
    return await this.stagesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<StageDto> {
    return await this.stagesService.findOne(id);
  }
}
