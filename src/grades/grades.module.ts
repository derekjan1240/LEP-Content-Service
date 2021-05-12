import { Module, forwardRef } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from 'src/database/entities/stage.entity';
import { Grade } from 'src/database/entities/grade.entity';

import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage, Grade]),
    forwardRef(() => SubjectsModule),
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
