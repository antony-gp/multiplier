import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMethods() {
    return {
      categorias: {
        url: '/categorias',
        listarTodas: 'GET',
        listarUma: 'GET /:id',
        criarUma: 'POST',
        atualizarUma: 'PATCH /:id',
        removerUma: 'DELETE /:id'
      },
      produtos: {
        url: '/produtos',
        listarTodos: 'GET',
        listarUm: 'GET /:id',
        listarEstoqueDeUm: 'GET /:id/estoque',
        criarUm: 'POST',
        atualizarUm: 'PATCH /:id',
        atualizarEstoqueDeUm: 'PATCH /:id/estoque',
        removerUm: 'DELETE /:id'
      }
    };
  }
}
