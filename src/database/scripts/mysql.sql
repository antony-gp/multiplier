-- DATABASE SETUP START --

create database if not exists multiplier_api;

use multiplier_api;
# drop database if exists multiplier_api;

create table if not exists Categorias(
	id int primary key auto_increment,	# Chave primária da tabela
    codigo varchar(255) not null,		# Código da Categoria (slug)
    titulo varchar(255) not null, 		# Título da Categoria
    status int not null					# 0 - Inativo, 1 - Ativo
);

create table if not exists Produtos(
	id int primary key auto_increment,							# Chave primária da tabela
    idCategoria int,											# id da Categoria (fk)
    codigo varchar(255) not null check(LENGTH(codigo) > 0),		# SKU do Produto
    nome varchar(255) not null,									# Nome do Produto
	descricao text not null,									# Descrição do Produto
	valor decimal(9,2) not null,								# Valor do Produto
    status int not null,										# 0 - Inativo, 1 - Ativo
    foreign key (idCategoria) references Categorias(id) on delete set null
);

create table if not exists Estoque(
	id int primary key auto_increment,	# Chave primária da tabela
    idProduto int not null unique,		# id do Produto (fk)
    quantidade int not null,			# Quantidade em estoque
	reserva int not null,				# Quantidade reservada
    status int not null,				# 0 - Inativo, 1 - Ativo
    foreign key (idProduto) references Produtos(id) on delete cascade
);

delimiter $$

drop trigger if exists after_product_insert$$
create trigger after_product_insert
after insert
on Produtos for each row
begin
    insert into Estoque (idProduto, quantidade, reserva, status) values (new.id, 0, 0, 0);
end$$

delimiter ;

-- DATABASE SETUP END --

-- INSERT QUERIES START --

# insert into Categorias values (@codigo, @titulo, @status);
insert into Categorias (codigo, titulo, status) values ('calca', 'Calça', 1);
insert into Categorias (codigo, titulo, status) values ('camiseta', 'Camiseta', 1);
insert into Categorias (codigo, titulo, status) values ('tenis', 'Tênis', 1);

# insert into Produtos values (@idCategoria, @codigo, @nome, @descricao, @valor, @status);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (1, 'CKBLU3P4N7540', 'Calça CK Azul Tam. 40', 'Calça Jeans Calvin Klein; Cor Azul; Tamanho 40', 304.87, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (1, 'LVB31G3P4N7538', 'Calça LV Bege Tam. 38', 'Calça Sarja Levis; Cor Bege; Tamanho 38', 282.51, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (1, 'GCBL4CKP4N7542', 'Calça GC Preta Tam. 42', 'Calça Jeans Gucci; Cor Preta; Tamanho 42', 466.69, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (2, 'LCBLU35H1R7P', 'Camiseta LC Azul Tam. P', 'Camiseta Algodão Lacoste; Cor Azul; Tamanho P', 159.43, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (2, 'PLR3D5H1R7GG', 'Camiseta PL Tam. GG', 'Camiseta Algodão Polo; Cor Vermelha; Tamanho GG', 126.76, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (2, 'CLBL4CK5H1R7G', 'Camiseta CL Preta Tam. G', 'Camiseta Poliéster Columbia; Cor Preta; Tamanho G', 99.99, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (3, 'AD6R3Y5H03539', 'Tênis AD Cinza Tam. 39', 'Tênis Adidas; Cor Cinza; Tamanho 39', 397.45, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (3, 'NKWH1735H03538', 'Tênis NK Branco Tam. 38', 'Tênis Nike; Cor Branco; Tamanho 38', 561.58, 1);
insert into Produtos (idCategoria, codigo, nome, descricao, valor, status) values (3, 'OKBLU35H03541', 'Tênis OK Azul Tam. 41', 'Tênis Olympikus; Cor Azul; Tamanho 41', 240.00, 1);

# insert into Estoque values (@idProduto, @quantidade, @reserva, @status);
insert into Estoque (idProduto, quantidade, reserva, status) values (1, 10, 3, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (2, 19, 0, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (3, 8, 5, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (4, 15, 3, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (5, 3, 2, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (6, 18, 11, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (7, 16, 9, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (8, 6, 1, 1);
insert into Estoque (idProduto, quantidade, reserva, status) values (9, 7, 0, 1);

-- INSERT QUERIES END --