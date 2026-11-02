   document.addEventListener("DOMContentLoaded", () => {
    console.log("🎬 [INIT] filmes.js carregado, iniciando aplicação de filmes...");
    verificaFilmes();
    carregaRegistros();

    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");

    const url = window.location.origin + window.location.pathname;
    console.log(`🔎 [URL PARAMS] Ação: "${acao}" | ID: "${id}" | URL Base: "${url}"`);

    if(acao !== null && id !== null){
        executaAcao(acao, id, url);
    }

    // Evento para adicionar filme
    document.getElementById("btnAdicionar").addEventListener("click", () => {
        console.log("🖱️ [EVENTO] Clique no botão 'Cadastrar Filme'.");

        var nomeFilme = document.getElementById("nomeFilme").value;
        var anoFilme = document.getElementById("anoFilme").value;
        var diretorFilme = document.getElementById("diretorFilme").value;
        var generoFilme = document.getElementById("generoFilme").value;
        var idiomaFilme = document.getElementById("idiomaFilme").value;

        console.log(`📥 [INPUTS CAPTURADOS]:
        - Nome: "${nomeFilme}"
        - Data de Lançamento: "${anoFilme}"
        - Diretor: "${diretorFilme}"
        - Gênero: "${generoFilme}"
        - Idioma: "${idiomaFilme}"`);

        if(nomeFilme == "" || diretorFilme == ""){
            console.warn("❌ [VALIDAÇÃO] Falha: nome ou diretor não preenchidos.");
            document.getElementById("msgForm").textContent = "Por favor, preencha ao menos nome e diretor do filme.";
            return;
        }

        document.getElementById("msgForm").textContent = "";

        var novoFilme = {
            nomeFilme: nomeFilme,
            anoFilme: anoFilme,
            diretorFilme: diretorFilme,
            generoFilme: generoFilme,
            idiomaFilme: idiomaFilme
        };

        console.log("➕ [NOVO FILME] Objeto formatado para salvamento:", novoFilme);

        var filmes = JSON.parse(localStorage.getItem("filmes"));
        filmes.push(novoFilme);
        localStorage.setItem("filmes", JSON.stringify(filmes));
        console.log(`💾 [STORAGE] Filme salvo! Total agora: ${filmes.length}. Recarregando página...`);
        window.location.reload();
    });
});

function verificaFilmes(){
    console.log("📦 [STORAGE] Verificando existência da chave 'filmes' no localStorage...");
    var filmes = localStorage.getItem("filmes");
    if(filmes == null){
        console.log("ℹ️ [STORAGE] Chave 'filmes' não encontrada. Inicializando array vazio.");
        localStorage.setItem("filmes", JSON.stringify([]));
    } else {
        console.log("✅ [STORAGE] Chave 'filmes' localizada no localStorage.");
    }
}

function carregaRegistros(){
    console.log("🔄 [CARREGAMENTO] Renderizando lista de filmes cadastrados...");
    var filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    console.log(`📊 [STORAGE] Total de filmes cadastrados no acervo: ${filmes.length}`);

    var containerLista = document.getElementById("listaFilmes");

    if(filmes.length == 0){
        console.log("ℹ️ [RENDER] Nenhum filme encontrado no localStorage.");
        containerLista.innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-film fa-2x mb-2"></i>
                <p>Nenhum filme cadastrado ainda.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-responsive">
                    <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-film me-1"></i> Filme</th>
                            <th>Data de Lançamento</th>
                            <th>Diretor</th>
                            <th>Gênero</th>
                            <th>Idioma</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody></table></div>`;

    var tabelaMeio = "";
    filmes.forEach((item, index) => {
        tabelaMeio += `<tr>
                            <td><strong>${item.nomeFilme}</strong></td>
                            <td>${item.anoFilme}</td>
                            <td>${item.diretorFilme}</td>
                            <td><span class="badge bg-secondary">${item.generoFilme}</span></td>
                            <td>${item.idiomaFilme}</td>
                            <td>
                                <a href='filmes.html?id=${index}&acao=alterar' class="btn btn-outline-primary btn-sm me-1">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </a>
                                <a href='filmes.html?id=${index}&acao=excluir' class="btn btn-outline-danger btn-sm">
                                    <i class="fa-solid fa-trash"></i> Excluir
                                </a>
                            </td>
                        </tr>`;
    });

    containerLista.innerHTML = tabelaP1 + tabelaMeio + tabelaP2;
    console.log("✅ [RENDER] Tabela de filmes renderizada com sucesso.");
}

function executaAcao(acao, indice, url){
    var filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    console.log(`⚙️ [AÇÃO] Executando "${acao}" no índice ${indice}. Total de filmes: ${filmes.length}`);

    if(acao == 'excluir'){
        console.log(" [EXCLUIR] Removendo filme:", filmes[indice]);
        filmes.splice(indice, 1);
        alert("Filme excluído com sucesso!");
        localStorage.setItem("filmes", JSON.stringify(filmes));
        window.location.href = url;

    }else if(acao == 'alterar'){
        var filmeAtual = filmes[indice];
        console.log(" [EDITAR] Carregando dados no formulário:", filmeAtual);

        document.getElementById("nomeFilme").value = filmeAtual.nomeFilme;
        document.getElementById("anoFilme").value = filmeAtual.anoFilme;
        document.getElementById("diretorFilme").value = filmeAtual.diretorFilme;
        document.getElementById("generoFilme").value = filmeAtual.generoFilme;
        document.getElementById("idiomaFilme").value = filmeAtual.idiomaFilme;
        document.getElementById("btnAdicionar").disabled = true;

        document.getElementById("btnSalvar").style.display = "inline-block";

        document.getElementById("btnSalvar").addEventListener("click", () => {
            filmes[indice].nomeFilme = document.getElementById("nomeFilme").value;
            filmes[indice].anoFilme = document.getElementById("anoFilme").value;
            filmes[indice].diretorFilme = document.getElementById("diretorFilme").value;
            filmes[indice].generoFilme = document.getElementById("generoFilme").value;
            filmes[indice].idiomaFilme = document.getElementById("idiomaFilme").value;

            console.log(" [SALVAR EDIÇÃO] Novo estado do filme:", filmes[indice]);
            localStorage.setItem("filmes", JSON.stringify(filmes));
            window.location.href = url;
        });

    }else{
        console.warn(`⚠️ [AÇÃO DESCONHECIDA] "${acao}" não é reconhecida.`);
    }
}