import { Test, TestingModule } from '@nestjs/testing';
import { PlayableService } from './playable.service';

describe('PlayableService', () => {
  let service: PlayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayableService],
    }).compile();

    service = module.get<PlayableService>(PlayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
