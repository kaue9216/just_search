document.addEventListener("DOMContentLoaded", () => {
    console.log("Teste");
    verificaSerie();
    carregaRegistrosSerie();

    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");

    const url = window.location.origin + window.location.pathname;
    console.log(`🔎 [URL PARAMS] Ação: "${acao}" | ID: "${id}" | URL Base: "${url}"`);

    // Só posso realizar as ações com essas duas informações
    if(acao !== null && id !== null){
        executaAcao(acao, id, url);
    }

    function verificaSerie(){ 
    console.log("📦 [STORAGE] Verificando existência da chave 'series' no localStorage...");
    var series = localStorage.getItem("series"); 
    
        if(series == null){ 
            console.log("ℹ️ [STORAGE] Chave 'series' não encontrada. Inicializando array vazio.");
            localStorage.setItem("series", JSON.stringify([])); 
        } else {
            console.log("✅ [STORAGE] Chave 'series' localizada no localStorage.");
        }
    }

    // Evento para adicionar jogo
    document.getElementById("cadastro").addEventListener("click", () => {
        console.log("🖱️ [EVENTO] Clique no botão 'Cadastrar Serie'.");
        var nomeSerie = document.getElementById("nome_serie").value;
        var autorSerie = document.getElementById("nome_autor").value;
        var categoriaSerie = document.getElementById("categoria_serie").value;
        var anoLancamento = document.getElementById("ano_lancamento").value;

        console.log(`📥 [INPUTS CAPTURADOS]:
        - Nome : "${nomeSerie}"
        - Autor: "${autorSerie}"
        - Categoria: "${categoriaSerie}"
        - Ano lançamento: "${anoLancamento}"`);

        if(nomeSerie == "" || autorSerie == ""){
            console.warn("❌ [VALIDAÇÃO] Falha: Um ou mais campos estão vazios.");
            document.getElementById("msgForm").textContent = "Por favor, preencha todos os 4 campos da serie.";
            return;
        }

        document.getElementById("msgForm").textContent = "";

        var novaSerie = {
            nomeSerie: nomeSerie,
            autorSerie: autorSerie,
            categoriaSerie: categoriaSerie,
            anoLancamento: anoLancamento
        };

        console.log("➕ [NOVA Serie] Objeto formatado para salvamento:", novaSerie);

        // passo 1
        var series = JSON.parse(localStorage.getItem("series"));
        series.push(novaSerie); // passo 2
        // passo 3
        localStorage.setItem("series", JSON.stringify(series));
        console.log("💾 [STORAGE] Serie salvo com sucesso no localStorage! Recarregando página...");
        window.location.reload();
    });
});

function verificaSerie(){
    var series = localStorage.getItem("series");
    if(series == null){
        localStorage.setItem("serie", JSON.stringify([]));
    }
}

function carregaRegistrosSerie(){
    console.log("🔄 [CARREGAMENTO] Renderizando lista de series cadastrados...");
    var series = JSON.parse(localStorage.getItem("series")) || [];
    console.log(`📊 [STORAGE] Total de series cadastrados no acervo: ${series.length}`);

    var containerLista = document.getElementById("listaseries");

    if(series.length == 0){
        console.log("ℹ️ [RENDER] Nenhuma serie encontrado no localStorage.");
        containerLista.innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-gamepad fa-2x mb-2"></i>
                <p>Nenhum serie cadastrado ainda.</p>
            </div>`;
        return;
    }

    // Estrutura do cabeçalho da tabela
    var tabelaP1 = `<div class="table-responsive">
                    <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-gamepad me-1"></i> Nome</th>
                            <th>Autor</th>
                            <th>Categoria</th>
                            <th>Ano Lançamento</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    series.forEach((item, index) => {
        tabelaMeio += `<tr>
                            <td><strong>${item.nomeSerie}</strong></td>
                            <td>${item.autorSerie}</td>
                            <td><span class="badge bg-secondary">${item.categoriaSerie}</span></td>
                            <td>${item.anoLancamento}</td>
                            <td>
                                <a href='serie.html?id=${index}&acao=alterar' class="btn btn-outline-primary btn-sm me-1">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </a>
                                <a href='serie.html?id=${index}&acao=excluir' class="btn btn-outline-danger btn-sm">
                                    <i class="fa-solid fa-trash"></i> Excluir
                                </a>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    containerLista.innerHTML = tabelaFinal;
    console.log("✅ [RENDER] Tabela de series renderizada com sucesso no container #listaSeries.");
}

function executaAcao(acao, indice, url){
    console.log(`⚙️ [EXECUTA AÇÃO] Disparada ação "${acao}" no índice [${indice}]`);
    // PRIMEIRO PASSO
    var series = JSON.parse(localStorage.getItem("series"));

    if(!series || !series[indice]){
        console.error(`❌ [EXECUTA AÇÃO] Erro: Índice [${indice}] não existe no array de seris.`);
        return;
    }

    if(acao == 'excluir'){
        console.log("🗑️ [EXCLUIR] Removendo serie:", series[indice]);
        series.splice(indice, 1);
        alert("Serie excluído com sucesso!");
        console.log("✅ [EXCLUIR] Remoção concluída. Redirecionando para limpar parâmetros da URL...");

        // ULTIMO PASSO
        localStorage.setItem("series", JSON.stringify(series));
        window.location.href = url; // RECARREGA A TELA

        

    }else if(acao == 'alterar'){
        console.log("✏️ [ALTERAR] Populando formulário com a serie selecionado:", series[indice]);
        // Carrega valores nos inputs
        var obj = series[indice];
        document.getElementById("nome_serie").value = obj.nomeSerie;
        document.getElementById("nome_autor").value = obj.autorSerie;
        document.getElementById("categoria_serie").value = obj.categoriaSerie || "";
        document.getElementById("ano_lancamento").value = obj.anoLancamento || "";

        // Insere o botão Salvar na tela
        document.getElementById("cadastro").disabled = true;
        var btnSalvar = document.getElementById("btnSalvar");
        btnSalvar.style.display = "block";
        console.log("✏️ [ALTERAR] Formulário pronto para edição. Aguardando clique em #btnSalvar...");

        // Escuta o botão salvar
        btnSalvar.addEventListener("click", () => {
            series[indice].nomeSerie = document.getElementById("nome_serie").value;
            series[indice].autorSerie = document.getElementById("nome_autor").value;
            series[indice].categoriaSerie = document.getElementById("categoria_serie").value;
            series[indice].anoLancamento = document.getElementById("ano_lancamento").value;
            localStorage.setItem("series", JSON.stringify(series));
            console.log("✅ [SALVAR ALTERAÇÕES] Alterações salvas! Redirecionando...");
            alert("Serie atualizado com sucesso!");
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