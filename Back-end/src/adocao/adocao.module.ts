import { Module } from '@nestjs/common';
import { AdocaoService } from './adocao.service';
import { AdocaoController } from './adocao.controller';

@Module({
  controllers: [AdocaoController],
  providers: [AdocaoService],
})
export class AdocaoModule {}
