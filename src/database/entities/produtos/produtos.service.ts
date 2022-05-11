import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { DELETE_MESSAGE, PRODUTOS_REPOSITORY, SEQUELIZE_DB_ERROR_MESSAGE, SEQUELIZE_FK_ERROR_MESSAGE, SEQUELIZE_UNIQUE_ERROR_MESSAGE, SEQUELIZE_VALIDATION_ERROR_MESSAGE } from 'src/constants.class';
import { HttpErrors, SequelizeHelper } from 'src/database/sequelize-helper/sequelizeHelper.class';
import { Produtos } from './produtos.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject(PRODUTOS_REPOSITORY)
    private produtosRepository: typeof Produtos
  ) {}

  async findAll(): Promise<Produtos[]> {
    return this.produtosRepository.findAll<Produtos>();
  }

  async findByPk(id: number): Promise<Produtos> {
    const category = await this.produtosRepository.findByPk(id);

    if(!category)
      SequelizeHelper.throwHttpError(HttpErrors.GET_NOT_FOUND, id);
    
    return category;
  }

  async create(object: Produtos) {
    object.id = undefined;

    try{
      return await this.produtosRepository.create({ ...object });
    } catch (err) {
      const error = err.name;
      
      if(error === SEQUELIZE_DB_ERROR_MESSAGE || error === SEQUELIZE_VALIDATION_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.POST_VALIDATION_ERROR);
      if(error === SEQUELIZE_UNIQUE_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.POST_UPDATE_UNIQUE_PRODUCT_ID_ERROR, object.idCategoria);
      if(error === SEQUELIZE_FK_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.POST_FK_ERROR, object.idCategoria, 'Categoria');
      SequelizeHelper.throwHttpError();
    }
  }

  async edit(id: number, newItem: Produtos) {
    const currentItem = await this.findByPk(id);
    
    const updatedItem = {
      id: id,
      idCategoria: newItem.idCategoria !== undefined ? newItem.idCategoria : currentItem.idCategoria,
      codigo: newItem.codigo !== undefined ? newItem.codigo : currentItem.codigo,
      nome: newItem.nome !== undefined ? newItem.nome : currentItem.nome,
      descricao: newItem.descricao !== undefined ? newItem.descricao : currentItem.descricao,
      valor: newItem.valor !== undefined ? newItem.valor : currentItem.valor,
      status: newItem.status !== undefined ? newItem.status : currentItem.status
    } as Produtos;

    try{
      await this.produtosRepository.update(updatedItem, this.whereIdEquals(id));
      return updatedItem;
    } catch(err) {
      const error = err.name;

      if(error === SEQUELIZE_DB_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.UPDATE_VALIDATION_ERROR);
      if(error === SEQUELIZE_UNIQUE_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.POST_UPDATE_UNIQUE_PRODUCT_ID_ERROR, newItem.idCategoria);
      if(error === SEQUELIZE_FK_ERROR_MESSAGE)
        SequelizeHelper.throwHttpError(HttpErrors.UPDATE_FK_ERROR, newItem.idCategoria, 'Categoria');
      SequelizeHelper.throwHttpError();
    }
  }

  async delete(id: number) {
    if(await this.findByPk(id)){
      try{
        await this.produtosRepository.destroy(this.whereIdEquals(id));
        return SequelizeHelper.messageWithId(DELETE_MESSAGE, id);
      } catch { SequelizeHelper.throwHttpError(); }
    }
  }

  private whereIdEquals(id: number) {
    return { where: { id: { [Op.eq]: id }}};
  }
}