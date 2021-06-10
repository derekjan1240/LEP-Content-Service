import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ExercisesService } from './exercises/exercises.service';
import { UnitsService } from './units/units.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly unitsService: UnitsService,
    private readonly exerciseService: ExercisesService,
  ) {}

  @MessagePattern('CONTENT_get_mission_relation')
  async getMissionContentRelation(data: any): Promise<any> {
    console.log(data);
    try {
      const units = await this.unitsService.findByIds(data.unitIDs);
      const exercises = await this.exerciseService.findByIds(data.exerciseIDs);
      return {
        units,
        exercises,
      };
    } catch (error) {
      return {};
    }
  }

  @Get()
  test(): string {
    return '[Content Service] : OK!';
  }

  // @Get('/hello')
  // async getHello(): Promise<string> {
  //   const helloValue = await this.appService.getHello();
  //   return helloValue;
  // }
}
