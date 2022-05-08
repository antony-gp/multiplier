import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Estoque } from './estoque.entity';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  getEstoque(): Promise<Estoque[]> {
    return this.estoqueService.findAll();
  }

  @Get(':id')
  getEstoqueById(@Param('id') id): Promise<Estoque> {
    return this.estoqueService.findByPk(id);
  }

  @Post()
  postEstoque(@Body() stock: Estoque) {
    return this.estoqueService.create(stock);
  }

  @Patch(':id')
  patchEstoque(@Param('id') id, @Body() stock: Estoque) {
    return this.estoqueService.edit(id, stock);
  }

  @Delete(['', ':id'])
  deleteEstoque() {
    return this.estoqueService.delete();
  }
}