# Instruções para o agente: CRUD de Séries (JustSearch)

Você vai implementar **somente o CRUD de Séries** do projeto JustSearch (atividade da PUCPR: FRONT > BACK > BANCO, PHP + MySQL + JavaScript puro). As telas HTML e a tabela já existem; faltam os arquivos PHP e JS. Responda ao usuário em português (pt-BR) e escreva comentários de código em português, de forma didática: o aluno precisa saber explicar cada linha na apresentação.

## 1. Regras da atividade (não quebre nenhuma)

- Só use o que foi visto em aula: HTML, CSS, JavaScript puro (`fetch`, `async/await`, `FormData`, `resposta.json()`), PHP procedural com `mysqli`, MySQL. **Proibido** PDO, Composer, frameworks, bibliotecas, jQuery, ORM.
- **Proibido** `localStorage`/`sessionStorage`. Todo dado fica no MySQL.
- O JS **nunca** acessa o banco: sempre `fetch` para um PHP.
- A conexão fica **só** em `php/conexao.php`. Todo PHP começa com `include_once('conexao.php');`. Não crie outra conexão e não copie dados de conexão para o front.
- Todo SQL com dado do usuário usa `prepare()` + `bind_param()` + `execute()`. Nunca concatene valores na query.
- Todo PHP responde **sempre JSON** no formato `{status, mensagem, data}` (`status` é `"ok"` ou `"nok"`), com `header("Content-type:application/json;charset=utf-8");`.
- **Login não é exigido.** Não use `valida_sessao`, não redirecione para o login e não crie botão de logoff nas telas de séries.
- **Escreva no nível do exemplo do professor** (`.template-giulio/`): `var`, `function`/`async function`, `for` com índice, `if/else`, `fetch`, `FormData`. **Proibido** `try/catch`, `??`, `trim()`, `exit`, arrow function em callback (`filter`, `some`, `forEach`), `closest`, `dataset`, `Object.entries`, regex e `sort` com função. Se não foi ensinado em aula, não use.
- Não adicione nada que não seja necessário (sem validações sofisticadas, sem classes, sem arquivos extras).

## 2. O que já existe (não recrie)

- **Tabela** `series` em `banco.sql` (já tem 2 registros de exemplo):

  ```sql
  series (id INT AUTO_INCREMENT PK, titulo VARCHAR(150), autor VARCHAR(100), categoria VARCHAR(100), ano INT)
  ```
  Todos os campos são obrigatórios (`NOT NULL`). Se o MySQL local ainda não tem a tabela, importe o `banco.sql` no phpMyAdmin (banco `projeto`).
- **Telas HTML** em `home/` (todas as telas do projeto ficam nessa pasta):
  - `home/index_series.html`: lista. IDs usados pelo JS: `novo` (botão), `busca` (campo), `btn_busca` (lupa), `generos` (`<ul>` da barra lateral), `lista` (`<div>` dos resultados). Carrega `../js/index_series.js`.
  - `home/serie_novo.html`: formulário. IDs: `titulo`, `autor`, `categoria`, `ano`, `enviar`. Carrega `../js/serie_novo.js`.
  - `home/serie_alterar.html`: igual ao novo, mais `<input type="hidden" id="id">`. Carrega `../js/serie_alterar.js`.
- `css/style.css`: estilo único do projeto. **Não edite.**
- Modelos prontos para copiar e adaptar: o CRUD de **livros** (`php/livro_*.php`, `js/index_livros.js`, `js/livro_novo.js`, `js/livro_alterar.js`) e o de **games**. Abra e leia antes de começar.

## 3. Arquivos que você deve criar (7)

