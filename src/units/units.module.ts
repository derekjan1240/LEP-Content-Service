import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from 'src/database/entities/lecture.entity';
import { Unit } from 'src/database/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, Unit])],
  controllers: [UnitsController],
  exports: [UnitsService],
  providers: [UnitsService],
})
export class UnitsModule {}
