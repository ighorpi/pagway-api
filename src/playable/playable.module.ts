import { Module } from '@nestjs/common';
import { PlayableService } from './playable.service';
import { PlayableController } from './playable.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [PlayableController],
  imports: [PrismaModule],
  providers: [PlayableService],
})
export class PlayableModule {}
