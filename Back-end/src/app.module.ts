import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalModule } from './animal/animal.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [AnimalModule, UsuarioModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