| Arquivo | Função |
|---|---|
| `php/serie_get.php` | Sem `?id`: lista todas. Com `?id=X`: devolve uma. |
| `php/serie_novo.php` | Insere (dados em `$_POST`). |
| `php/serie_alterar.php` | Altera (`id` em `$_GET['id']`, dados em `$_POST`). |
| `php/serie_excluir.php` | Exclui (`id` em `$_GET['id']`). |
| `js/index_series.js` | Lista, pesquisa, barra lateral e exclusão. |
| `js/serie_novo.js` | Envia o formulário de cadastro. |
| `js/serie_alterar.js` | Carrega a série pelo id e envia a alteração. |

### 3.1 PHP: como fazer

Copie os `php/livro_*.php` para `php/serie_*.php` e adapte: tabela `series`, campos `titulo, autor, categoria, ano`.

- **`serie_get.php`**: `SELECT * FROM series` (ou `WHERE id = ?` com `bind_param("i", $_GET['id'])`). Se houver linhas, `status "ok"` e `data` com as linhas. Se não houver, `status "nok"` e `mensagem "Não há registros"`.
- **`serie_novo.php`**: leia com `$x = $_POST['x'];`. **Valide antes do `prepare()`**: `if($titulo == '' || $autor == '' || $categoria == '' || $ano == '')` responde `nok` com `"Preencha todos os campos."`; o `INSERT` fica no `else`. O `INSERT INTO series (titulo, autor, categoria, ano) VALUES (?, ?, ?, ?)` com `bind_param("sssi", ...)`. Confira `$stmt->affected_rows > 0`.
  - **Valide também o número:** logo depois, um `else if(!is_numeric($ano))` responde `nok` com `"O ano deve ser um número."` (sem isso, texto como "abc" seria gravado como 0). Faça o mesmo em `serie_alterar.php`. Veja `php/serie_novo.php` pronto como exemplo.
- **`serie_alterar.php`**: só age se existir `$_GET['id']`. Mesma validação de campos vazios. `UPDATE series SET titulo = ?, autor = ?, categoria = ?, ano = ? WHERE id = ?` com `bind_param("sssii", $titulo, $autor, $categoria, $ano, $_GET['id'])`. `affected_rows > 0` é sucesso; `== 0` também é `ok`, com a mensagem "Nenhum dado foi alterado."; outro valor é `nok`.
- **`serie_excluir.php`**: só age se existir `$_GET['id']`. `DELETE FROM series WHERE id = ?` com `bind_param("i", ...)`. `affected_rows > 0` é `ok`.
- Todo PHP termina com `$stmt->close(); $conexao->close();` e depois o `header` + `echo json_encode($retorno);`.
- O tipo no `bind_param` segue a ordem dos `?`: `s` para texto, `i` para inteiro.

### 3.2 JS: como fazer

- **`js/index_series.js`**: já está pronto e segue o modelo simples. Se for refazer, copie `js/index_livros.js` e adapte só o que muda:
  - `../php/livro_get.php` vira `../php/serie_get.php` e `livro_excluir.php` vira `serie_excluir.php`;
  - `livro_novo.html` vira `serie_novo.html` e `livro_alterar.html` vira `serie_alterar.html` (as telas ficam na mesma pasta, sem `../`);
  - textos "livro" viram "série" (mensagens de vazio e do `confirm`);
  - campos de pesquisa: `["titulo", "autor", "categoria"]`;
  - categoria da barra lateral: `categoria` (no `preencherCategorias`, `tabela[i].categoria`);
  - o bloco do card (dentro do `for` de `preencherLista`) fica assim:

    ```js
    var titulo = tabela[i].titulo;
    if(tabela[i].ano){
        titulo += " (" + tabela[i].ano + ")";
    }
    // meta: tabela[i].autor + " · " + tabela[i].categoria
    ```
  - **não use** `escapar`, `try/catch`, `filter`, `closest` nem `dataset`: a pesquisa é um `for` com `indexOf`, e o Excluir é `onclick="excluir(id)"`. **Mantenha** o `confirm()` antes de excluir e o `window.location.reload()` depois.
