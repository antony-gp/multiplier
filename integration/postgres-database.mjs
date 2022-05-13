import { Sequelize, DataTypes } from 'sequelize';

export class Postgres{
    constructor(){
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            dialectOptions: {
                decimalNumbers: true
            },
            define: {
                timestamps: false,
                freezeTableName: true,
            },
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '1234',
            database: 'multiplier_api',
        });

        this.categorias = this.sequelize.define('Categorias',
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                codigo: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                titulo: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            }
        );

        this.produtos = this.sequelize.define('Produtos',
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                idCategoria: {
                    type: DataTypes.INTEGER,
                },
                codigo: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                descricao: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                valor: {
                    type: DataTypes.DECIMAL,
                    allowNull: false
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            }
        );
        
       this.estoque = this.sequelize.define('Estoque',
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                idProduto: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                quantidade: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                reserva: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            }
        );

        this.categorias.hasMany(this.produtos, {
            onDelete: 'set null',
            foreignKey: 'idCategoria'
        });
        
        this.produtos.hasOne(this.estoque, {
            onDelete: 'cascade',
            foreignKey: 'idProduto'
        });
        this.estoque.belongsTo(this.produtos, {
            foreignKey: 'idProduto'
        });

        this.sequelize.sync();
    }

    static async updateTable(sequelize, table, items){
        try {
            await sequelize.transaction(async (t) => {
                await sequelize.sync();
                await table.destroy({ where: {} }, { transaction: t });
            
                for(const item of items)
                    await table.create(item, { transaction: t });
            });
        } catch (error) { 
            console.log(error);
        }
    }
}