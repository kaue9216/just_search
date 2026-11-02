# JustSearch

Atividade prática da PUCPR (Desenvolvimento Web / Arquitetura de Banco de Dados): **persistência em banco de dados, FRONT > BACK > BANCO**.

Aplicação web com CRUDs armazenados em **MySQL**, acessados por um back-end **PHP (MySQLi)** e consumidos por um front-end **HTML + CSS + JavaScript (`fetch` + `FormData`)**. A base de conteúdo é a *Apostila Módulo III (Aulas 7, 8 e 9)*, o exemplo do professor (`.template-giulio/`) e as instruções da atividade. Nada além do que foi visto em aula deve ser usado.

**Integrantes:** _(preencher nome de cada integrante e o CRUD pelo qual é responsável — exigido na entrega)_

---

## O que a atividade exige (resumo)

| Item | Regra |
|---|---|
| Quantidade de CRUDs | **1 aluno = 1 CRUD** completo (criar, listar, alterar, excluir), de ponta a ponta |
| Tabelas | Devem representar, sempre que possível, tabelas do modelo lógico do grupo em Banco de Dados |
| Armazenamento | Somente MySQL. **Proibido `localStorage`** |
| Arquitetura | O JS nunca acessa o banco; tudo passa por PHP |
| Conexão | Um único arquivo `conexao.php` |
| SQL | `prepare()` + `bind_param()` + `execute()` em tudo que recebe dado do usuário |
| Resposta | Sempre JSON `{status, mensagem, data}` |
| Front | `fetch()`, `FormData`, `resposta.json()` |
| Pastas | Organizadas por função (html, js, php) |
| Login/sessão | **Não é necessário** |
| Interface | Organizada e agradável; Bootstrap opcional, recomendado. CSS não é diferencial |
| Ambiente | XAMPP local |

**Entrega:** código completo, script `.sql` (banco + tabelas + registros de exemplo), identificação dos integrantes. Antes de entregar, importar o `.sql` em um banco **vazio** e testar do zero em outro navegador/janela anônima.

**Apresentação:** cada integrante explica o caminho completo do seu CRUD (digitação → `fetch`/`FormData` → PHP → SQL → tabela no phpMyAdmin → retorno e tela) e responde perguntas como *"por que usar `prepare()`/`bind_param()`?"* e *"por que o front não acessa o banco?"*. Uma aplicação simples que o grupo explica vale mais que uma complexa que não explica.

**Avaliação:** funcionamento do CRUD · persistência (mostrar no phpMyAdmin após cada operação) · arquitetura e comunicação · segurança básica (prepared statements, não expor dados de conexão) · organização do código · interface.

---

## Estado atual

| CRUD | Tabela | Responsável | Situação |
|---|---|---|---|
| Artigos | `artigos` | _(preencher)_ | ✅ Completo (Create, Read, Update, Delete) |
| Séries | _(a criar)_ | _(preencher)_ | ⏳ Só existe na RA1 (localStorage) |
| Livros | _(a criar)_ | _(preencher)_ | ⏳ Só existe na RA1 |
| Games | _(a criar)_ | _(preencher)_ | ⏳ Só existe na RA1 |
| Filmes | _(a criar)_ | _(preencher)_ | ⏳ Só existe na RA1 |

A RA1 tinha 5 módulos, o que sugere um grupo de 5. **Confirmar o número de integrantes**, pois define o mínimo de CRUDs. Conferir também se essas tabelas batem com o modelo lógico da disciplina de Banco de Dados.

Existe ainda um login/sessão (`cliente_login.php` etc.), seguindo o exemplo do professor. **Não é exigido pela atividade**; pode ficar como extra, mas não deve atrapalhar a demonstração dos CRUDs.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| FRONT | HTML5, CSS (Bootstrap opcional), JavaScript puro (`fetch`, `async/await`, `FormData`) |
| BACK | PHP procedural + MySQLi + prepared statements |
| BANCO | MySQL / MariaDB (InnoDB, `utf8mb4`) via XAMPP e phpMyAdmin |

## Estrutura de pastas

```
just_search/
├── index.html              # redireciona para login/
├── banco.sql               # CREATE DATABASE/TABLE + registros de exemplo
├── login/index.html        # login (extra, não exigido)
├── home/
│   ├── index.html          # lista de artigos
│   ├── artigos_novo.html
│   └── artigos_alterar.html
├── js/
│   ├── cliente_login.js, valida_sessao.js     # login/sessão (extra)
│   ├── index.js            # listar, excluir, logoff
│   ├── artigos_novo.js     # Create
│   └── artigos_alterar.js  # Read por id + Update
├── php/
│   ├── conexao.php         # único ponto de conexão
│   ├── cliente_login.php, cliente_logoff.php, valida_sessao.php   # extra
│   └── artigo_get.php | artigo_novo.php | artigo_alterar.php | artigo_excluir.php
├── .template-giulio/       # exemplo do professor (referência, não editar)
└── .historico_ra1/         # entrega anterior em localStorage (só histórico)
```

## Como rodar

