import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StagesModule } from './stages/stages.module';
import { GradesModule } from './grades/grades.module';
import { LecturesModule } from './lectures/lectures.module';
import { UnitsModule } from './units/units.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TagsModule } from './tags/tags.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ClassroomsModule } from './classrooms/classrooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    StagesModule,
    GradesModule,
    LecturesModule,
    UnitsModule,
    SubjectsModule,
    TagsModule,
    ExercisesModule,
    ClassroomsModule,
  ],
  providers: [AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
