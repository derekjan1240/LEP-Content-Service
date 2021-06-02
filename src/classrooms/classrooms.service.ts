import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { Classroom } from 'src/database/entities/classroom.entity';
import { StudentGroup } from 'src/database/entities/studentGroup.entity';
import { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { StudentGroupDto } from './dto/student-group.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { UserDto } from 'src/user.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(StudentGroup)
    private readonly studentGroupRepository: Repository<StudentGroup>,
  ) {}

  public async create(dto: CreateClassroomDto, user: UserDto) {
    const newClassroom = await this.classroomRepository.save(
      dto.toEntity(user),
    );
    return CreateClassroomDto.fromEntity(newClassroom);
  }

  public async createGroups(
    classroomId: string,
    groups: StudentGroupDto[],
    user: UserDto,
  ) {
    try {
      const classroom = await this.classroomRepository.findOne(classroomId);

      const oldGroups = await this.studentGroupRepository.find({
        where: { classroom: classroomId },
      });

      // 移除所有組別
      this.studentGroupRepository.remove(oldGroups);

      // 新增編輯後的組別
      if (groups.length) {
        groups.forEach(group => {
          this.studentGroupRepository.save(group.toEntity(classroom, user));
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `組別更新失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(query: Query, user: UserDto): Promise<ClassroomDto[]> {
    return await this.classroomRepository
      .find({ where: query })
      .then(classrooms => classrooms.map(e => ClassroomDto.fromEntity(e)));
  }

  public async findOne(id: string, user: UserDto) {
    const classroom = await this.classroomRepository.findOne(id);
    return ClassroomDto.fromEntity(classroom);
  }

  public async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
