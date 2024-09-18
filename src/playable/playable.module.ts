import { Module } from '@nestjs/common';
import { PlayableService } from './playable.service';
import { PlayableController } from './playable.controller';

@Module({
  controllers: [PlayableController],
  providers: [PlayableService],
})
export class PlayableModule {}
