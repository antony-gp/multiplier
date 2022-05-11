import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriasController } from './categorias.controller';
import { categoriasProviders } from './categorias.providers';
import { CategoriasService } from './categorias.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriasController],
  providers: [
    CategoriasService,
    ...categoriasProviders,
  ],
})
export class CategoriasModule {}