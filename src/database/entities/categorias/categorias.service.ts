import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { CATEGORIAS_REPOSITORY, DELETE_MESSAGE, SEQUELIZE_FK_ERROR_MESSAGE, SEQUELIZE_DB_ERROR_MESSAGE, SEQUELIZE_VALIDATION_ERROR_MESSAGE } from 'src/constants.class';
import { HttpErrors, SequelizeHelper } from 'src/database/sequelize-helper/sequelizeHelper.class';
import { Categorias } from './categorias.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @Inject(CATEGORIAS_REPOSITORY)
    private categoriasRepository: typeof Categorias
  ) {}

  async findAll(): Promise<Categorias[]> {
    return this.categoriasRepository.findAll<Categorias>();
  }

  async findByPk(id: number): Promise<Categorias> {
    const category = await this.categoriasRepository.findByPk(id);

    if(!category)
      SequelizeHelper.throwHttpError(HttpErrors.GET_NOT_FOUND, id);
    
    return category;
  }

  async create(object: Categorias) {
    object.id = undefined;

    try{
      return await this.categoriasRepository.create({ ...object });
    } catch (err) {
      const error = err.name;

      if(error === SEQUELIZE_DB_ERROR_MESSAGE || error === SEQUELIZE_VALIDATION_ERROR_MESSAGE )
        SequelizeHelper.throwHttpError(HttpErrors.POST_VALIDATION_ERROR);
      SequelizeHelper.throwHttpError();
    }
  }

  async edit(id: number, newItem: Categorias) {
    const currentItem = await this.findByPk(id);

    const updatedItem = {
      id: id,
      codigo: newItem.codigo !== undefined ? newItem.codigo : currentItem.codigo,
      titulo: newItem.titulo !== undefined ? newItem.titulo : currentItem.titulo,
      status: newItem.status !== undefined ? newItem.status : currentItem.status,
    } as Categorias;

    await this.categoriasRepository.update(updatedItem, this.whereIdEquals(id));

    return updatedItem;
  }

  async delete(id: number) {
    if(await this.findByPk(id)){
      try{
        await this.categoriasRepository.destroy(this.whereIdEquals(id));
        return SequelizeHelper.messageWithId(DELETE_MESSAGE, id);
      } catch { SequelizeHelper.throwHttpError(); }
    }
  }

  private whereIdEquals(id: number) {
    return { where: { id: { [Op.eq]: id }}};
  }
}