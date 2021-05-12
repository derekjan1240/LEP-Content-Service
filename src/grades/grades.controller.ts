import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GradesService } from './grades.service';
import { SubjectsService } from '../subjects/subjects.service';
import { GradeDto } from './dto/grade.dto';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
export class GradesController {
  constructor(
    private readonly gradesService: GradesService,
    private readonly subjectService: SubjectsService,
  ) {}
  @Post()
  public async create(@Body() dto: CreateGradeDto): Promise<CreateGradeDto> {
    const subjects = await this.subjectService.findSubjectsByIds(
      dto.subjectIds || [],
    );
    const grade = CreateGradeDto.from(dto);
    return this.gradesService.create(grade, subjects);
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
