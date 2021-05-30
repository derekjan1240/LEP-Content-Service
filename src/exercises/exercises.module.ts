import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/database/entities/exercise.entity';
import { Question } from 'src/database/entities/question.entity';
import { Choice } from 'src/database/entities/choice.entity';
import { Unit } from 'src/database/entities/unit.entity';
import { Tag } from 'src/database/entities/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Question, Choice, Unit, Tag])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
