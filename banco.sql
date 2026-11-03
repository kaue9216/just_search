CREATE DATABASE IF NOT EXISTS projeto CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projeto;

CREATE TABLE IF NOT EXISTS cliente (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) DEFAULT NULL,
    email VARCHAR(50) DEFAULT NULL,
    usuario VARCHAR(50) DEFAULT NULL,
    senha VARCHAR(200) DEFAULT NULL,
    ativo TINYINT DEFAULT 1,
    instagram VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS artigos (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    autor VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cliente (nome, email, usuario, senha, ativo, instagram) VALUES
('Administrador', 'admin@teste.com', 'admin', '123', 1, '@admin');

INSERT INTO artigos (titulo, conteudo, autor) VALUES
('Introdução ao Desenvolvimento Web', 'Neste artigo abordamos os conceitos fundamentais da web moderna.', 'Carlos Silva'),
('PHP Procedural com MySQLi', 'Guia prático passo a passo de conexão e manipulação com banco de dados.', 'Ana Souza'),
('Segurança e Prepared Statements', 'Boas práticas para prevenção de SQL Injection em aplicações PHP.', 'Dr. João Santos');

CREATE TABLE IF NOT EXISTS livros (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    editora VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    genero VARCHAR(100) NOT NULL,
    numero_paginas INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO livros (titulo, autor, editora, ano, genero, numero_paginas) VALUES
('Aventuras no Reino dos Animais', 'João da Silva', 'Editora A', 2020, 'Fantasia', 200),
('História da Arte', 'Maria Oliveira', 'Editora B', 2018, 'História', 300),
('Ciência da Computação', 'Pedro Santos', 'Editora C', 2021, 'Tecnologia', 400);


CREATE TABLE IF NOT EXISTS games (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    autor VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO games (titulo, conteudo, autor) VALUES
('The Legend of Zelda: Breath of the Wild', 'Aventura de mundo aberto em Hyrule.', 'Nintendo'),
('Hollow Knight', 'Metroidvania em um reino subterrâneo de insetos.', 'Team Cherry');

CREATE TABLE IF NOT EXISTS filmes (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    diretor VARCHAR(100) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    idioma VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO filmes (titulo, diretor, genero, ano, idioma) VALUES
('Shrek', 'Andrew Adamson', 'Animação', 2001, 'Inglês'),
('Cidade de Deus', 'Fernando Meirelles', 'Drama', 2002, 'Português');

CREATE TABLE IF NOT EXISTS series (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO series (titulo, autor, categoria, ano) VALUES
('Breaking Bad', 'Vince Gilligan', 'Drama', 2008),
('Dark', 'Baran bo Odar', 'Ficção científica', 2017);
