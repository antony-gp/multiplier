## Descrição

API Rest criada com NestJS e Sequelize ORM em banco MySQL, com integração cron utlizando node-schedule para atualizar um banco PostgreSQL com as mesmas tabelas de acordo com os dados atuais da API 

## Instalação

```bash
$ npm install
```

## Rodar a API

```bash
# desenvolvimento
$ npm run start

# watch mode
$ npm run start:dev

# produção
$ npm run start:prod
```

## Rodar a Integração

```bash
$ cd .\integration\
$ node cron-integration.mjs
```

## Licença

MIT.
