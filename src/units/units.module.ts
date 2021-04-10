import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Lectures } from 'src/database/entities/lectures.entity';
import { Units } from 'src/database/entities/units.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lectures, Units])],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
