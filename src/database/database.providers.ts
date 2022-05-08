import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../constants.class';
import { Categorias } from './entities/categorias/categorias.entity';
import { Estoque } from './entities/estoque/estoque.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'multiplier_api',
      });
      sequelize.addModels([Categorias, Estoque]);
      await sequelize.sync();
      return sequelize;
    },
  },
];