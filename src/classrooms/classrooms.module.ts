import { Module, forwardRef } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { Classroom } from 'src/database/entities/classroom.entity';
import { StudentGroup } from 'src/database/entities/studentGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, StudentGroup]),
    forwardRef(() => AppModule),
  ],
  exports: [ClassroomsService],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
})
export class ClassroomsModule {}
