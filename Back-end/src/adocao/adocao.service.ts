import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

@Injectable()
export class AdocaoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdocaoDto) {
    // Verifica se animal existe e não está adotado
    const animal = await this.prisma.animal.findUnique({ where: { id: data.animalId } });
    if (!animal) throw new NotFoundException('Animal não encontrado.');
    if (animal.adotado) throw new BadRequestException('Animal já foi adotado.');

    // Cria a adoção
    const adocao = await this.prisma.adocao.create({
      data: {
        animalId: data.animalId,
        adotante: data.adotante,
        dataAdocao: data.dataAdocao ? new Date(data.dataAdocao) : undefined,
        observacoes: data.observacoes,
      },
    });

    // Atualiza o animal para adotado = true
    await this.prisma.animal.update({
      where: { id: data.animalId },
      data: { adotado: true },
    });

    return adocao;
  }

  findAll() {
    return this.prisma.adocao.findMany({
      include: { animal: true },
    });
  }

  findOne(id: number) {
    return this.prisma.adocao.findUnique({
      where: { id },
      include: { animal: true },
    });
  }

  async update(id: number, data: UpdateAdocaoDto) {
    const adocao = await this.prisma.adocao.findUnique({ where: { id } });
    if (!adocao) throw new NotFoundException('Adoção não encontrada.');

    return this.prisma.adocao.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const adocao = await this.prisma.adocao.findUnique({ where: { id } });
    if (!adocao) throw new NotFoundException('Adoção não encontrada.');

    // Atualiza o animal para adotado = false ao excluir adoção
    await this.prisma.animal.update({
      where: { id: adocao.animalId },
      data: { adotado: false },
    });

    return this.prisma.adocao.delete({ where: { id } });
  }
}
