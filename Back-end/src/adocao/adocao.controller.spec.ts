import { Test, TestingModule } from '@nestjs/testing';
import { AdocaoController } from './adocao.controller';
import { AdocaoService } from './adocao.service';

describe('AdocaoController', () => {
  let controller: AdocaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdocaoController],
      providers: [AdocaoService],
    }).compile();

    controller = module.get<AdocaoController>(AdocaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
