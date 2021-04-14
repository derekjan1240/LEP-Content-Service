import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from 'src/database/entities/grade.entity';
import { Subject } from 'src/database/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Subject])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
