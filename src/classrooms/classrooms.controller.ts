import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { AppService } from 'src/app.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
    private readonly appService: AppService,
  ) {}

  @Post()
  public async create(@Req() req, @Body() dto: CreateClassroomDto) {
    const user = await this.appService.validAauthentication(req.headers);
    const classroom = CreateClassroomDto.from(dto);
    return this.classroomsService.create(classroom, user);
  }

  @Get()
  public async findAll(@Req() req, @Query() query) {
    const user = await this.appService.validAauthentication(req.headers);
    return this.classroomsService.findAll(query, user);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(+id);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomsService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.classroomsService.remove(+id);
  }
}
