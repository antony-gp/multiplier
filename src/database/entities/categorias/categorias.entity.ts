import { Table, Column, Model, PrimaryKey, AllowNull, DataType, AutoIncrement } from 'sequelize-typescript';

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
}