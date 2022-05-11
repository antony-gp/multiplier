import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Produtos } from './produtos.entity';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  getProdutos(): Promise<Produtos[]> {
    return this.produtosService.findAll();
  }

  @Get(':id')
  getProdutosById(@Param('id') id): Promise<Produtos> {
    return this.produtosService.findByPk(id);
  }

  @Post()
  postProdutos(@Body() stock: Produtos) {
    return this.produtosService.create(stock);
  }

  @Patch(':id')
  patchProdutos(@Param('id') id, @Body() stock: Produtos) {
    return this.produtosService.edit(id, stock);
  }

  @Delete(':id')
  deleteProdutos(@Param('id') id) {
    return this.produtosService.delete(id);
  }
}