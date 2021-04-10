import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Stages } from 'src/database/entities/stages.entity';
import { Grades } from 'src/database/entities/grades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stages, Grades])],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
