import * as schedule from 'node-schedule';
import { ApiRequests } from './api-requests.mjs';
import { Postgres } from './postgres-database.mjs';

const postgres = new Postgres();

schedule.scheduleJob('*/15 * * * *', async () => {
    ApiRequests.apiUrl = 'http://localhost:3000';

    const [categories, products, stock] = await ApiRequests.getAllItems();

    if(Boolean(categories && products && stock)) {
        await Postgres.updateTable(postgres.sequelize, postgres.categorias, categories);
        await Postgres.updateTable(postgres.sequelize, postgres.produtos, products);
        await Postgres.updateTable(postgres.sequelize, postgres.estoque, stock);
    }
});