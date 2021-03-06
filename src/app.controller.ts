import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ClassroomsService } from './classrooms/classrooms.service';
import { ExercisesService } from './exercises/exercises.service';
import { UnitsService } from './units/units.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly unitsService: UnitsService,
    private readonly exerciseService: ExercisesService,
    private readonly classroomService: ClassroomsService,
  ) {}

  @MessagePattern('CONTENT_get_classroom_relation')
  async getClassroomsRelation(classrooms: string[]): Promise<any> {
    try {
      return await this.classroomService.findByIds(classrooms);
    } catch (error) {
      return {};
    }
  }

  @MessagePattern('CONTENT_get_mission_relation')
  async getMissionContentRelation(data: any): Promise<any> {
    try {
      const units = await this.unitsService.findByIds(data.unitIDs);
      const exercises = await this.exerciseService.findByIds(
        data.exerciseIDs,
        data.withAnswers,
      );
      const exerciseUnits = await this.unitsService.findByIds(
        exercises
          .map(exercise => exercise.questions)[0]
          .map(question => question.unit.id),
      );

      return {
        units,
        exercises: exercises.map(exercise => {
          return {
            ...exercise,
            questions: exercise.questions.map(question => {
              return {
                ...question,
                unit: exerciseUnits.filter(
                  unit => unit.id === question.unit.id,
                )[0],
              };
            }),
          };
        }),
      };
    } catch (error) {
      return {};
    }
  }

  @MessagePattern('CONTENT_test')
  async getContentTest(id: number): Promise<any> {
    const FAKE_CONTENT_DATA = [
      {
        id: '1',
        name: 'FAKE_CONTENT_DATA',
      },
    ];
    return FAKE_CONTENT_DATA[id];
  }

  @Get()
  test(): string {
    return '[Content Service] : OK!';
  }

  /* 實驗用 API */
  @Post('/test/get/mission/relation')
  public async getMissionRelation(@Body() body: any) {
    const exerciseIDs = body.data.contents
      .filter(mission => mission.exercise !== '')
      .map(mission => mission.exercise);
    const unitIDs = body.data.contents
      .filter(mission => mission.unit !== '')
      .map(mission => mission.unit);
    const withAnswers = body.data.withAnswers;

    try {
      const units = await this.unitsService.findByIds(unitIDs);
      const exercises = await this.exerciseService.findByIds(
        exerciseIDs,
        withAnswers,
      );
      return {
        units,
        exercises,
      };
    } catch (error) {
      return false;
    }
  }

  @Post('/test/get/classroom/relation')
  public async getClassroomRelation(@Body() body: any) {
    try {
      return await this.classroomService.findByIds(body.data.classrooms);
    } catch (error) {
      return {};
    }
  }

  @Post('test')
  public async contentTest(@Body() body: any) {
    const FAKE_CONTENT_DATA = [
      {
        id: '1',
        name: 'FAKE_CONTENT_DATA',
      },
    ];
    return FAKE_CONTENT_DATA[body.data.id];
  }
}
