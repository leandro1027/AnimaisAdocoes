import { Module } from '@nestjs/common';
import { AdocaoService } from './adocao.service';
import { AdocaoController } from './adocao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdocaoController],
  providers: [AdocaoService],
})
export class AdocaoModule {}
