import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { Classroom } from 'src/database/entities/classroom.entity';
import { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { UserDto } from 'src/user.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  public async create(dto: CreateClassroomDto, user: UserDto) {
    const newClassroom = await this.classroomRepository.save(
      dto.toEntity(user),
    );
    return CreateClassroomDto.fromEntity(newClassroom);
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
