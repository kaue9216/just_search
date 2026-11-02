# Guia de Estudo — JustSearch

Este guia explica **o que é o projeto, o que o grupo precisa entregar, como o código funciona e por que ele foi escrito desse jeito**. Foi feito para você conseguir estudar, apresentar e responder as perguntas do professor. Também deve ser entendível por quem nunca viu o projeto.

> Os nomes de arquivo e trechos de código abaixo são os do projeto real. Quando algo é diferente do que o professor ensinou, isso está marcado com ⚠️.

## Índice

1. [O projeto em uma página](#1-o-projeto-em-uma-página)
2. [A tarefa: o que o grupo deve fazer](#2-a-tarefa-o-que-o-grupo-deve-fazer)
3. [Conceitos básicos (leia primeiro se for novo no assunto)](#3-conceitos-básicos)
4. [Mapa do projeto: cada pasta e arquivo](#4-mapa-do-projeto)
5. [O banco de dados](#5-o-banco-de-dados)
6. [O back-end (PHP) arquivo por arquivo](#6-o-back-end-php-arquivo-por-arquivo)
7. [O front-end (HTML e JavaScript) arquivo por arquivo](#7-o-front-end-html-e-javascript)
8. [O caminho completo de cada operação](#8-o-caminho-completo-de-cada-operação)
9. [Por que é feito desse jeito? (perguntas do professor)](#9-por-que-é-feito-desse-jeito)
10. [Como criar o seu CRUD (passo a passo)](#10-como-criar-o-seu-crud-passo-a-passo)
11. [Problemas conhecidos neste código](#11-problemas-conhecidos-neste-código)
12. [Erros comuns e como achar a causa](#12-erros-comuns-e-como-achar-a-causa)
13. [Roteiro da apresentação](#13-roteiro-da-apresentação)
14. [Glossário](#14-glossário)

---

## 1. O projeto em uma página

**JustSearch** é uma aplicação web para cadastrar conteúdos (hoje: **artigos**; a primeira versão do trabalho também tinha séries, livros, games e filmes). Para cada tipo de conteúdo, o usuário consegue:

- **C**riar um registro (cadastrar);
- **R**ler os registros (listar);
- **U**pdate: alterar um registro;
- **D**elete: excluir um registro.

Isso se chama **CRUD**.

O ponto principal do trabalho: os dados ficam guardados num **banco de dados MySQL**, não no navegador. Por isso, se você abrir o sistema em outro navegador ou outro computador (apontando para o mesmo servidor), verá os mesmos dados.

O sistema tem três camadas, e a tela **nunca** conversa direto com o banco:

```
 ┌──────────────┐   fetch()    ┌──────────────┐    SQL     ┌──────────────┐
 │   FRONT      │ ───────────▶ │    BACK      │ ─────────▶ │    BANCO     │
 │ HTML + JS    │ ◀─────────── │     PHP      │ ◀───────── │    MySQL     │
 │ (navegador)  │     JSON     │  (servidor)  │   linhas   │ (servidor)   │
 └──────────────┘              └──────────────┘            └──────────────┘
```

---

## 2. A tarefa: o que o grupo deve fazer

### 2.1 Regra principal: 1 aluno = 1 CRUD

| Integrantes no grupo | Mínimo de CRUDs |
|---|---|
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 5 |

Cada integrante é responsável por **um CRUD completo** (criar, listar, alterar, excluir), funcionando de ponta a ponta (tela → PHP → banco). **Não basta criar várias telas**; cada operação tem que funcionar de verdade.

Sempre que possível, o CRUD deve ser de uma **tabela real do modelo lógico** que o grupo está fazendo em Banco de Dados (por exemplo: Clientes, Produtos, Funcionários).

### 2.2 O que é obrigatório

| # | Requisito | Onde está no projeto |
|---|---|---|
| 1 | Rodar localmente no XAMPP | Pasta em `htdocs` |
| 2 | Dados em **MySQL**, criados por script SQL | [banco.sql](banco.sql) |
| 3 | **Não usar `localStorage`** | (era da RA1; agora proibido) |
| 4 | Estrutura FRONT > BACK > BANCO (JS nunca acessa o banco) | `js/` → `php/` → MySQL |
| 5 | Conexão em **um único arquivo** `conexao.php` | [php/conexao.php](php/conexao.php) |
| 6 | **Prepared statements** (`prepare` + `bind_param`) em tudo que recebe dado do usuário | todos os `php/artigo_*.php` |
| 7 | Resposta **sempre em JSON** no padrão `status` / `mensagem` / `data` | todos os PHP |
| 8 | Front com `fetch()`, `FormData` e `resposta.json()` | arquivos de `js/` |
| 9 | Ler dados com `$_POST` e `$_GET` | PHP |
| 10 | Arquivos organizados em pastas por função (html, js, php) | estrutura do projeto |
| 11 | Interface organizada e agradável (Bootstrap opcional) | ⚠️ ainda sem CSS |

**Não é necessário:** login, sessão, CSS complexo, frameworks. O login que existe no projeto é um extra baseado no exemplo do professor.

### 2.3 Como será a avaliação

| Critério | O que o professor olha |
|---|---|
| Funcionamento do CRUD | Cadastro, listagem, edição e exclusão funcionam |
| Persistência | Os dados **realmente** estão no MySQL: você deve abrir o **phpMyAdmin** e mostrar a tabela **depois de cada operação** |
| Arquitetura e comunicação | Separação front/back/banco; uso correto de `fetch`, `FormData`, `$_POST`, `$_GET`, JSON |
| Segurança básica | `prepare()` + `bind_param()` (sem concatenar SQL); dados de conexão fora do front |
| Organização | Pastas e arquivos separados por função; código claro |
| Interface | Organizada e fácil de usar (CSS não pesa muito) |

### 2.4 Fontes permitidas

Só o que foi visto na disciplina: a **Apostila do Módulo III (Aulas 7, 8 e 9)**, as aulas e o **exemplo do professor** (pasta `.template-giulio/`, com o CRUD de `cliente`). Não use bibliotecas ou técnicas que não foram ensinadas.

### 2.5 O que entregar

1. Código-fonte completo (HTML, CSS, JS e PHP);
2. Script `.sql` que cria o banco e as tabelas **e inclui alguns registros de exemplo**;
3. Todos os arquivos necessários para rodar;
4. Aplicação funcionando;
5. Identificação dos integrantes.

**Teste antes de entregar:** importe o `.sql` num banco **vazio**, abra a aplicação em **outro navegador ou janela anônima** e confira se tudo funciona e se os dados continuam lá.

### 2.6 A apresentação

Cada pessoa explica **o seu CRUD**, mostrando o caminho completo de cada operação:

1. Como os dados são digitados e enviados (`fetch` + `FormData`);
2. Como o PHP recebe e executa o SQL;
3. Como os dados são gravados e aparecem no phpMyAdmin;
4. Como são lidos e mostrados na tela;
5. Como são alterados e excluídos.

O professor pode perguntar, por exemplo: *por que usar `prepare()` e `bind_param()`? Por que o front-end não acessa o banco diretamente?* (respostas na [seção 9](#9-por-que-é-feito-desse-jeito)).

> **Regra de ouro do professor:** uma aplicação simples, que funciona e que vocês sabem explicar, vale mais que uma aplicação bonita e complexa que vocês não sabem explicar. **Não copie o que você não entende.**

### 2.7 Divisão de trabalho (a preencher)

| Integrante | CRUD | Tabela | Situação |
|---|---|---|---|
| _(nome)_ | Artigos | `artigos` | ✅ Pronto |
| _(nome)_ | Séries | _(criar)_ | ⏳ |
| _(nome)_ | Livros | _(criar)_ | ⏳ |
| _(nome)_ | Games | _(criar)_ | ⏳ |
| _(nome)_ | Filmes | _(criar)_ | ⏳ |

---

## 3. Conceitos básicos

### Cliente e servidor
- **Cliente** = o navegador (Chrome, Edge). Roda **HTML, CSS e JavaScript**. O usuário pode ver e mexer nesse código.
- **Servidor** = o computador que responde (aqui, o seu XAMPP). Roda **PHP** e **MySQL**. O código PHP não é visto pelo usuário.

### Por que existe o PHP no meio?
O JavaScript do navegador **não pode** (e não deve) falar com o banco: qualquer pessoa veria a senha do banco no código e poderia apagar tudo. Então o JS pede ao PHP, e só o PHP fala com o banco.

### XAMPP
Programa que instala no seu computador o **Apache** (servidor web que executa PHP), o **MySQL** (banco) e o **phpMyAdmin** (tela para ver o banco). Os arquivos do projeto ficam em `C:\xampp\htdocs\projeto` e abrem em `http://localhost/projeto/`.

> ⚠️ Abrir o `.html` com duplo clique (`file:///...`) **não funciona**: o PHP só roda se a página for aberta pelo `http://localhost/...`.

### JSON
Formato de texto para trocar dados entre JS e PHP. Parece um objeto do JavaScript:
```json
{ "status": "ok", "mensagem": "Consulta efetuada.", "data": [ {"id":1,"titulo":"..."} ] }
```
- PHP cria com `json_encode($array)`.
- JS lê com `await resposta.json()`.

### O padrão de resposta do projeto
**Todo** arquivo PHP responde com a mesma forma. Assim o JS sempre sabe o que esperar:

| Campo | Significado |
|---|---|
| `status` | `"ok"` se deu certo, `"nok"` se falhou |
| `mensagem` | texto para mostrar ao usuário |
| `data` | lista de registros (vazia quando não há dados, ex.: ao excluir) |

### fetch, FormData, async/await (JavaScript)
- `fetch(url)` faz uma requisição HTTP ao servidor.
- `FormData` empacota os campos de um formulário para enviar no corpo (body) de um POST.
- `await` espera a resposta chegar; só funciona dentro de uma função `async`.

### GET e POST
| | Onde vão os dados | Aparece na URL? | Uso no projeto |
|---|---|---|---|
| **GET** | Na URL (`?id=5`) | Sim | listar, buscar por id, excluir |
| **POST** | No corpo da requisição | Não | inserir e alterar (dados dos campos) |

No PHP: `$_GET['id']` lê o que veio na URL; `$_POST['titulo']` lê o que veio no `FormData`.

### SQL: as 4 operações
| Operação | SQL | Exemplo |
|---|---|---|
| Create | `INSERT` | `INSERT INTO artigos (titulo, conteudo, autor) VALUES (?, ?, ?)` |
| Read | `SELECT` | `SELECT * FROM artigos WHERE id = ?` |
| Update | `UPDATE` | `UPDATE artigos SET titulo=?, ... WHERE id=?` |
| Delete | `DELETE` | `DELETE FROM artigos WHERE id = ?` |

### Prepared statements (a parte de segurança)
**SQL Injection** é quando alguém digita código SQL num campo. Exemplo: no login, a senha `' OR '1'='1` faria qualquer um entrar se o SQL fosse montado juntando textos.

A solução é separar o **comando** dos **valores**:
```php
$stmt = $conexao->prepare("SELECT * FROM artigos WHERE id = ?"); // 1) comando com "?"
$stmt->bind_param("i", $id);                                      // 2) valores entram depois
$stmt->execute();                                                 // 3) executa
```
O banco trata o que foi digitado **só como dado**, nunca como comando.

`bind_param` usa letras para o tipo de cada `?` (na ordem): `i` = inteiro, `s` = texto, `d` = decimal. Ex.: `"sssi"` = 3 textos e 1 inteiro.

---

## 4. Mapa do projeto

```
just_search/
├── index.html                 Redireciona para login/
├── banco.sql                  Cria banco, tabelas e dados de exemplo
├── login/
│   └── index.html             Tela de login (extra)
├── home/
│   ├── index.html             Lista de artigos + botões "Novo" e "Logoff"
│   ├── artigos_novo.html      Formulário de cadastro
│   └── artigos_alterar.html   Formulário de edição
├── js/
│   ├── cliente_login.js       Envia usuário/senha (extra)
│   ├── valida_sessao.js       Confere se está logado (extra)
│   ├── index.js               Lista, exclui e faz logoff
│   ├── artigos_novo.js        Envia o novo artigo
│   └── artigos_alterar.js     Carrega e altera um artigo
├── php/
│   ├── conexao.php            Conecta no MySQL (usado por todos)
│   ├── artigo_get.php         SELECT  (todos ou um)
│   ├── artigo_novo.php        INSERT
│   ├── artigo_alterar.php     UPDATE
│   ├── artigo_excluir.php     DELETE
│   ├── cliente_login.php      Confere usuário/senha, abre sessão (extra)
│   ├── cliente_logoff.php     Encerra sessão (extra)
│   └── valida_sessao.php      Diz se há sessão ativa (extra)
├── .template-giulio/          Exemplo do professor (só leitura)
└── .historico_ra1/            Primeira entrega, com localStorage (só histórico)
```

**Por que separar assim?** Cada pasta tem uma função (HTML = tela, JS = comportamento, PHP = servidor), e cada operação tem seu próprio arquivo PHP. Fica fácil achar onde está um problema.

**Convenção de nomes** (siga para o seu CRUD): `php/<coisa>_get.php`, `_novo.php`, `_alterar.php`, `_excluir.php`; `home/<coisa>_novo.html`, `_alterar.html`; `js/<coisa>_novo.js`, `_alterar.js`.

---

## 5. O banco de dados

Arquivo: [banco.sql](banco.sql). Você executa uma vez no phpMyAdmin (aba **SQL**).

```sql
CREATE DATABASE IF NOT EXISTS projeto CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projeto;
```
Cria o banco `projeto` (se não existir) com `utf8mb4`, que aceita acentos e emojis. `USE projeto` diz "daqui pra frente, trabalhe neste banco".

### Tabela `artigos` (o CRUD atual)

```sql
CREATE TABLE IF NOT EXISTS artigos (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    autor VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

| Coluna | Tipo | Por quê |
|---|---|---|
| `id` | `INT AUTO_INCREMENT` + `PRIMARY KEY` | identifica cada registro de forma única; o MySQL numera sozinho (1, 2, 3...). É por ele que alteramos e excluímos |
| `titulo` | `VARCHAR(150)` | texto curto, até 150 caracteres |
| `conteudo` | `TEXT` | texto longo |
| `autor` | `VARCHAR(100)` | texto curto |

`NOT NULL` = campo obrigatório no banco. `IF NOT EXISTS` evita erro se rodar o script de novo.

### Tabela `cliente` (só para o login extra)

Tem `id, nome, email, usuario, senha, ativo, instagram`, e é a mesma tabela do exemplo do professor. É usada apenas para conferir usuário e senha.

### Dados de exemplo
O script insere o usuário `admin` (senha `123`) e 3 artigos. A entrega **exige** registros de exemplo no `.sql`.

### Dica para o seu CRUD
Seu `CREATE TABLE` entra neste mesmo `banco.sql`, **junto com alguns `INSERT` de exemplo**. Lembre que o script precisa rodar em um banco vazio sem erros.

---

## 6. O back-end (PHP) arquivo por arquivo

Todos os PHP seguem **o mesmo esqueleto**. Entenda esse esqueleto uma vez e você entende todos:

```php
<?php
include_once('conexao.php');                       // 1. traz a conexão ($conexao)

$retorno = ['status'=>'', 'mensagem'=>'', 'data'=>[]];   // 2. resposta padrão (vazia)

// 3. ... lê dados ($_POST / $_GET), prepara o SQL, executa, preenche $retorno ...

$stmt->close();                                    // 4. libera o comando
$conexao->close();                                 // 5. fecha a conexão
header("Content-type:application/json;charset=utf-8");   // 6. avisa "isto é JSON"
echo json_encode($retorno);                        // 7. envia a resposta
```

### 6.1 [php/conexao.php](php/conexao.php): a conexão com o banco

```php
$servidor   = "localhost";
$usuario    = "root";
$senha      = "root";      // ⚠️ no XAMPP padrão a senha é vazia ("")
$nome_banco = "projeto";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if($conexao->connect_error){
    echo $conexao->connect_error;     // ⚠️ ver seção 11
}
$conexao->set_charset("utf8mb4");
```
- Cria o objeto `$conexao` com o **host, usuário, senha e nome do banco**.
- É um **arquivo único** de propósito: se mudar a senha, muda num lugar só. Os outros PHP fazem `include_once('conexao.php')`.
- `set_charset("utf8mb4")` faz acentos funcionarem.
- A senha do banco fica **só no PHP**, que o usuário não consegue ler. Esse é um dos itens de segurança avaliados.

### 6.2 [php/artigo_get.php](php/artigo_get.php): **R**ead (listar ou buscar um)

```php
if(isset($_GET['id'])){
    $stmt = $conexao->prepare("SELECT * FROM artigos WHERE id = ?");
    $stmt->bind_param("i", $_GET['id']);
}else{
    $stmt = $conexao->prepare("SELECT * FROM artigos");
}
$stmt->execute();
$resultado = $stmt->get_result();

$tabela = [];
if($resultado->num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] = $linha;
    }
    $retorno = ['status'=>'ok', 'mensagem'=>'Sucesso, consulta efetuada.', 'data'=>$tabela];
}else{
    $retorno = ['status'=>'nok', 'mensagem'=>'Não há registros', 'data'=>[]];
}
```
Passo a passo:
1. `isset($_GET['id'])` → "veio `?id=` na URL?". **Se sim**, busca só aquele artigo (`WHERE id = ?`, com `"i"` porque id é inteiro). **Se não**, busca todos.
2. `execute()` roda o SELECT; `get_result()` pega as linhas.
3. `num_rows > 0` → existem linhas? Se sim, o `while` percorre cada uma com `fetch_assoc()` (que devolve a linha como array associativo, ex.: `['id'=>1, 'titulo'=>'...']`) e coloca em `$tabela[]`.
4. Responde `ok` com `data = $tabela`; se não achou nada, responde `nok`.

**Um arquivo, dois usos:** a lista da home chama `artigo_get.php`; a tela de alterar chama `artigo_get.php?id=3`.

### 6.3 [php/artigo_novo.php](php/artigo_novo.php): **C**reate

```php
$titulo   = $_POST['titulo'];
$conteudo = $_POST['conteudo'];
$autor    = $_POST['autor'];

$stmt = $conexao->prepare("INSERT INTO artigos (titulo, conteudo, autor) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $titulo, $conteudo, $autor);
$stmt->execute();

if($stmt->affected_rows > 0){ /* ok: 'registro inserido com sucesso' */ }
else                         { /* nok: 'falha ao inserir o registro' */ }
```
- Os dados vêm do `FormData` do JS e chegam em `$_POST`.
- Três `?` → três valores → `"sss"` (três textos).
- `affected_rows` = quantas linhas o comando afetou. Se for **maior que 0**, a linha foi inserida.

### 6.4 [php/artigo_alterar.php](php/artigo_alterar.php): **U**pdate

```php
if(isset($_GET['id'])){
    $titulo = $_POST['titulo']; $conteudo = $_POST['conteudo']; $autor = $_POST['autor'];

    $stmt = $conexao->prepare("UPDATE artigos SET titulo = ?, conteudo = ?, autor = ? WHERE id = ?");
    $stmt->bind_param("sssi", $titulo, $conteudo, $autor, $_GET['id']);
    $stmt->execute();

    if($stmt->affected_rows > 0)       { /* ok: 'Registro alterado com sucesso.' */ }
    else if($stmt->affected_rows == 0) { /* ok: 'Nenhum dado foi alterado.' */ }
    else                               { /* nok: 'Falha ao alterar o registro.' */ }
}else{
    /* nok: 'Não posso alterar um registro sem um ID informado.' */
}
```
- **O id vem pela URL (`$_GET`) e os dados novos pelo corpo (`$_POST`).** O id diz *qual* registro; o corpo diz *com o quê*.
- ⚠️ **O `WHERE id = ?` é essencial.** Sem ele, o UPDATE alteraria **todas** as linhas da tabela.
- `"sssi"` = 3 textos + 1 inteiro (o id), na mesma ordem dos `?`.
- Se o usuário clicar em salvar sem mudar nada, o MySQL devolve `affected_rows = 0`. O projeto trata isso como `ok` ("Nenhum dado foi alterado"). Na apostila, esse caso volta `nok`; aqui foi melhorado.

### 6.5 [php/artigo_excluir.php](php/artigo_excluir.php): **D**elete

```php
if(isset($_GET['id'])){
    $stmt = $conexao->prepare("DELETE FROM artigos WHERE id = ?");
    $stmt->bind_param("i", $_GET['id']);
    $stmt->execute();
    if($stmt->affected_rows > 0){ /* ok: 'Registro excluido' */ }
    else                        { /* nok: 'Registro não excluido' */ }
}else{
    /* nok: 'É necessário informar um ID para exclusão' */
}
```
Também usa só o `id` pela URL. ⚠️ Assim como no UPDATE, o `WHERE id = ?` é o que impede de apagar a tabela inteira.

### 6.6 Os PHP do login (extras)

| Arquivo | O que faz |
|---|---|
| [php/cliente_login.php](php/cliente_login.php) | `SELECT * FROM cliente WHERE usuario = ? AND senha = ?`. Se achou, `session_start()` e guarda o usuário em `$_SESSION['usuario']` |
| [php/valida_sessao.php](php/valida_sessao.php) | `session_start()` e responde `ok` se `$_SESSION['usuario']` existe, senão `nok` |
| [php/cliente_logoff.php](php/cliente_logoff.php) | `session_unset()` + `session_destroy()` e responde `ok` |

**Sessão** = o servidor "lembra" quem você é entre uma requisição e outra, usando um cookie. É isso que mantém você logado ao trocar de página.

---

## 7. O front-end (HTML e JavaScript)

### 7.1 Como HTML e JS trabalham juntos

Cada página HTML tem os campos (`<input id="titulo">`) e carrega seu JS no fim:
```html
<script src="../js/artigos_novo.js"></script>
<script src="../js/valida_sessao.js"></script>
```
O JS encontra os campos pelo `id` com `document.getElementById("titulo")`. **O `id` no HTML e o nome usado no JS precisam ser idênticos.** O caminho `../js/` sobe uma pasta (de `home/` para a raiz) e entra em `js/`.

### 7.2 [home/index.html](home/index.html) + [js/index.js](js/index.js): a lista

O HTML tem os botões `#novo` e `#logoff` e uma `<div id="lista">` vazia. Quem preenche é o JS:

```js
document.addEventListener("DOMContentLoaded", () => {   // quando a página termina de carregar
    valida_sessao();    // (extra) confere login
    buscar();           // carrega a lista
});

async function buscar() {
    const retorno  = await fetch("../php/artigo_get.php");   // pede ao PHP
    const resposta = await retorno.json();                   // converte JSON → objeto JS
    if (resposta.status == "ok") {
        preencherTabela(resposta.data);                      // desenha a tabela
    }
}
```
`preencherTabela` monta um texto HTML com um `for` (uma `<tr>` por artigo) e joga na `<div id="lista">` com `innerHTML`. Cada linha tem dois links:
```html
<a href='artigos_alterar.html?id=${tabela[i].id}'>Alterar</a>
<a href='#' onclick='excluir(${tabela[i].id})'>Excluir</a>
```
- **Alterar** leva para a outra página **passando o id na URL**.
- **Excluir** chama a função `excluir(id)`:

```js
async function excluir(id) {
    const retorno  = await fetch("../php/artigo_excluir.php?id=" + id);
    const resposta = await retorno.json();
    alert(resposta.mensagem);
    if (resposta.status == "ok") window.location.reload();   // recarrega p/ atualizar a lista
}
```
⚠️ Falta um `confirm("Tem certeza?")` antes de excluir (o guia do professor pede isso).

### 7.3 [home/artigos_novo.html](home/artigos_novo.html) + [js/artigos_novo.js](js/artigos_novo.js): cadastrar

```js
document.getElementById("enviar").addEventListener("click", () => { novo(); });

async function novo() {
    var titulo   = document.getElementById("titulo").value;     // lê o que foi digitado
    var conteudo = document.getElementById("conteudo").value;
    var autor    = document.getElementById("autor").value;

    const fd = new FormData();            // monta o "pacote" de dados
    fd.append("titulo", titulo);          // o nome aqui = $_POST['titulo'] no PHP
    fd.append("conteudo", conteudo);
    fd.append("autor", autor);

    const retorno = await fetch("../php/artigo_novo.php", { method: 'POST', body: fd });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "../home/";           // volta para a lista
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
```
**O nome passado em `fd.append("titulo", ...)` precisa ser exatamente o mesmo de `$_POST['titulo']` no PHP.** Se errar uma letra, o PHP não recebe o dado.

### 7.4 [home/artigos_alterar.html](home/artigos_alterar.html) + [js/artigos_alterar.js](js/artigos_alterar.js): alterar (duas fases)

O formulário de alteração tem um campo escondido que guarda o id: `<input type="hidden" id="id">`.

**Fase 1: carregar o registro e preencher o formulário**
```js
document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    const url = new URLSearchParams(window.location.search);  // lê "?id=3" da URL da página
    const id  = url.get("id");                                // → "3"
    buscar(id);
});

async function buscar(id) {
    const retorno  = await fetch("../php/artigo_get.php?id=" + id);   // GET com id
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        var registro = resposta.data[0];                              // o único item da lista
        document.getElementById("titulo").value   = registro.titulo;  // preenche os campos
        document.getElementById("conteudo").value = registro.conteudo;
        document.getElementById("autor").value    = registro.autor;
        document.getElementById("id").value       = id;               // guarda no campo escondido
    } else {
        alert("ERRO:" + resposta.mensagem);
        window.location.href = "../home/";
    }
}
```
**Fase 2: enviar a alteração**
```js
async function alterar() {
    /* lê titulo, conteudo, autor e id dos campos, monta o FormData com os 3 primeiros */
    const retorno = await fetch("../php/artigo_alterar.php?id=" + id,   // id na URL
        { method: 'POST', body: fd });                                  // dados no corpo
    /* se ok: alert + volta para ../home/ ; senão: alert de erro */
}
```
⚠️ Na fase 1 há um `alert("SUCESSO:...")` logo ao abrir a tela (herdado do exemplo do professor); atrapalha o uso e pode ser removido.

### 7.5 Login e sessão no front (extras)

- [js/cliente_login.js](js/cliente_login.js): envia usuário e senha por `FormData` (POST) para `cliente_login.php`; se `ok`, vai para `../home/`; senão `alert("Credenciais invalidas.")`.
- [js/valida_sessao.js](js/valida_sessao.js): pergunta ao `valida_sessao.php`; se vier `nok`, redireciona para `../login/`. É chamado no começo de toda página da área interna.

---

## 8. O caminho completo de cada operação

Esta é **a resposta para a apresentação**. Os passos se repetem em todo CRUD.

### 8.1 Cadastrar (Create)

```
Usuário preenche o form e clica "Enviar"
  → js/artigos_novo.js: o clique chama novo()
  → lê os campos, monta FormData (titulo, conteudo, autor)
  → fetch POST → php/artigo_novo.php
        → include conexao.php  (conecta no MySQL)
        → lê $_POST
        → prepare("INSERT ... VALUES (?,?,?)") + bind_param("sss") + execute()
        → MySQL grava a linha na tabela artigos     ← aparece no phpMyAdmin
        → affected_rows > 0 → $retorno = status "ok"
        → json_encode($retorno)
  → JS recebe o JSON → status "ok" → alert + redireciona para a lista
```

### 8.2 Listar (Read)

```
Página home/index.html carrega (DOMContentLoaded)
  → js/index.js: buscar()
  → fetch GET → php/artigo_get.php   (sem id)
        → prepare("SELECT * FROM artigos") + execute() + get_result()
        → while fetch_assoc() monta o array $tabela
        → $retorno = ok + data=$tabela → json_encode
  → JS: resposta.data → preencherTabela() → monta o HTML → innerHTML na #lista
```

### 8.3 Alterar (Update)

```
Clique em "Alterar" → vai para artigos_alterar.html?id=3
  FASE 1  → artigos_alterar.js lê o id da URL
          → fetch GET artigo_get.php?id=3 → preenche os campos
  FASE 2  → usuário edita e clica "Enviar"
          → FormData + fetch POST artigo_alterar.php?id=3
                → $_GET['id'] = 3 ; $_POST = novos dados
                → prepare("UPDATE ... WHERE id = ?") + bind_param("sssi") + execute()
                → MySQL atualiza a linha ← confira no phpMyAdmin
          → JS: status ok → alert + volta para a lista
```

### 8.4 Excluir (Delete)

```
Clique em "Excluir" → onclick chama excluir(3)
  → js/index.js: fetch GET php/artigo_excluir.php?id=3
        → prepare("DELETE FROM artigos WHERE id = ?") + bind_param("i") + execute()
        → MySQL remove a linha ← some no phpMyAdmin
        → affected_rows > 0 → "Registro excluido"
  → JS: alert(mensagem) + window.location.reload()
  → a página recarrega, chama buscar() de novo e a lista aparece sem o item
```

### 8.5 Login e logoff (extra)

```
Login:  login/index.html → cliente_login.js → POST cliente_login.php
          → SELECT ... WHERE usuario=? AND senha=? → se achou, abre $_SESSION
          → ok → vai para home/
Páginas internas: valida_sessao.js → valida_sessao.php → ok mantém / nok volta p/ login
Logoff: botão → cliente_logoff.php (session_destroy) → volta para login
```

---

## 9. Por que é feito desse jeito?

Perguntas que o professor pode fazer, com respostas curtas:

**Por que o front-end não acessa o banco diretamente?**
Porque o JavaScript roda no navegador, onde qualquer pessoa vê e altera o código. Se o JS tivesse usuário e senha do banco, qualquer um poderia ler, alterar ou apagar tudo. O PHP roda no servidor, onde o usuário não vê o código, e só devolve o JSON necessário.

**Por que usar `prepare()` e `bind_param()`?**
Para evitar **SQL Injection**. Com `prepare()`, o comando SQL é enviado primeiro, com `?` no lugar dos valores; com `bind_param()`, os valores entram depois e o banco os trata só como dados. Assim, mesmo que alguém digite `' OR '1'='1`, isso nunca vira comando SQL.

**Qual a diferença entre `query()` e `prepare()`?**
`query()` executa um texto SQL pronto (se ele tiver dados do usuário colados, é vulnerável). `prepare()` separa o SQL dos dados.

**Por que sempre responder em JSON no mesmo padrão?**
Para o JavaScript saber sempre o que esperar: basta olhar `status` para decidir o que fazer e `mensagem` para avisar o usuário.

**Por que o id vai por `$_GET` e os dados por `$_POST` na alteração?**
O id identifica *qual* registro (fica na URL, é simples de ler); os dados são o conteúdo novo (vão no corpo do POST). Separar deixa claro o que é identificador e o que é dado.

**Por que um arquivo PHP para cada operação?**
Facilita manutenção e achar problemas: se a exclusão falha, o erro está em `artigo_excluir.php`.

**Por que `conexao.php` é um arquivo único?**
Para mudar usuário/senha/banco em um lugar só, e para que a senha do banco fique apenas no servidor.

**Por que `affected_rows`?**
Informa quantas linhas o comando alterou. Se foi maior que 0, o INSERT/UPDATE/DELETE realmente aconteceu.

**Por que `$stmt->close()` e `$conexao->close()`?**
Para liberar recursos. Em servidores com muitos usuários, conexões abertas à toa se acumulam.

**Por que o `WHERE id = ?` é tão importante no UPDATE e no DELETE?**
Sem ele, o comando vale para **todas** as linhas da tabela.

**Por que usar `DOMContentLoaded`?**
Para só executar o JS depois que o HTML terminou de carregar. Antes disso, `getElementById` não encontraria os elementos.

**Por que usar banco em vez de `localStorage`?**
`localStorage` guarda dados só naquele navegador. O banco guarda no servidor: os dados ficam disponíveis em qualquer navegador ou computador e não somem ao limpar o navegador.

**Por que `async/await`?**
`fetch` demora (rede + servidor). Com `await`, o código espera a resposta antes de seguir, sem travar a página.

---

## 10. Como criar o seu CRUD (passo a passo)

Use **artigos como molde**: copie os arquivos e troque os nomes e campos. Exemplo para o CRUD de **filmes** (campos da RA1: nome, ano, diretor, gênero, idioma):

### Passo 1: Tabela no `banco.sql`
```sql
CREATE TABLE IF NOT EXISTS filmes (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    ano INT,
    diretor VARCHAR(100),
    genero VARCHAR(50),
    idioma VARCHAR(50),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO filmes (nome, ano, diretor, genero, idioma) VALUES
('Exemplo de Filme', 2020, 'Fulano', 'Drama', 'Português');
```
Combine os campos com o modelo lógico de Banco de Dados do grupo.

### Passo 2: Os 4 arquivos PHP
Copie `artigo_get.php`, `artigo_novo.php`, `artigo_alterar.php`, `artigo_excluir.php` para `filme_*.php` e troque:
- o nome da tabela (`artigos` → `filmes`);
- as colunas nos SQL;
- o `$_POST[...]`;
- **a string de tipos do `bind_param`**: uma letra por `?`, na ordem (ex.: nome=s, ano=i, diretor=s, genero=s, idioma=s → `"sisss"`).

### Passo 3: Páginas HTML
`filmes_novo.html` e `filmes_alterar.html`: um `<input id="...">` por campo (o alterar tem também `<input type="hidden" id="id">`). Os `id` devem ser os que o JS usa. Use `type="number"` para número e `<textarea>` para texto longo.

### Passo 4: Arquivos JS
`filmes_novo.js` e `filmes_alterar.js`: troque os campos lidos (`getElementById`), os nomes do `fd.append` e as URLs do `fetch`.

### Passo 5: A lista
Mostre a tabela de filmes (uma `<div id="lista">` + `buscar()` + `preencherTabela()`), com links Alterar/Excluir. Se tiver várias listas, cada CRUD terá sua página/JS de lista, ou uma navegação entre eles.

### Passo 6: Testar (nessa ordem)
1. Importe o `.sql` num banco vazio. A tabela e o exemplo aparecem?
2. Abra `http://localhost/.../php/filme_get.php` direto no navegador. Aparece JSON com `"status":"ok"`?
3. Cadastre → confira no phpMyAdmin.
4. Altere → confira no phpMyAdmin.
5. Exclua → confira no phpMyAdmin.
6. Teste em outro navegador/janela anônima.

> Dica: testar o PHP direto pela URL (passo 2) separa "o problema é no PHP/banco" de "o problema é no JS".

---

## 11. Problemas conhecidos neste código

Pontos que a revisão encontrou, em ordem de importância para a nota. Conhecê-los ajuda a explicar e a corrigir:

| # | Problema | Onde | Por que importa / como corrigir |
|---|---|---|---|
| 1 | Só existe 1 CRUD (artigos) | projeto | Precisa de 1 por integrante |
| 2 | Senha do banco `"root"` | `conexao.php` | No XAMPP padrão a senha é vazia (`""`); com `"root"` a conexão falha. Ajuste conforme seu MySQL |
| 3 | Erro de conexão sai com `echo` simples | `conexao.php` | Quebra o JSON. A apostila (8.3) responde um JSON `nok` e usa `exit` |
| 4 | `$_POST[...]` usado sem validar | `artigo_novo.php`, `artigo_alterar.php` | A apostila ensina `$_POST['x'] ?? ''` e `empty()` para devolver `nok` com mensagem antes do `prepare()` |
| 5 | Excluir sem pedir confirmação | `js/index.js` | O guia do professor pede `confirm()` |
| 6 | Sem CSS | todos os HTML | Aplicar Bootstrap (como na RA1) e uma navegação entre os CRUDs |
| 7 | Lista vazia fica em branco | `index.js` / `artigo_get.php` | Quando não há registros o PHP responde `nok` e o JS não mostra nada; mostrar "Nenhum registro" |
| 8 | `alert("SUCESSO")` ao carregar a tela de alterar | `artigos_alterar.js` | Atrapalha o usuário; remover |
| 9 | Campo `conteudo` é `<input>` | HTMLs | Para texto longo é melhor `<textarea>` |
| 10 | `lang="en"` nos HTMLs | HTMLs | O conteúdo é português |

**Fora do escopo da disciplina** (a apostila admite): senha em texto puro, endpoints sem checagem de sessão no servidor, texto inserido por `innerHTML` sem escape (risco de XSS). Só vale mexer se sobrar tempo **e** o grupo conseguir explicar.

---

## 12. Erros comuns e como achar a causa

**Ferramentas:** Console do navegador (**F12 → Console** e aba **Network**) e o phpMyAdmin.

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Nada acontece ao clicar | Erro de JS ou `id` errado no `getElementById` | F12 → Console; confira se o `id` do HTML é o mesmo do JS |
| `Unexpected token '<'` / `JSON.parse` | O PHP respondeu HTML/erro em vez de JSON | Aba Network → resposta do PHP; abra o PHP direto na URL e leia o erro |
| Erro 404 | Caminho errado (`../php/...`) ou projeto fora de `htdocs` | Confira a pasta e acesse por `http://localhost/` |
| `Access denied for user` | Usuário/senha do banco errados em `conexao.php` | Ajuste a senha para a do seu MySQL |
| `Unknown database 'projeto'` | O `.sql` não foi importado | Execute o `banco.sql` no phpMyAdmin |
| `Undefined array key "titulo"` | Nome do campo no `fd.append` diferente do `$_POST` | Igualar os nomes |
| Dado cadastrado não aparece | Gravou mas a lista não recarregou, ou erro no SELECT | Confira no phpMyAdmin se a linha existe |
| Acentos viram `Ã©` | Charset errado | `set_charset("utf8mb4")` e `<meta charset="UTF-8">` |
| "Nenhum dado foi alterado" ao salvar | Nenhum campo mudou | Normal: `affected_rows` foi 0 |
| `bind_param` com erro de contagem | String de tipos não bate com os `?` | Uma letra por `?`, na mesma ordem |
| Funciona no seu PC, falha em outro | Senha/porta do MySQL diferentes, banco não importado | Reimportar o `.sql` e ajustar `conexao.php` |
| Página abre mas PHP não roda | Aberto como `file:///` | Abrir por `http://localhost/...` |

---

## 13. Roteiro da apresentação

Sugestão para os ~minutos de cada integrante (adapte ao seu CRUD):

1. **Contexto (30s):** "Meu CRUD é de ___; a tabela se chama ___ e tem os campos ___."
2. **Banco:** abra o phpMyAdmin e mostre a tabela com os registros de exemplo.
3. **Cadastrar:** crie um registro na tela → volte ao phpMyAdmin (F5) → "ele apareceu aqui". Explique o caminho: campo → `FormData` → `fetch` → `$_POST` → `prepare/bind_param/execute` → tabela.
4. **Listar:** mostre a lista e explique `artigo_get.php` (sem id), o `while fetch_assoc` e o `preencherTabela`.
5. **Alterar:** clique em Alterar (mostre o `?id=` na URL), explique as duas fases, salve e mostre a mudança no phpMyAdmin.
6. **Excluir:** exclua e mostre que sumiu da lista **e** da tabela.
7. **Segurança e arquitetura:** explique `prepare()`/`bind_param()` e por que o JS não acessa o banco; mostre o `conexao.php`.
8. **Persistência:** abra em janela anônima e mostre que os dados continuam lá.

**Checklist antes de apresentar**
- [ ] Apache e MySQL ligados no XAMPP
- [ ] Banco importado do `.sql` a partir do zero
- [ ] `conexao.php` com a senha certa para a máquina da apresentação
- [ ] phpMyAdmin aberto em outra aba
- [ ] Cada operação testada uma vez
- [ ] Todos sabem explicar o próprio CRUD **sem ler o código**

---

## 14. Glossário

| Termo | Significado |
|---|---|
| **CRUD** | Create, Read, Update, Delete: as 4 operações básicas sobre dados |
| **Front-end** | O que roda no navegador (HTML, CSS, JS) |
| **Back-end** | O que roda no servidor (PHP) |
| **Banco de dados** | Onde os dados são guardados de forma permanente (MySQL) |
| **Tabela / registro / coluna** | Tabela = conjunto de dados; registro = uma linha; coluna = um campo |
| **Chave primária (PK)** | Coluna que identifica cada linha de forma única (`id`) |
| **AUTO_INCREMENT** | O banco numera o `id` sozinho |
| **XAMPP** | Pacote com Apache + MySQL + PHP + phpMyAdmin |
| **phpMyAdmin** | Interface web para ver/gerenciar o MySQL |
| **MySQLi** | Extensão do PHP para falar com o MySQL ("i" = improved) |
| **Prepared statement** | Comando SQL com `?` e valores enviados separados; evita SQL Injection |
| **SQL Injection** | Ataque em que o usuário digita código SQL num campo |
| **`$_GET` / `$_POST`** | Arrays do PHP com os dados da URL / do corpo da requisição |
| **`$_SESSION`** | Dados que o servidor guarda sobre o usuário entre requisições |
| **JSON** | Formato de texto para trocar dados (`{"chave":"valor"}`) |
| **`fetch`** | Função do JS para fazer requisições ao servidor |
| **`FormData`** | Objeto do JS que empacota campos para enviar por POST |
| **`async` / `await`** | Forma de esperar uma resposta demorada sem travar a página |
| **DOM** | A representação da página HTML que o JS manipula |
| **`affected_rows`** | Quantas linhas um INSERT/UPDATE/DELETE alterou |
| **localStorage** | Armazenamento do navegador (usado na RA1; **proibido** agora) |
| **RA1** | Primeira etapa do trabalho, só front-end com localStorage (`.historico_ra1/`) |
