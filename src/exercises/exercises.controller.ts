import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { AppService } from 'src/app.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseDto } from './dto/exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly appService: AppService,
  ) {}

  @Post()
  public async create(@Req() req, @Body() dto: CreateExerciseDto) {
    const user = await this.appService.validAauthentication(req.headers);
    const exercise = CreateExerciseDto.from(dto);
    return this.exercisesService.create(exercise, user);
  }

  @Get()
  public async findAll(@Req() req, @Query() query): Promise<ExerciseDto[]> {
    const user = await this.appService.validAauthentication(req.headers);
    return this.exercisesService.findAll(query, user);
  }

  @Get(':id')
  public async findOne(
    @Req() req,
    @Param('id') id: string,
  ): Promise<ExerciseDto> {
    const user = await this.appService.validAauthentication(req.headers);
    return await this.exercisesService.findOne(id, user);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
