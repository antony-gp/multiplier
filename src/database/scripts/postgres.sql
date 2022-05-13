-- Database: multiplier_api
-- DROP DATABASE IF EXISTS multiplier_api;
/*
CREATE DATABASE multiplier_api
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Canada.1252'
    LC_CTYPE = 'English_Canada.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
*/

create table if not exists "Categorias"(
	id int unique primary key,					-- Chave primária da tabela
    codigo varchar(255) not null,				-- Código da Categoria (slug)
    titulo varchar(255) not null, 				-- Título da Categoria
    status int not null							-- 0 - Inativo, 1 - Ativo
);

create table if not exists "Produtos"(
	id int unique primary key,										-- Chave primária da tabela
    "idCategoria" int references "Categorias"(id) on delete set null,	-- id da Categoria (fk)
    codigo varchar(255) not null check(LENGTH(codigo) > 0),			-- SKU do Produto
    nome varchar(255) not null,										-- Nome do Produto
	descricao text not null,										-- Descrição do Produto
	valor decimal(9,2) not null,									-- Valor do Produto
    status int not null												-- 0 - Inativo, 1 - Ativo
);

create table if not exists "Estoque"(
	id int unique primary key,													-- Chave primária da tabela
    "idProduto" int not null unique references "Produtos"(id) on delete cascade,	-- id do Produto (fk)
    quantidade int not null,													-- Quantidade em estoque
	reserva int not null,														-- Quantidade reservada
    status int not null															-- 0 - Inativo, 1 - Ativo
);