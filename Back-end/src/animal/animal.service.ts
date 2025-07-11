import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService) {}

async create(data: CreateAnimalDto) {
  if (!data.usuarioId) {
    throw new Error('O campo usuarioId é obrigatório e deve ser válido.');
  }

  const createData = {
    nome: data.nome,
    especie: data.especie,
    raca: data.raca,
    idade: data.idade,
    descricao: data.descricao,
    adotado: data.adotado ?? false,
    usuario: {
      connect: { id: data.usuarioId },
    },
  };

  return await this.prisma.animal.create({ data: createData });
}



  findAll() {
    return this.prisma.animal.findMany({
      include: {
        usuario: true,
        adocao: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.animal.findUnique({
      where: { id },
      include: { usuario: true, adocao: true },
    });
  }

  async update(id: number, data: UpdateAnimalDto) {
    const animal = await this.prisma.animal.findUnique({ where: { id } });
    if (!animal) throw new NotFoundException('Animal não encontrado.');

    return this.prisma.animal.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const animal = await this.prisma.animal.findUnique({ where: { id } });
    if (!animal) throw new NotFoundException('Animal não encontrado.');

    return this.prisma.animal.delete({ where: { id } });
  }
}
