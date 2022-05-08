import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './database/entities/categorias/categorias.module';
import { EstoqueModule } from './database/entities/estoque/estoque.module';

@Module({
  imports: [CategoriasModule, EstoqueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
