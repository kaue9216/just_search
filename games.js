document.addEventListener("DOMContentLoaded", () => {
    console.log("primerio console.log");
    // verificaSessao();
    verificaJogos();
    carregaRegistros();

    // Verificar se há informações vindas por GET
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");

    // localhost/games.html
    const url = window.location.origin + window.location.pathname;
    console.log(`🔎 [URL PARAMS] Ação: "${acao}" | ID: "${id}" | URL Base: "${url}"`);

    // Só posso realizar as ações com essas duas informações
    if(acao !== null && id !== null){
        executaAcao(acao, id, url);
    }

    function verificaJogos(){ 
    console.log("📦 [STORAGE] Verificando existência da chave 'jogos' no localStorage...");
    var jogos = localStorage.getItem("jogos"); 
    
        if(jogos == null){ 
            console.log("ℹ️ [STORAGE] Chave 'jogos' não encontrada. Inicializando array vazio.");
            localStorage.setItem("jogos", JSON.stringify([])); 
        } else {
            console.log("✅ [STORAGE] Chave 'jogos' localizada no localStorage.");
        }
    }

    // Evento para adicionar jogo
    document.getElementById("cadastro").addEventListener("click", () => {
        console.log("🖱️ [EVENTO] Clique no botão 'Cadastrar Jogo'.");
        var nomeJogo = document.getElementById("nome_jogo").value;
        var publisherJogo = document.getElementById("publisher_jogo").value;
        var generoJogo = document.getElementById("genero_jogo").value;
        var plataformaJogo = document.getElementById("plataforma_jogo").value;

        console.log(`📥 [INPUTS CAPTURADOS]:
        - Nome: "${nomeJogo}"
        - Publisher: "${publisherJogo}"
        - Gênero: "${generoJogo}"
        - Plataforma: "${plataformaJogo}"`);


        if(nome_jogo == "" || publisher_jogo == ""){
            console.warn("❌ [VALIDAÇÃO] Falha: Um ou mais campos estão vazios.");
            document.getElementById("msgForm").textContent = "Por favor, preencha todos os 4 campos do jogo.";
            return;
        }

        document.getElementById("msgForm").textContent = "";

        var novoJogo = {
            nomeJogo: nomeJogo,
            publisherJogo: publisherJogo,
            generoJogo: generoJogo,
            plataformaJogo: plataformaJogo
        };

        console.log("➕ [NOVO JOGO] Objeto formatado para salvamento:", novoJogo);

        // passo 1
        var jogos = JSON.parse(localStorage.getItem("jogos"));
        jogos.push(novoJogo); // passo 2
        // passo 3
        localStorage.setItem("jogos", JSON.stringify(jogos));
        console.log("💾 [STORAGE] Jogo salvo com sucesso no localStorage! Recarregando página...");
        window.location.reload();
    });
});

function verificaJogos(){
    var jogos = localStorage.getItem("jogos");
    if(jogos == null){
        localStorage.setItem("jogos", JSON.stringify([]));
    }
}

function carregaRegistros(){
    console.log("🔄 [CARREGAMENTO] Renderizando lista de jogos cadastrados...");
    var jogos = JSON.parse(localStorage.getItem("jogos")) || [];
    console.log(`📊 [STORAGE] Total de jogos cadastrados no acervo: ${jogos.length}`);

    var containerLista = document.getElementById("listajogos");

    if(jogos.length == 0){
        console.log("ℹ️ [RENDER] Nenhum jogo encontrado no localStorage.");
        containerLista.innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-gamepad fa-2x mb-2"></i>
                <p>Nenhum jogo cadastrado ainda.</p>
             </div>`;
        return;
    }

    // Estrutura do cabeçalho da tabela
    var tabelaP1 = `<div class="table-responsive">
                    <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-gamepad me-1"></i> Jogo</th>
                            <th>Publisher</th>
                            <th>Gênero</th>
                            <th>Plataforma</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    jogos.forEach((item, index) => {
        tabelaMeio += `<tr>
                            <td><strong>${item.nomeJogo}</strong></td>
                            <td>${item.publisherJogo}</td>
                            <td><span class="badge bg-secondary">${item.generoJogo}</span></td>
                            <td>${item.plataformaJogo}</td>
                            <td>
                                <a href='games.html?id=${index}&acao=alterar' class="btn btn-outline-primary btn-sm me-1">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </a>
                                <a href='games.html?id=${index}&acao=excluir' class="btn btn-outline-danger btn-sm">
                                    <i class="fa-solid fa-trash"></i> Excluir
                                </a>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    containerLista.innerHTML = tabelaFinal;
    console.log("✅ [RENDER] Tabela de jogos renderizada com sucesso no container #listajogos.");
}

function executaAcao(acao, indice, url){
    console.log(`⚙️ [EXECUTA AÇÃO] Disparada ação "${acao}" no índice [${indice}]`);
    // PRIMEIRO PASSO
    var jogos = JSON.parse(localStorage.getItem("jogos"));

    if(!jogos || !jogos[indice]){
        console.error(`❌ [EXECUTA AÇÃO] Erro: Índice [${indice}] não existe no array de jogos.`);
        return;
    }

    if(acao == 'excluir'){
        console.log("🗑️ [EXCLUIR] Removendo jogo:", jogos[indice]);
        jogos.splice(indice, 1);
        alert("Jogo excluído com sucesso!");
        console.log("✅ [EXCLUIR] Remoção concluída. Redirecionando para limpar parâmetros da URL...");

        // ULTIMO PASSO
        localStorage.setItem("jogos", JSON.stringify(jogos));
        window.location.href = url; // RECARREGA A TELA

        

    }else if(acao == 'alterar'){
        console.log("✏️ [ALTERAR] Populando formulário com o jogo selecionado:", jogos[indice]);
        // Carrega valores nos inputs
        var obj = jogos[indice];
        document.getElementById("nome_jogo").value = obj.nomeJogo;
        document.getElementById("publisher_jogo").value = obj.publisherJogo;
        document.getElementById("genero_jogo").value = obj.generoJogo || "";
        document.getElementById("plataforma_jogo").value = obj.plataformaJogo || "";

        // Insere o botão Salvar na tela
        document.getElementById("cadastro").disabled = true;
        var btnSalvar = document.getElementById("btnSalvar");
        btnSalvar.style.display = "block";
        console.log("✏️ [ALTERAR] Formulário pronto para edição. Aguardando clique em #btnSalvar...");

        // Escuta o botão salvar
        btnSalvar.addEventListener("click", () => {
            jogos[indice].nomeJogo = document.getElementById("nome_jogo").value;
            jogos[indice].publisherJogo = document.getElementById("publisher_jogo").value;
            jogos[indice].generoJogo = document.getElementById("genero_jogo").value;
            jogos[indice].plataformaJogo = document.getElementById("plataforma_jogo").value;
            localStorage.setItem("jogos", JSON.stringify(jogos));
            console.log("✅ [SALVAR ALTERAÇÕES] Alterações salvas! Redirecionando...");
            alert("Jogo atualizado com sucesso!");
            window.location.href = url;
        });

    }else{
        console.log("Algo deu muito errado");
    }
}


function sair(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}
