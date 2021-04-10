import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from 'src/database/entities/grades.entity';
import { Subjects } from 'src/database/entities/subjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grades, Subjects])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
