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
  public async findOne(@Req() req, @Param('id') id: string) {
    const user = await this.appService.validAauthentication(req.headers);
    const classroom = await this.classroomsService.findOne(id, user);
    // 帶入 User 資料
    const userRelations = await this.appService.getUserRelation(
      [classroom.manager],
      classroom.studentList,
    );

    return {
      ...classroom,
      ...userRelations,
      isManager: user.id === userRelations.manager._id,
    };
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
