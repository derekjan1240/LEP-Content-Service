import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradeDto } from './dto/grade.dto';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}
  @Post()
  public async create(@Body() dto: CreateGradeDto): Promise<CreateGradeDto> {
    const grade = CreateGradeDto.from(dto);
    return this.gradesService.create(grade);
  }

  @Get()
  public async findAll(): Promise<GradeDto[]> {
    return await this.gradesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<GradeDto> {
    return await this.gradesService.findOne(id);
  }
}
