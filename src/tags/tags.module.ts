import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/database/entities/unit.entity';
import { Tag } from 'src/database/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Tag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
