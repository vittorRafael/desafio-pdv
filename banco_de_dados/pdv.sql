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

INSERT INTO categorias (descricao) VALUES 
('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), 
('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');
