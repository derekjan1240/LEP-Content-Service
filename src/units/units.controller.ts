import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
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
  public async findAll(@Query() query): Promise<UnitDto[]> {
    return await this.unitsService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UnitDto> {
    return await this.unitsService.findOne(id);
  }
}
