import { Table, Column, Model, PrimaryKey, AllowNull, DataType, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table
export class Estoque extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  //@ForeignKey(() => Produtos)
  @Column(DataType.INTEGER)
  idProduto: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantidade: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  reserva: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  status: number;

  // @BelongsTo(() => Produto)
  // produto: Produto;
}