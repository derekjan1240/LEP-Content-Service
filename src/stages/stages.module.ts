import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Stages } from 'src/database/entities/stages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stages])],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
