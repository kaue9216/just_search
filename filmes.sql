SET NAMES utf8mb4;
USE projeto;

-- drop table filmes;

CREATE TABLE IF NOT EXISTS filmes (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    sinopse TEXT NOT NULL,
    diretor VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    ano INT DEFAULT NULL,
    capa VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Se a tabela filmes já existia sem a coluna capa, adiciona:
ALTER TABLE filmes ADD COLUMN IF NOT EXISTS capa VARCHAR(255) DEFAULT NULL;

INSERT INTO filmes (titulo, sinopse, diretor, genero, ano, capa)
SELECT * FROM (
    SELECT 'Central do Brasil' AS t, 'Uma ex-professora que escreve cartas para analfabetos na estação Central do Brasil acaba acompanhando um menino em busca do pai pelo sertão nordestino.' AS s, 'Walter Salles' AS d, 'Drama' AS c, 1998 AS a, NULL AS capa
    UNION ALL SELECT 'Cidade de Deus', 'A trajetória de jovens que crescem em uma comunidade do Rio de Janeiro entre os anos 60 e 80, contada pelo olhar de um aspirante a fotógrafo.', 'Fernando Meirelles', 'Drama', 2002, NULL
    UNION ALL SELECT 'O Auto da Compadecida', 'João Grilo e Chicó vivem de pequenos golpes no sertão da Paraíba até que suas trapaças os levam a um julgamento inusitado.', 'Guel Arraes', 'Comédia', 2000, NULL
    UNION ALL SELECT 'Interestelar', 'Um grupo de exploradores atravessa um buraco de minhoca em busca de um novo lar para a humanidade.', 'Christopher Nolan', 'Ficção Científica', 2014, NULL
    UNION ALL SELECT 'A Viagem de Chihiro', 'Uma menina fica presa em um mundo de espíritos e precisa trabalhar em uma casa de banhos para salvar os pais.', 'Hayao Miyazaki', 'Animação', 2001, NULL
) x
WHERE NOT EXISTS (SELECT 1 FROM filmes);
