import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Estoque } from './estoque.entity';
import { EstoqueService } from './estoque.service';

@Controller('produtos/:id/estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  getEstoqueById(@Param('id') id): Promise<Estoque> {
    return this.estoqueService.findByProductId(id);
  }

  @Patch()
  patchEstoque(@Param('id') id, @Body() stock: Estoque) {
    return this.estoqueService.edit(id, stock);
  }

  @Delete()
  deleteEstoque() {
    return this.estoqueService.delete();
  }
}