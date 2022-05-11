import { Table, Column, Model, PrimaryKey, AllowNull, DataType, AutoIncrement, HasOne, ForeignKey } from 'sequelize-typescript';
import { Categorias } from '../categorias/categorias.entity';
import { Estoque } from '../estoque/estoque.entity';

@Table
export class Produtos extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Categorias)
  @Column(DataType.INTEGER)
  idCategoria: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  codigo: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  nome: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  descricao: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  valor: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  status: number;

  @HasOne(() => Estoque , {
    onDelete: "CASCADE"
  })
  estoque: Estoque;
}