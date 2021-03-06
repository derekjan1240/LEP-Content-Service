import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LectureDto } from './dto/lecture.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}
  @Post()
  public async create(
    @Body() dto: CreateLectureDto,
  ): Promise<CreateLectureDto> {
    const lecture = CreateLectureDto.from(dto);
    return this.lecturesService.create(lecture);
  }

  @Get()
  public async findAll(@Query() query): Promise<LectureDto[]> {
    return await this.lecturesService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<LectureDto> {
    return await this.lecturesService.findOne(id);
  }
}
