import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EstoqueController } from './estoque.controller';
import { estoqueProviders } from './estoque.providers';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EstoqueController],
  providers: [
    EstoqueService,
    ...estoqueProviders,
  ],
})
export class EstoqueModule {}