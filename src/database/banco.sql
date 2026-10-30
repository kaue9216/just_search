-- ==================================================
-- CRIA BANCO E TABELAS
-- ==================================================
CREATE DATABASE just_search
	CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;
-- DROP DATABASE just_search;
USE just_search;

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(60) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE NOT NULL
);

CREATE TABLE biblioteca(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    privacidade BOOL NOT NULL,
    descricao VARCHAR(200),
    data_criacao DATE NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id)
);

CREATE TABLE estante(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    tema VARCHAR(50) NOT NULL,
    descricao VARCHAR(200),
    data_criacao DATE NOT NULL,
    id_biblioteca INT NOT NULL,
    FOREIGN KEY(id_biblioteca) REFERENCES biblioteca(id)
);

CREATE TABLE obra(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(150) NOT NULL,
    nome_autor VARCHAR(150) NOT NULL,
    data_publicacao DATE NOT NULL,
    privacidade BOOL NOT NULL DEFAULT 0,
    id_usuario INT NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id)
);

CREATE TABLE avaliacao(
	id_usuario INT,
    id_obra INT,
    PRIMARY KEY(id_usuario, id_obra),
    util BOOL NOT NULL,
    data_avaliacao DATE NOT NULL,
    comentario VARCHAR(300),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY(id_obra) REFERENCES obra(id) ON DELETE CASCADE
);

CREATE TABLE links_obra(
	links VARCHAR(300) NULL,
    id_obra INT NOT NULL,
    FOREIGN KEY(id_obra) REFERENCES obra(id)
);

CREATE TABLE usuario_obra(
	id_usuario INT,
    id_obra INT,
    PRIMARY KEY(id_usuario, id_obra),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_obra) REFERENCES obra(id)
);

CREATE TABLE estante_obra(
	id_estante INT,
    id_obra INT,
    data_inclusao DATE NOT NULL,
    PRIMARY KEY(id_estante, id_obra),
    FOREIGN KEY(id_estante) REFERENCES estante(id),
    FOREIGN KEY(id_obra) REFERENCES obra(id)
);





-- ==================================================
-- POPULA DADOS
-- ==================================================

INSERT INTO usuario (nome, email, senha, telefone, data_nascimento)
VALUES 
('Heitor Rebechi', 'heitor@gmail.com', '12345', '(41) 98879-9758', '2008-02-02'),
('Gabriel Dudeck', 'dudeckfox@gmail.com', '54321', '(41) 91234-5678', '2008-07-26'),
('Kaue Ogibowski', 'kaue@gmail.com', '00099', '(41) 91223-4444', '2000-01-01'),
('Gabriel Souza', 'souza@gmail.com', '77777', '(41) 95555-1111', '2008-05-05'),
('Ícaro Caminoto', 'icaro@motel.com', '696969', '(41) 91298-5567', '2000-02-01'),
('Ana Lima', 'ana@gmail.com', '11111', '(41) 90000-0001', '2001-03-10'),
('Bruno Alves', 'bruno@gmail.com', '22222', '(41) 90000-0002', '1999-09-09'),
('Carla Nunes', 'carla@gmail.com', '33333', '(41) 90000-0003', '2002-12-12'),
('Teste Documento', 'teste@gmail.com', '99999', '(41) 90000-0099', '2003-03-03');

INSERT INTO obra (titulo, categoria, nome_autor, data_publicacao, privacidade, id_usuario)
VALUES
('O Enigma do Espaço', 'Filme', 'Christopher Nolan Fictício', '2023-05-12', 0, 1),
('CyberAventura 2099', 'Game', 'Estúdio Alpha', '2022-11-20', 0, 1),
('O Vale das Sombras', 'Livro', 'Maria Silva', '2015-08-30', 0, 3),
('O Futuro da Inteligência Artificial', 'Artigo', 'Dr. João Santos', '2024-01-15', 0, 4),
('Comédia de Erros', 'Filme', 'Ana Costa', '2020-12-10', 0, 5),
('Livro do Ícaro', 'Livro', 'Ícaro Caminoto', '2026-10-10', 0, 5);

INSERT INTO avaliacao (id_usuario, id_obra, util, data_avaliacao, comentario)
VALUES
(1, 1, 1, '2023-06-01', 'Filme fantástico, efeitos visuais incríveis e roteiro impecável!'),
(1, 2, 0, '2022-12-05', 'Muitos bugs no lançamento, a jogabilidade ficou comprometida. Não recomendo.'),
(2, 2, 1, '2023-01-10', 'A história é muito envolvente e os gráficos são lindos, apesar dos bugs iniciais.'),
(2, 3, 1, '2021-04-20', 'Um livro que prende do início ao fim. A construção do universo é perfeita.'),
(3, 4, 1, '2024-02-01', 'Artigo muito bem escrito, fundamentado e essencial para os dias de hoje.'),
(3, 5, 0, '2021-01-15', 'Achei as piadas um pouco forçadas e o ritmo do filme muito arrastado.'),
(4, 1, 1, '2023-07-20', 'Com certeza o melhor sci-fi dos últimos anos. Fiquei impressionado com a trilha sonora.'),
(4, 4, 1, '2024-03-10', 'Leitura obrigatória para estudantes de tecnologia e entusiastas da área.'),
(5, 2, 0, '2018-09-12', 'O desenvolvimento dos personagens é bom, mas o final foi muito decepcionante.'),
(5, 5, 1, '2021-02-10', 'Ótimo filme para dar boas risadas e assistir com a família num domingo à tarde.');

INSERT INTO biblioteca (nome, privacidade, descricao, data_criacao, id_usuario)
VALUES
('Engenharia de Software', 0, 'Bacharelado em Engenharia de Software - PUCPR', '2026-02-01', 1),
('Escola', 0, 'Ensino Médio Terceirão', '2025-02-01', 1),
('Pesquisas', 1, 'Pesquisas de computação', '2026-07-02', 5),
('Livros', 0, 'Livros tech', '2025-01-01', 2),
('Linux', 0, 'LINUX', '2026-09-05', 3),
('Jogos', 0, 'Jogos Souza', '2026-10-10', 4);

INSERT INTO estante (nome, tema, descricao, data_criacao, id_biblioteca)
VALUES
('Banco de Dados', 'Banco de Dados', 'Modelagem, SQL e normalização', '2026-02-10', 1),
('Programação em C++', 'Programação', 'Material de estudo de C++', '2026-03-05', 1),
('Engenharia de Requisitos', 'Requisitos', 'Levantamento e análise de requisitos', '2026-04-12', 1),
('Matemática', 'Exatas', 'Resumos e listas de exercícios', '2025-03-01', 2),
('Português e Literatura', 'Humanas', 'Obras e resumos de literatura', '2025-04-10', 2),
('Inteligência Artificial', 'Computação', 'Artigos sobre IA e aprendizado de máquina', '2026-07-10', 3),
('Segurança da Informação', 'Computação', 'Criptografia e boas práticas de segurança', '2026-08-01', 3),
('Clean Code e Boas Práticas', 'Programação', 'Livros sobre código limpo', '2025-02-15', 4),
('Algoritmos', 'Programação', 'Estruturas de dados e algoritmos', '2026-01-20', 4),
('RPG', 'Games', 'Jogos de RPG com boa história', '2026-10-12', 6),
('Indie', 'Games', 'Jogos independentes', '2026-10-20', 6),
('Estante Teste', 'Teste', 'Estante usada no documento', '2026-10-28', 2);