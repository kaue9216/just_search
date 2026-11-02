document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado!');

    // Funções de inicialização
    verificaSessao();
    verificaArtigos();
    carregaRegistros();

    // Verificando parâmetros da URL --- VIA GET =--- (usa-se para edição/exclusão)
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get('acao');
    const id = parametros.get('id');

    const url = window.location.origin + window.location.pathname;

    // Se há uma ação sendo executada e há id que descreve, chama executarAcao
    if(acao !== null && id !== null){
        console.log('Detectada solicitação de ação via GET. Executando executaAcao()');
        executarAcao(acao, id, url);
    }

    // CREATE - [C]RUD
    document.getElementById('btnAdicionar').addEventListener('click', () => {
        console.log('clique identificado, acionando botão ADICIONAR');

        // Coleta de valores dos IDs que estão no html
        var nome = document.getElementById('txt-nomeArtigo').value;
        var categoria = document.getElementById("Categoria").value;
        var descricao = document.getElementById('DescricaoArtigo').value;
        var privacidade = document.getElementById('Privacidade').value;

        console.log(`Dados capturados: Nome: ${nome}, Categoria: ${categoria}, Descrição: ${descricao}, Privacidade: ${privacidade}`);

        if(nome == "" || categoria ==""){
            console.log('Um dos campos obrigatórios está vazio!');
            document.getElementById('msgForm').textContent = 'Preencha o nome do artigo e a categoria.';
            return;
        }

        document.getElementById('msgForm').textContent = "";
        var usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

        var novoArtigo = {
            nome: nome,
            categoria: categoria,
            descricao: descricao,
            privacidade: privacidade,
            emailCriador: usuario.email
        };

        console.log('OK --- novo artigo foi montado --- OK')

        var artigos = JSON.parse(localStorage.getItem('artigos_games'));
        artigos.push(novoArtigo);

        localStorage.setItem('artigos_games', JSON.stringify(artigos));
        console.log('Um novo artigo foi salvo no localStorage!!');

        window.location.reload(); // recarrega a página depois de salvar!
    });

    // C[R]UD - Read
    function carregaRegistros(){
        // Filtra os artigos criados, comparando o e-mail do autor + email do usuário que está logado
        console.log('função carrega registros() iniciou');
        var usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
        var artigos = JSON.parse(localStorage.getItem('artigos_games'));

        console.log(`Total de artigos encontrados na base: ${artigos.length}`);

        var meusArtigos = []
        artigos.forEach((item, index) => {
            if(item.emailCriador == usuario.email){
                meusArtigos.push({item: item, index: index});
            }
        });

        console.log(`Artigos pertencentes a este usuário: ${meusArtigos.length}`);

        if(meusArtigos.length == 0){
            // Utiliza um recurso de interpolação no js, injetando diretamente no DOM uma mensagem através de uma div HTML 
            console.log('Nenhum artigo foi encontrado!');
            document.getElementById('listaArtigos').innerHTML = `
            <div class="text-center text-muted py-4">
                <p>Nenhum artigo cadastrado ainda. Sinta-se livre para cadastrar quando quiser!</p>
            </div>
            `;
            return;
        }

        var tabelaP1 = `
        <div class="table-responsive">
        <table class="table table-hover align-middle">
        <thead>
            <tr>
                <th>Artigo</th>
                <th>Categoria</th>
                <th>Síntese</th>
                <th>Privacidade</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
        `;

        var tabelaP2 = `</tbody></table></div>`;
        var tabelaMeio = "";

        meusArtigos.forEach((registro) => {
            var a = registro.item;
            var idx = registro.index;

            tabelaMeio += `
            <tr>
                <td><strong>${a.nome}</strong></td>
                <td>${a.categoria}</td>
                <td>${a.descricao}</td>
                <td><span class="badge bg-secondary">${a.privacidade}</span></td>
                <td>
                    <a href='artigos.html?id=${idx}&acao=alterar' class="btn btn-outline-primary btn-sm me-1">Editar</a>
                    <a href='artigos.html?id=${idx}&acao=excluir' class="btn btn-outline-danger btn-sm">Excluir</a>
                </td>
            </tr>
            `;
        });
        console.log('Injetando tabela final na div listaArtigos');
        // Mesmo recurso de antes, utiliza o DOM para injetar HTML
        document.getElementById('listaArtigos').innerHTML = tabelaP1 + tabelaMeio + tabelaP2;
    }
});

// CR[UD] -- Update e Delete
function executarAcao(acao, indice, url){
    console.log('Executando ação');
    var artigos = JSON.parse(localStorage.getItem('artigos_games'));

    if(acao == 'excluir'){
        console.log(`Excluindo artigo: ${artigos[indice].nome}`);
        
        artigos.splice(indice, 1); // remove 1 item, a partir do índice
        localStorage.setItem('artigos_games', JSON.stringify(artigos)); // salva alteração no localstorage
        window.location.href = url; // para recarregar a página limpa
    } else if(acao == 'alterar'){
        console.log(`Carregando artigo: ${artigos[indice].nome}`);
        var obj = artigos[indice];

        // popular os campos do form com dados da lsita
        document.getElementById('txt-nomeArtigo').value = obj.nome;
        document.getElementById('Categoria').value = obj.categoria;
        document.getElementById('DescricaoArtigo').value = obj.descricao;
        document.getElementById('Privacidade').value = obj.privacidade;

        document.getElementById('btnSalvar').addEventListener('click', () => {
            console.log('usuário clicou no botão salvar');
            artigos[indice].nome = document.getElementById('txt-nomeArtigo').value;
            artigos[indice].categoria = document.getElementById("Categoria").value;
            artigos[indice].descricao = document.getElementById("DescricaoArtigo").value;
            artigos[indice].privacidade = document.getElementById("Privacidade").value;

            localStorage.setItem('artigos_games', JSON.stringify(artigos));
            window.location.href = url;
        });
    } else {
        console.log('Ação que foi exec não tem tratamento ou resposta!')
    };
};

function verificaSessao(){
    // Apenas simula um usuário para manter a lógica sem quebrar o código
    var usuario = localStorage.getItem('usuarioLogado');
    if(usuario == null){
        console.log("Usuário não encontrado. Criando um usuário padrão 'admin'.");
        localStorage.setItem('usuarioLogado', JSON.stringify({nome: 'Gamer Admin', email: 'admin@games.com.br'}));
    }
};

function verificaArtigos(){
    // Verifica a base de dados do localstorage
    var artigos = localStorage.getItem('artigos_games');
    if(artigos == null){
        console.log('Base vazia. Criando array vazio para os artigos.');
        localStorage.setItem('artigos_games', JSON.stringify([]));
    }
};