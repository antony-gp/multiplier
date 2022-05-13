import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { ESTOQUE_REPOSITORY, SEQUELIZE_DB_ERROR_MESSAGE, SEQUELIZE_FK_ERROR_MESSAGE, SEQUELIZE_UNIQUE_ERROR_MESSAGE } from 'src/constants.class';
import { HttpErrors, SequelizeHelper } from 'src/database/sequelize-helper/sequelizeHelper.class';
import { Estoque } from './estoque.entity';

@Injectable()
export class EstoqueService {
  constructor(
    @Inject(ESTOQUE_REPOSITORY)
    private estoqueRepository: typeof Estoque
  ) {}

  async findByProductId(id: number): Promise<Estoque> {
    const estoque = await this.estoqueRepository.findOne(this.whereProductIdEquals(id));

    if(!estoque)
      SequelizeHelper.throwHttpError(HttpErrors.GET_NOT_FOUND, id);
    
    return estoque;
  }

  async edit(id: number, newItem: Estoque) {
    const currentItem = await this.findByProductId(id);

    const updatedItem = {
      id: currentItem.id,
      idProduto: currentItem.idProduto,
      quantidade: newItem.quantidade !== undefined ? newItem.quantidade : currentItem.quantidade,
      reserva: newItem.reserva !== undefined ? newItem.reserva : currentItem.reserva,
      status: newItem.status !== undefined ? newItem.status : currentItem.status,
    } as Estoque;

    try{
      await this.estoqueRepository.update(updatedItem, this.whereProductIdEquals(id));
      return updatedItem;
    } catch(err) {
      const error = err.name;
      
      if(error === SEQUELIZE_DB_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.UPDATE_VALIDATION_ERROR);
      if(error === SEQUELIZE_UNIQUE_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.POST_UPDATE_UNIQUE_PRODUCT_ID_ERROR, newItem.idProduto);
      if(error === SEQUELIZE_FK_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.UPDATE_FK_ERROR, newItem.idProduto, 'Produto');
      SequelizeHelper.throwHttpError();
    }

    return updatedItem;
  }

  async delete() {
    return SequelizeHelper.throwHttpError(HttpErrors.DELETE_STOCK_NOT_IMPLEMENTED);
  }

  private whereProductIdEquals(id: number) {
    return { where: { idProduto: { [Op.eq]: id }}};
  }
}