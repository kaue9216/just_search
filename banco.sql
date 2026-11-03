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
    sinopse TEXT NOT NULL,
    diretor VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    ano INT DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO filmes (titulo, sinopse, diretor, genero, ano)
SELECT * FROM (
    SELECT 'Central do Brasil' AS t, 'Uma ex-professora que escreve cartas para analfabetos na estação Central do Brasil acaba acompanhando um menino em busca do pai pelo sertão nordestino.' AS s, 'Walter Salles' AS d, 'Drama' AS c, 1998 AS a
    UNION ALL SELECT 'Cidade de Deus', 'A trajetória de jovens que crescem em uma comunidade do Rio de Janeiro entre os anos 60 e 80, contada pelo olhar de um aspirante a fotógrafo.', 'Fernando Meirelles', 'Drama', 2002
    UNION ALL SELECT 'O Auto da Compadecida', 'João Grilo e Chicó vivem de pequenos golpes no sertão da Paraíba até que suas trapaças os levam a um julgamento inusitado.', 'Guel Arraes', 'Comédia', 2000
    UNION ALL SELECT 'Interestelar', 'Um grupo de exploradores atravessa um buraco de minhoca em busca de um novo lar para a humanidade.', 'Christopher Nolan', 'Ficção Científica', 2014
    UNION ALL SELECT 'A Viagem de Chihiro', 'Uma menina fica presa em um mundo de espíritos e precisa trabalhar em uma casa de banhos para salvar os pais.', 'Hayao Miyazaki', 'Animação', 2001
) x
WHERE NOT EXISTS (SELECT 1 FROM filmes);

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
