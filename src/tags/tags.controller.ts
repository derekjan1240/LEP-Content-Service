import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public async create(@Body() dto: CreateTagDto): Promise<CreateTagDto> {
    const unit = CreateTagDto.from(dto);
    return this.tagsService.create(unit);
  }

  @Get()
  public async findAll(): Promise<TagDto[]> {
    return await this.tagsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<TagDto> {
    return await this.tagsService.findOne(id);
  }
}
