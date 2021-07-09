import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    try {
      const newClassroom = await this.classroomRepository.save(
        dto.toEntity(user),
      );
      return ClassroomDto.fromEntity(newClassroom);
    } catch (error) {
      throw new HttpException(
        `新增班級失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  public async joinClassroom(body, user: UserDto) {
    try {
      const classroom = await this.classroomRepository.findOne(body.classroom);
      if (!classroom) {
        throw new HttpException(`班級不存在!`, HttpStatus.NOT_FOUND);
      }
      if (classroom && classroom.isAllowAdd) {
        let newStudentList = '';
        if (classroom.studentList) {
          if (classroom.studentList.split(',').indexOf(user._id) !== -1) {
            throw new HttpException(`已加入班級!`, HttpStatus.BAD_REQUEST);
          } else {
            newStudentList = `${classroom.studentList},${user._id}`;
          }
        } else {
          newStudentList = user._id;
        }
        const newClassroom = await this.classroomRepository.save({
          ...classroom,
          studentList: newStudentList,
        });
        return ClassroomDto.fromEntity(newClassroom);
      } else {
        throw new HttpException(
          `無法加入此班級!`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        `加入班級失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateClassroomMeetingLink(body, user: UserDto) {
    try {
      const classroom = await this.classroomRepository.findOne(body.classroom);
      if (!classroom) {
        throw new HttpException(`班級不存在!`, HttpStatus.NOT_FOUND);
      }
      if (classroom.manager !== user._id) {
        throw new HttpException(
          `只有班級管理員能新增視訊連結!`,
          HttpStatus.UNAUTHORIZED,
        );
      }
      const newClassroom = await this.classroomRepository.save({
        ...classroom,
        meetingLink: body.meetingLink,
      });
      return ClassroomDto.fromEntity(newClassroom);
    } catch (error) {
      throw new HttpException(
        `新增視訊連結失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(user: UserDto): Promise<ClassroomDto[]> {
    try {
      if (user.role === 'Admin' || user.role === 'Teacher') {
        const classrooms = await this.classroomRepository
          .find({
            where: { manager: user._id },
            order: { createDateTime: 'DESC' },
          })
          .then(classrooms => classrooms.map(e => ClassroomDto.fromEntity(e)));
        return classrooms;
      } else {
        const classrooms = await this.classroomRepository
          .find({ order: { createDateTime: 'DESC' } })
          .then(classrooms => classrooms.map(e => ClassroomDto.fromEntity(e)));
        return classrooms.filter(
          classroom => classroom.studentList.indexOf(user._id) !== -1,
        );
      }
    } catch (error) {
      throw new HttpException(
        `搜尋班級失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOne(id: string, user: UserDto) {
    try {
      const classroom = await this.classroomRepository.findOne(id);
      if (!classroom) {
        throw new HttpException(`班級不存在!`, HttpStatus.NOT_FOUND);
      }
      return ClassroomDto.fromEntity(classroom);
    } catch (error) {
      throw new HttpException(
        `搜尋班級失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findByIds(ids: string[]) {
    try {
      return await this.classroomRepository
        .findByIds(ids)
        .then(classrooms => classrooms.map(e => ClassroomDto.fromEntity(e)));
    } catch (error) {
      throw new HttpException(
        `搜尋班級失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
