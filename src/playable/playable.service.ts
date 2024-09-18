import { Injectable } from '@nestjs/common';
import { CreatePlayableDto } from './dto/create-playable.dto';
import { UpdatePlayableDto } from './dto/update-playable.dto';

@Injectable()
export class PlayableService {
  create(createPlayableDto: CreatePlayableDto) {
    return 'This action adds a new playable';
  }

  findAll() {
    return `This action returns all playable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playable`;
  }

  update(id: number, updatePlayableDto: UpdatePlayableDto) {
    return `This action updates a #${id} playable`;
  }

  remove(id: number) {
    return `This action removes a #${id} playable`;
  }
}
