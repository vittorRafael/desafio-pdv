CREATE DATABASE pdv;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome text,
  email text UNIQUE,
  senha text NOT NULL
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  descricao text
);

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id) NOT NULL
);

CREATE TABLE clientes (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  cep VARCHAR(10),
  rua VARCHAR(255) DEFAULT NULL,
  numero INTEGER DEFAULT NULL,
  bairro VARCHAR(255) DEFAULT NULL,
  cidade VARCHAR(255) DEFAULT NULL,
  estado VARCHAR(255) DEFAULT NULL
);

INSERT INTO categorias (descricao) VALUES 
('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), 
('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');