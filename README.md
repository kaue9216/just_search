# JustSearch — CRUD de Artigos e Filmes

## Como rodar
1. Abra o **XAMPP Control Panel** e clique em **Start** no **Apache** e no **MySQL**.
2. No phpMyAdmin (http://localhost/phpmyadmin), execute `sql/banco.sql` e depois `sql/filmes.sql`
   (os scripts podem ser rodados mais de uma vez sem duplicar dados).
3. O PHP conecta com o usuário `admin` / senha `12345` (ver `php/conexao.php`).
4. Acesse: http://localhost/crud_just_search_projeto/
5. Login: **admin** / **123**

## Estrutura
- `login/` — tela de login
- `home/` — páginas (index = artigos, filmes*.html = CRUD de filmes)
- `js/` — scripts das páginas (fetch para a API)
- `php/` — API (JSON: status / mensagem / data)
- `css/style.css` — estilo baseado nos mockups
- `uploads/` — capas dos filmes
- `sql/` — criação do banco
