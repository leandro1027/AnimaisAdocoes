import {Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import { AdocaoService } from './adocao.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

@Controller('adocoes')
export class AdocaoController {
  constructor(private readonly adocaoService: AdocaoService) {}

  @Post()
  create(@Body() dto: CreateAdocaoDto) {
    return this.adocaoService.create(dto);
  }

  @Get()
  findAll() {
    return this.adocaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adocaoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdocaoDto) {
    return this.adocaoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adocaoService.remove(+id);
  }
}