1. Instale o **XAMPP** e inicie **Apache** e **MySQL**.
2. Copie o projeto para `C:\xampp\htdocs\projeto`.
3. Em `http://localhost/phpmyadmin`, aba *SQL*, execute [banco.sql](banco.sql).
4. Confira [php/conexao.php](php/conexao.php). O padrão do XAMPP é usuário `root` e **senha vazia**; hoje o arquivo está com a senha `"root"`, o que falha em um XAMPP padrão. Ajuste.
5. Abra `http://localhost/projeto/` (entrar com `admin` / `123`).

## Banco de dados

```
cliente (id PK, nome, email, usuario, senha, ativo, instagram)   -- só para o login extra
artigos (id PK, titulo, conteudo, autor)                          -- CRUD atual
```

## Fluxo e padrão de comunicação

Resposta de todo PHP: `{ "status": "ok" | "nok", "mensagem": "...", "data": [ ... ] }`

| Operação | JS envia | PHP recebe | Arquivo PHP |
|---|---|---|---|
| Listar | `fetch` GET | — | `artigo_get.php` |
| Buscar 1 | `fetch` GET `?id=X` | `$_GET['id']` | `artigo_get.php` |
| Inserir | `fetch` POST + `FormData` | `$_POST[...]` | `artigo_novo.php` |
| Alterar | `fetch` POST `?id=X` + `FormData` | `$_GET['id']` + `$_POST[...]` | `artigo_alterar.php` |
| Excluir | `fetch` GET `?id=X` | `$_GET['id']` | `artigo_excluir.php` |

(Excluir por GET e alterar com id na URL são o padrão da apostila, mantidos de propósito.)

## Revisão frente à apostila e à atividade

**Já em conformidade:** estrutura de pastas; padrão JSON; `prepare`/`bind_param` em todos os SQL; `fetch` + `FormData`; `$_GET` para id e `$_POST` para dados; `conexao.php` único; `utf8mb4`; script SQL com registros de exemplo; sem `localStorage`; senha de banco não aparece no front.

**A corrigir, em ordem de prioridade (impacto na nota):**

1. **Faltam 4 CRUDs** (séries, livros, games, filmes), se o grupo tiver 5 integrantes. Cada um segue o molde de `artigos`: tabela no `banco.sql`, 4 arquivos PHP, 2 HTMLs, 2 JS, e uma entrada na listagem.
2. **`conexao.php`:** o erro de conexão é impresso com `echo` (quebra o JSON); a apostila (seção 8.3) responde `nok` em JSON e dá `exit`. Corrigir a senha padrão também (item 4 de *Como rodar*).
3. **Validação nos PHP:** `artigo_novo.php` e `artigo_alterar.php` usam `$_POST[...]` direto. A apostila ensina `$_POST['x'] ?? ''` e `empty()` com retorno `nok` antes do `prepare()` (Aula 9, Q4).
4. **`confirm()` antes de excluir** (pedido no guia do professor, ausente em `js/index.js`).
5. **Interface:** hoje não há CSS. Reaproveitar o **Bootstrap 5.3.8** da RA1, com navegação entre os CRUDs. `conteudo` deveria ser `<textarea>`.
6. **Lista vazia:** `artigo_get.php` devolve `nok` e a tela fica em branco; exibir "Nenhum registro".
7. `artigos_alterar.js` dá `alert("SUCESSO")` só ao carregar o registro (herdado do guia); remover.
8. Menor: `lang="en"` nos HTMLs; `.gitignore`/`.gitattributes` vazios.

**Melhorias fora do escopo da disciplina** (opcionais; a apostila admite senha em texto puro e SQL com `innerHTML`): endpoints sem checagem de sessão, `password_hash`, escape de HTML na listagem. Só vale mexer se sobrar tempo e se o grupo conseguir explicar.

## Relação com a RA1 (`.historico_ra1/`)

A RA1 tinha cinco módulos em `localStorage` (Bootstrap, navegação por abas, registros ligados ao usuário por e-mail). Agora `localStorage` é proibido, então cada módulo vira uma tabela MySQL.

Campos da RA1, como ponto de partida para as tabelas:

| Módulo | Campos |
|---|---|
| Filmes | nome, data de lançamento, diretor, gênero, idioma |
| Livros | título, autor, gênero, editora |
| Séries | nome, autor, categoria, ano de lançamento |
| Games | nome, publisher, gênero, plataforma, ano |
| Artigos (RA1) | nome, categoria, síntese, privacidade (hoje: titulo, conteudo, autor) |

## Checklist de entrega

- [ ] Um CRUD completo por integrante
- [ ] `banco.sql` cria banco, tabelas e registros de exemplo
- [ ] Testado em banco vazio, em outro navegador/janela anônima
- [ ] Após cada operação, o registro aparece no phpMyAdmin
- [ ] Nenhum `localStorage`
- [ ] Integrantes identificados neste README
- [ ] Cada integrante consegue explicar fetch → PHP → SQL → tela do seu CRUD

Regras de código para quem for editar (inclusive o Cursor): [.cursor/rules/contexto-projeto.mdc](.cursor/rules/contexto-projeto.mdc).
