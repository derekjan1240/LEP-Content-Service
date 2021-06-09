import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from 'src/database/entities/exercise.entity';
import { Question } from 'src/database/entities/question.entity';
import { Choice } from 'src/database/entities/choice.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { Unit } from 'src/database/entities/unit.entity';
import { ExerciseDto } from './dto/exercise.dto';
import { UserDto } from 'src/user.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(dto: CreateExerciseDto, user: UserDto) {
    try {
      const newExercise = await this.exerciseRepository.save(
        dto.toEntity(user),
      );
      console.log(newExercise);

      for (let index = 0; index < dto.questions.length; index++) {
        const question = dto.questions[index];

        const unit = await this.unitRepository.findOne(question.unitId);
        let tag = null;
        if (question.tagId) {
          tag = await this.tagRepository.findOne(question.tagId);
        }

        const newQuestion = await this.questionRepository.save({
          type: question.type,
          title: question.title,
          description: question.description,
          unit: unit,
          tag: tag,
          exercise: newExercise,
        });

        console.log(newQuestion);

        if (question.type === 'choiceAnswer') {
          for (let index = 0; index < question.choices.length; index++) {
            const choice = question.choices[index];
            const newChoice = await this.choiceRepository.save({
              title: choice.title,
              isCorrectAnswer: choice.isCorrectAnswer,
              question: newQuestion,
            });
          }
        }
      }
    } catch (error) {
      throw new HttpException(
        `新增練習卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return dto;
  }

  public async findAll(query: Query, user: UserDto): Promise<ExerciseDto[]> {
    return await this.exerciseRepository
      .find({ where: query })
      .then(lectures => lectures.map(e => ExerciseDto.fromEntity(e, true)));
  }

  public async findOne(id: string): Promise<ExerciseDto> {
    const exercise = await this.exerciseRepository.findOne(id);
    if (!exercise) {
      throw new HttpException(`${id} 練習卷不存在!`, HttpStatus.NOT_FOUND);
    }
    return ExerciseDto.fromEntity(exercise, false);
  }

  // update(id: number, updateExerciseDto: ExerciseDto) {
  //   return `This action updates a #${id} exercise`;
  // }

  public async remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
