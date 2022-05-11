import { Table, Column, Model, PrimaryKey, AllowNull, DataType, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Produtos } from '../produtos/produtos.entity';

@Table
export class Categorias extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  codigo: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  titulo: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  status: number;

  @HasMany(() => Produtos, {
    onDelete: "SET NULL"
  })
  produtos: Produtos[];
}