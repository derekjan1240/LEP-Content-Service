import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from 'src/database/entities/subjects.entity';
import { Lectures } from 'src/database/entities/lectures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects, Lectures])],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}
