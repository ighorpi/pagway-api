import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayableService } from './playable.service';
import { CreatePlayableDto } from './dto/create-playable.dto';
import { UpdatePlayableDto } from './dto/update-playable.dto';

@Controller('playable')
export class PlayableController {
  constructor(private readonly playableService: PlayableService) {}

  @Post()
  create(@Body() createPlayableDto: CreatePlayableDto) {
    return this.playableService.create(createPlayableDto);
  }

  @Get()
  findAll() {
    return this.playableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playableService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayableDto: UpdatePlayableDto,
  ) {
    return this.playableService.update(+id, updatePlayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playableService.remove(+id);
  }
}
