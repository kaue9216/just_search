SET NAMES utf8mb4;
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

CREATE TABLE IF NOT EXISTS games (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    autor VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cliente (nome, email, usuario, senha, ativo, instagram)
SELECT 'Administrador', 'admin@teste.com', 'admin', '123', 1, '@admin'
WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE usuario = 'admin');

INSERT INTO artigos (titulo, conteudo, autor)
SELECT * FROM (SELECT 'Introdução ao Desenvolvimento Web' AS t, 'Neste artigo abordamos os conceitos fundamentais da web moderna.' AS c, 'Carlos Silva' AS a
    UNION ALL SELECT 'PHP Procedural com MySQLi', 'Guia prático passo a passo de conexão e manipulação com banco de dados.', 'Ana Souza'
    UNION ALL SELECT 'Segurança e Prepared Statements', 'Boas práticas para prevenção de SQL Injection em aplicações PHP.', 'Dr. João Santos') x
WHERE NOT EXISTS (SELECT 1 FROM artigos);
