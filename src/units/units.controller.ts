import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitDto } from './dto/unit.dto';
import { CreateUnitDto } from './dto/create-units.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  public async create(@Body() dto: CreateUnitDto): Promise<CreateUnitDto> {
    const unit = CreateUnitDto.from(dto);
    return this.unitsService.create(unit);
  }

  @Get()
  public async findAll(): Promise<UnitDto[]> {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UnitDto> {
    return await this.unitsService.findOne(id);
  }
}
