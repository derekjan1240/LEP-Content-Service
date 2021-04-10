import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectDto } from './dto/subject.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
  @Post()
  public async create(
    @Body() dto: CreateSubjectDto,
  ): Promise<CreateSubjectDto> {
    const subject = CreateSubjectDto.from(dto);
    return this.subjectsService.create(subject);
  }

  @Get()
  public async findAll(): Promise<SubjectDto[]> {
    return await this.subjectsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<SubjectDto> {
    return await this.subjectsService.findOne(id);
  }
}