- **`js/serie_novo.js`**: copie `js/livro_novo.js`. Campos: `titulo, autor, categoria, ano`, um `var` por campo e um `fd.append` por campo. Clique no botão `enviar` (que é `type="button"`). Envie com `FormData` por `POST` para `../php/serie_novo.php`. Se `status == "ok"`, faça `alert("SUCESSO: " + resposta.mensagem)` e vá para `index_series.html`. Senão, `alert("ERRO: " + resposta.mensagem)`.
- **`js/serie_alterar.js`**: copie `js/livro_alterar.js`. Funciona em **duas fases**:
  1. no `DOMContentLoaded`, leia o `id` com `new URLSearchParams(window.location.search)`, faça `fetch("../php/serie_get.php?id=" + id)` e preencha os campos (e o `hidden id`). Não mostre `alert` de sucesso ao só carregar;
  2. no clique de `enviar`, monte o `FormData` e faça `POST` para `../php/serie_alterar.php?id=` + id. O resto segue o padrão de sucesso/erro.
- Não use `valida_sessao()`.

## 4. Como testar (obrigatório antes de dizer que terminou)

XAMPP com Apache e MySQL ligados e o projeto servido em `http://localhost/<pasta>/` (a pasta fica em `C:\xampp\htdocs`). Troque `<base>` pela URL do seu projeto.

```bash
# listar
curl -s <base>/php/serie_get.php
# vazio deve ser recusado ("Preencha todos os campos.")
curl -s -X POST -d "titulo=&autor=&categoria=&ano=" <base>/php/serie_novo.php
# texto no ano deve ser recusado ("O ano deve ser um número.")
curl -s -X POST -d "titulo=T&autor=A&categoria=C&ano=abc" <base>/php/serie_novo.php
# criar, buscar por id, alterar, excluir (use o id retornado no get)
curl -s -X POST -d "titulo=Teste&autor=Fulano&categoria=Drama&ano=2020" <base>/php/serie_novo.php
curl -s "<base>/php/serie_get.php?id=ID"
curl -s -X POST -d "titulo=Teste2&autor=Fulano&categoria=Drama&ano=2021" "<base>/php/serie_alterar.php?id=ID"
curl -s "<base>/php/serie_excluir.php?id=ID"
```

Depois confira no navegador, em `<base>/home/index_series.html`:
1. a lista mostra as séries e a barra lateral mostra as categorias;
2. a pesquisa e o clique numa categoria filtram a lista;
3. **Nova Série** cadastra e volta para a lista; com campo vazio aparece o alerta de erro;
4. **Alterar** abre com os campos preenchidos e salva;
5. **Excluir** pede confirmação e remove;
6. após cada operação, o registro aparece (ou some) na tabela `series` no phpMyAdmin.

Valide a sintaxe: `php -l php/serie_*.php` (o PHP do XAMPP fica em `C:\xampp\php\php.exe`) e `node --check js/index_series.js js/serie_novo.js js/serie_alterar.js`.

## 5. O que não fazer

- **Não edite** os outros módulos (artigos, games, livros, filmes), `css/style.css`, `php/conexao.php`, `banco.sql` (a tabela `series` já está lá), as pastas `.template-giulio/` e `.historico_ra1/`, nem as telas HTML de séries (só se encontrar um erro real, e então avise o usuário).
- Se o seu MySQL local usa outro usuário ou senha, **não commite** alteração em `php/conexao.php` (o padrão do projeto é `root` com senha vazia, como no XAMPP).
- Não crie arquivos de teste, de documentação ou de upload.

## 6. Entrega

- Trabalhe numa branch própria (por exemplo `series`) e faça commit **apenas** dos 7 arquivos listados na seção 3.
- Ao terminar, diga ao usuário: o que criou, o resultado de cada teste da seção 4 (o que passou e o que não foi possível testar) e que o README precisa de uma linha atualizada: a linha de Séries na tabela "Estado atual" deve passar a ✅ Completo, com o nome do responsável.
- Não faça push nem abra PR sem o usuário pedir.
