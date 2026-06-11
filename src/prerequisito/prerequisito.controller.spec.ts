import { Test, TestingModule } from '@nestjs/testing';
import { PrerequisitoController } from './prerequisito.controller';

describe('PrerequisitoController', () => {
  let controller: PrerequisitoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrerequisitoController],
    }).compile();

    controller = module.get<PrerequisitoController>(PrerequisitoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
