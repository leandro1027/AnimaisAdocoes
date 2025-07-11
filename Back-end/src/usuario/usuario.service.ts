import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      include: { animais: true },
    });
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    return this.prisma.usuario.delete({ where: { id } });
  }
}
