import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/database/entities/subject.entity';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Grade } from 'src/database/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Subject, Lecture])],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}
