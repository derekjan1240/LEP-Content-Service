import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from 'src/database/entities/stage.entity';
import { Grade } from 'src/database/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage, Grade])],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
