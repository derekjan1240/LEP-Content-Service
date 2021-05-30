import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseDto } from './dto/exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() dto: CreateExerciseDto) {
    const exercise = CreateExerciseDto.from(dto);
    return this.exercisesService.create(exercise);
  }

  @Get()
  public async findAll(@Query() query): Promise<ExerciseDto[]> {
    return await this.exercisesService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ExerciseDto> {
    return await this.exercisesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
