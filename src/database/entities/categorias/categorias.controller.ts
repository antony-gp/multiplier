import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categorias } from './categorias.entity';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriesService: CategoriasService) {}

  @Get()
  getCategorias(): Promise<Categorias[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getCategoria(@Param('id') id): Promise<Categorias> {
    return this.categoriesService.findByPk(id);
  }

  @Post()
  postCategoria(@Body() category: Categorias) {
    return this.categoriesService.create(category);
  }

  @Patch(':id')
  patchCategoria(@Param('id') id, @Body() category: Categorias) {
    return this.categoriesService.edit(id, category);
  }

  @Delete(':id')
  deleteCategoria(@Param('id') id) {
    return this.categoriesService.delete(id);
  }
}