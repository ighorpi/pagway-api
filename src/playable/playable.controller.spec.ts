import { Test, TestingModule } from '@nestjs/testing';
import { PlayableController } from './playable.controller';
import { PlayableService } from './playable.service';

describe('PlayableController', () => {
  let controller: PlayableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayableController],
      providers: [PlayableService],
    }).compile();

    controller = module.get<PlayableController>(PlayableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
